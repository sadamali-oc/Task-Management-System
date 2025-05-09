import React, { useState } from "react";
import BasicCard from "../../atoms/basicCard";
import EmailInputField from "../../molecules/emailInputField";
import PasswordInputField from "../../molecules/passwordInputField";
import BasicButton from "../../atoms/basicButton";
import { Box, Link as MuiLink } from "@mui/material";
import Title from "../../atoms/title";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import useAuthStore from "../../../store/useAuthStore";
import "./LoginForm.css";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import useTaskStore from "../../../store/useTaskStore";

const LoginForm = () => {
  const navigate = useNavigate();
  const loginUser = useAuthStore((state) => state.loginUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state for button

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // Email and Password Validation
    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true); // Set loading to true during the login process

    try {
      await loginUser(email, password); // Call loginUser function
      const user = useAuthStore.getState().user;

      // Log the user details and token (useful for debugging)
      console.log("User Logged In:", user);
      console.log("Role:", user?.role);
      console.log("Email:", user?.email); // Assuming email is part of the user object
      console.log("Access Token:", user?.access_token);

      // Store developer list if role matches
      if (user?.role === "developer") {
        useTaskStore.setState({
          developers: [user],
        });
      }

      // Show success alert and clear after a delay
      setShowSuccessAlert(true);
      setTimeout(() => {
        setShowSuccessAlert(false);
        navigate("/dashboard"); // Redirect after successful login
      }); // Adjust the timeout duration (e.g., 2 seconds)
    } catch (err) {
      setError("Invalid email or password.");
      setShowSuccessAlert(false);
      console.error("Login error:", err); // Log error details
    } finally {
      setIsLoading(false); // Reset loading state after the process
    }
  };

  return (
    <div>
      <BasicCard sx={{ height: "auto", width: "400px", padding: "20px", boxShadow: 3 }}>
        <Title text="Sign In" />

        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <img src="src/assets/login.png" alt="Login" style={{ width: "200px", height: "auto" }} />
        </Box>

        {showSuccessAlert && (
          <Stack sx={{ width: "100%", mb: 2 }} spacing={2}>
            <Alert severity="success">Sign in successfully!</Alert>
          </Stack>
        )}

        {error && (
          <Stack sx={{ width: "100%", mb: 2 }} spacing={2}>
            <Alert severity="error">{error}</Alert>
          </Stack>
        )}

        <form onSubmit={handleSubmit} autoComplete="off">
          <Box sx={{ mb: 2 }}>
            <EmailInputField value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
          </Box>
          <Box sx={{ mb: 1 }}>
            <PasswordInputField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="off"
            />
          </Box>
          <Box className="forgot-password" sx={{ textAlign: "right", mb: 2 }}>
            <MuiLink component={RouterLink} to="/forgot-password" underline="hover">
              Forgot Password?
            </MuiLink>
          </Box>

          <Box sx={{ mb: 2 }}>
            <BasicButton
              type="submit"
              sx={{ minHeight: "50px", minWidth: "100%", textTransform: "none" }}
              label={isLoading ? "Signing In..." : "Sign In"}
              disabled={isLoading} 
            />
          </Box>
        </form>
      </BasicCard>
    </div>
  );
};

export default LoginForm;
