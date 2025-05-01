import React, { useState } from "react";
import { Box, TextField, Typography, Link as MuiLink, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import BasicCard from "../../atoms/basicCard";
import EmailInputField from "../../molecules/emailInputField";
import PasswordInputField from "../../molecules/passwordInputField";
import BasicButton from "../../atoms/basicButton";
import Title from "../../atoms/title";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CodeIcon from '@mui/icons-material/Code';
import PersonIcon from '@mui/icons-material/Person';
import "./SignUpForm.css";

const SignUpForm = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("client");  // Default to client
  const [error, setError] = useState("");

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
  const handleRoleChange = (e) => setRole(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const newUser = { name, email, password, role };  // Include role here

    // Example: Saving to localStorage (In production, this should be sent to backend)
    localStorage.setItem("user", JSON.stringify(newUser));

    setError("");
    console.log("User registered:", newUser);

    // Navigate to the login page after successful registration
    navigate("/auth/login");
  };

  return (
    <div>
      <BasicCard sx={{ height: "auto", width: "400px", padding: "20px", boxShadow: 3 }}>
        <Title text="Create a Account" />

        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={handleNameChange}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <EmailInputField value={email} onChange={handleEmailChange} />
          </Box>

          <Box sx={{ mb: 2 }}>
            <PasswordInputField value={password} onChange={handlePasswordChange} />
          </Box>

          <Box sx={{ mb: 2 }}>
            <PasswordInputField
              label="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select value={role} onChange={handleRoleChange} label="Role">
              
                <MenuItem value="developer">
                  <CodeIcon sx={{ mr: 1 }} /> Developer
                </MenuItem>
                <MenuItem value="client">
                  <PersonIcon sx={{ mr: 1 }} /> Client
                </MenuItem>
              </Select>
            </FormControl>
          </Box>

          {error && (
            <Typography variant="body2" color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <Box sx={{ mb: 2 }}>
            <BasicButton
              type="submit"
              sx={{ minHeight: "50px", minWidth: "100%" }}
              label="Save"
            />
          </Box>

          <Box className="footer-text" sx={{ textAlign: "center" }}>
            <span>Already have an account? </span>
            <MuiLink component={RouterLink} to="/auth/login" underline="hover" color="primary">
              Sign in here
            </MuiLink>
          </Box>
        </form>
      </BasicCard>
    </div>
  );
};

export default SignUpForm;
