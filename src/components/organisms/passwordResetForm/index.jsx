import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BasicCard from "../../atoms/basicCard";
import BasicButton from "../../atoms/basicButton";
import PasswordInputField from "../../molecules/passwordInputField";
import Title from "../../atoms/title";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import EmailInputField from "../../molecules/emailInputField";
import useAuthStore from "../../../store/useAuthStore";

const PasswordResetForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const {
    resetPassword,
    resetPasswordMessage,
    resetPasswordError,
    clearMessages,
    email: storedEmail,
  } = useAuthStore();

  useEffect(() => {
    // Pre-fill email with storedEmail
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, [storedEmail]);

  useEffect(() => {
    if (resetPasswordMessage) {
      const timeout = setTimeout(() => {
        clearMessages();
        navigate("/");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [resetPasswordMessage, navigate, clearMessages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearMessages();

    if (!email || !currentPassword || !newPassword || !confirmPassword) {
      useAuthStore.setState({ resetPasswordError: "Please fill in all fields." });
      return;
    }

    if (newPassword !== confirmPassword) {
      useAuthStore.setState({ resetPasswordError: "Passwords do not match." });
      return;
    }

    if (email !== storedEmail) {
      useAuthStore.setState({ resetPasswordError: "Email does not match logged-in user." });
      return;
    }

    await resetPassword(email, currentPassword, newPassword, confirmPassword);
  };

  return (
    <div>
      <BasicCard sx={{ height: "auto", width: "400px", padding: "10px", boxShadow: 3 }}>
        <Title text="Reset Password" />

        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <img
            src="src/assets/password.png"
            alt="Password Reset"
            style={{ width: "200px", height: "200px" }}
          />
        </Box>

        {(resetPasswordError || resetPasswordMessage) && (
          <Stack sx={{ width: "100%", mb: 2 }} spacing={2}>
            {resetPasswordError && <Alert severity="error">{resetPasswordError}</Alert>}
            {resetPasswordMessage && <Alert severity="success">{resetPasswordMessage}</Alert>}
          </Stack>
        )}

        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 2 }}>
            <EmailInputField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <PasswordInputField
              label="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <PasswordInputField
              label="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <PasswordInputField
              label="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <BasicButton
              type="submit"
              sx={{ minHeight: "50px", minWidth: "100%" }}
              label="Reset Password"
            />
          </Box>
        </form>
      </BasicCard>
    </div>
  );
};

export default PasswordResetForm;