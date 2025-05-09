import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Stack,
} from "@mui/material";
import BasicCard from "../../atoms/basicCard";
import EmailInputField from "../../molecules/emailInputField";
import PasswordInputField from "../../molecules/passwordInputField";
import BasicButton from "../../atoms/basicButton";
import Title from "../../atoms/title";
import api from "../../../api/api";
import useAuthStore from "../../../store/useAuthStore";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("client");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { token, role: userRole } = useAuthStore();

  const isDisabled = userRole !== "admin";

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setSuccess("");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setSuccess("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setSuccess("");
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setSuccess("");
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const newUser = { username, email, password, role };

    try {
      if (userRole !== "admin") {
        setError("You do not have permission to create a profile.");
        return;
      }

      await api.post("/admin/create_user", newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setError("");
      setSuccess("Account created successfully!");
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error("Error creating user:", err.response?.data || err.message);
      setError("Failed to create user. You may not have permission.");
    }
  };

  return (
    <div>
      <BasicCard sx={{ height: "auto", width: "400px", padding: "20px", boxShadow: 3 }}>
        <Title text="Create an Account" />

        <form onSubmit={handleSubmit}>
          {success && (
            <Stack sx={{ width: "100%", mb: 2 }} spacing={2}>
              <Alert severity="success">{success}</Alert>
            </Stack>
          )}

          {error && (
            <Stack sx={{ width: "100%", mb: 2 }} spacing={2}>
              <Alert severity="error">{error}</Alert>
            </Stack>
          )}

          <Box sx={{ mb: 2 }}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={handleUsernameChange}
              disabled={isDisabled}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <EmailInputField value={email} onChange={handleEmailChange} disabled={isDisabled} />
          </Box>

          <Box sx={{ mb: 2 }}>
            <PasswordInputField value={password} onChange={handlePasswordChange} disabled={isDisabled} />
          </Box>

          <Box sx={{ mb: 2 }}>
            <PasswordInputField
              label="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              disabled={isDisabled}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <FormControl fullWidth disabled={isDisabled}>
              <InputLabel>Role</InputLabel>
              <Select value={role} onChange={handleRoleChange} label="Role">
                <MenuItem value="developer">Developer</MenuItem>
                <MenuItem value="client">Client</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ mb: 2 }}>
            <BasicButton
              type="submit"
              sx={{ minHeight: "50px", minWidth: "100%" }}
              label="Save"
              disabled={isDisabled}
            />
          </Box>
        </form>
      </BasicCard>
    </div>
  );
};

export default SignUpForm;
