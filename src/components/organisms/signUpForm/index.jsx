import React, { useState } from "react";
import { Box, TextField, Typography, Link as MuiLink } from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import BasicCard from "../../atoms/basicCard";
import EmailInputField from "../../molecules/emailInputField";
import PasswordInputField from "../../molecules/passwordInputField";
import BasicButton from "../../atoms/basicButton";
import Title from "../../atoms/title";
import "./SignUpForm.css";

const SignUpForm = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

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

    const newUser = { name, email, password };
    localStorage.setItem("user", JSON.stringify(newUser));

    setError("");
    console.log("User registered:", newUser);

    navigate("/auth/login");
  };

  return (
    <div>
      <BasicCard
        sx={{ height: "auto", width: "400px", padding: "20px", boxShadow: 3 }}
      >
        <Title text="Sign Up" />

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
            <PasswordInputField
              value={password}
              onChange={handlePasswordChange}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <PasswordInputField
              label="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
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
              label="Sign Up"
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
