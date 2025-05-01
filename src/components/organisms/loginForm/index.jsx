import React, { useState } from "react";
import BasicCard from "../../atoms/basicCard";
import EmailInputField from "../../molecules/emailInputField";
import PasswordInputField from "../../molecules/passwordInputField";
import BasicButton from "../../atoms/basicButton";
import { Box, Typography, Link as MuiLink } from "@mui/material";
import Title from "../../atoms/title";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import useUserStore from "../../../store/UseAuthStore";
import "./LoginForm.css";

const LoginForm = () => {
  const navigate = useNavigate();
  const loginUser = useUserStore((state) => state.loginUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.email !== email || storedUser.password !== password) {
      setError("Invalid email or password.");
      return;
    }

    setError("");
    loginUser(storedUser);
    navigate("/dashboard");
  };

  return (
    <div>
      <BasicCard sx={{ height: "auto", width: "400px", padding: "20px", boxShadow: 3 }}>
        <Title text="Sign in" />
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 2 }}>
            <EmailInputField value={email} onChange={handleEmailChange} />
          </Box>
          <Box sx={{ mb: 1 }}>
            <PasswordInputField value={password} onChange={handlePasswordChange} />
          </Box>
          <Box className="forgot-password" sx={{ textAlign: "right", mb: 2 }}>
            <MuiLink href="forgot-password" underline="hover">Forgot Password?</MuiLink>
          </Box>
          {error && (
            <Typography variant="body2" color="error" sx={{ mb: 2 }}>{error}</Typography>
          )}
          <Box sx={{ mb: 2 }}>
            <BasicButton type="submit" sx={{ minHeight: "50px", minWidth: "100%" ,textTransform:"none"}} label="Sign In" />
          </Box>
          <Box className="footer-text" sx={{ textAlign: "center" }}>
            <span>Don't have an account? </span>
            <MuiLink component={RouterLink} to="/auth/signup" underline="hover" color="primary">
              Sign up here
            </MuiLink>
          </Box>
        </form>
      </BasicCard>
    </div>
  );
};

export default LoginForm;
