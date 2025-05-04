import React, { useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BasicCard from "../../atoms/basicCard";
import BasicButton from "../../atoms/basicButton";
import PasswordInputField from "../../molecules/passwordInputField";
import Title from "../../atoms/title";
import "./PasswordResetForm.css";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const PasswordResetForm = () => {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleCurrentPasswordChange = (e) => setCurrentPassword(e.target.value);
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
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

    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  return (
    <div>
      <BasicCard
        sx={{ height: "auto", width: "400px", padding: "10px", boxShadow: 3 }}
      >
        <Title text="Forgot Password" />

        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <img
            src="src/assets/password.png"
            alt="Password Reset"
            style={{ width: "200px", height: "200px" }}
          />
        </Box>

        {/* Alerts for error and success messages */}
        {(error || successMessage) && (
          <Stack sx={{ width: "100%", mb: 2 }} spacing={2}>
            {error && <Alert severity="error">{error}</Alert>}
            {successMessage && <Alert severity="success">{successMessage}</Alert>}
          </Stack>
        )}

        <form onSubmit={handleSubmit}>
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
