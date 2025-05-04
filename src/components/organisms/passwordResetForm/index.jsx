import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BasicCard from "../../atoms/basicCard";
import BasicButton from "../../atoms/basicButton";
import EmailInputField from "../../molecules/emailInputField";
import PasswordInputField from "../../molecules/passwordInputField";
import Title from "../../atoms/title";
import "./PasswordResetForm.css";

const PasswordResetForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleCurrentPasswordChange = (e) => setCurrentPassword(e.target.value);
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all fields.");
      setSuccessMessage("");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      setSuccessMessage("");
      return;
    }

    setError("");
    setSuccessMessage("Password has been successfully reset.");
    console.log("Resetting password for email:", email);

    setTimeout(() => {
      navigate("login");
    }, 2000);
  };

  return (
    <div>
      <BasicCard
        sx={{ height: "auto", width: "400px", padding: "20px", boxShadow: 3 }}
      >
        <Title text="Forgot Password" />

        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 2 }}>
            <EmailInputField value={email} onChange={handleEmailChange} />
          </Box>

          <Box sx={{ mb: 2 }}>
            <PasswordInputField
              label="Current Password"
              value={currentPassword}
              onChange={handleCurrentPasswordChange}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <PasswordInputField
              label="New Password"
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <PasswordInputField
              label="Confirm New Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </Box>

          {error && (
            <Typography variant="body2" color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          {successMessage && (
            <Typography variant="body2" color="primary" sx={{ mb: 2 }}>
              {successMessage}
            </Typography>
          )}

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
