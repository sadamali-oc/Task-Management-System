import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../api/api";

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      email: null,
      name: null,
      role: null,
      token: null,
      resetPasswordMessage: "",
      resetPasswordError: "",

      loginUser: async (email, password) => {
        try {
          const response = await api.post("/auth/login", { email, password });

          const { access_token, name, role } = response.data;

          if (!access_token || !name || !role) {
            throw new Error("Invalid response from server");
          }

          set({
            token: access_token,
            email,
            user: { name, email, role },
            name,
            role,
          });
        } catch (error) {
          console.error("Login failed:", error);
          throw new Error("Invalid credentials");
        }
      },

      logoutUser: () => {
        set({
          user: null,
          email: null,
          name: null,
          role: null,
          token: null,
        });
      },

      resetPassword: async (email, currentPassword, newPassword, confirmPassword) => {
        try {
          const token = get().token;
          const storedEmail = get().email;

          console.log("Token before password reset:", token);
          console.log("Input values:", { email, currentPassword, newPassword, confirmPassword });

          if (!token || !storedEmail) {
            console.error("No token or email found, please log in.");
            set({
              resetPasswordMessage: "",
              resetPasswordError: "Authentication required. Please log in.",
            });
            return;
          }

          if (!email || !currentPassword || !newPassword || !confirmPassword) {
            console.error("Missing fields:", { email, currentPassword, newPassword, confirmPassword });
            set({
              resetPasswordMessage: "",
              resetPasswordError: "All fields are required.",
            });
            return;
          }

          const payload = {
            email,
            current_password: currentPassword,
            new_password: newPassword,
            confirm_password: confirmPassword,
          };
          console.log("Sending payload:", payload);

          const response = await api.put(
            "/auth/change_password",
            payload,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          set({
            resetPasswordMessage: response.data.message || "Password changed successfully",
            resetPasswordError: "",
          });
        } catch (error) {
          const errorMessage = error.response?.data?.message || "Failed to reset password";
          console.error("Password reset failed:", error);

          // Check for token-related errors (e.g., "Invalid token", "Token expired")
          if (error.response?.status === 401 && errorMessage.includes("token")) {
            console.error("Token expired or invalid, please log in again.");
            set({ token: null, user: null, email: null, name: null, role: null });
            set({
              resetPasswordMessage: "",
              resetPasswordError: "Token expired or invalid, please log in again.",
            });
          } else {
            // Handle other errors (e.g., incorrect password, email mismatch)
            set({
              resetPasswordMessage: "",
              resetPasswordError: errorMessage,
            });
          }
          throw new Error(errorMessage);
        }
      },

      clearMessages: () => {
        set({
          resetPasswordMessage: "",
          resetPasswordError: "",
        });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        email: state.email,
        name: state.name,
        role: state.role,
      }),
    }
  )
);

export default useAuthStore;