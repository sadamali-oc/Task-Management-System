import React, { useState } from "react";
import BasicCard from "../../atoms/basicCard";
import EmailInputField from "../../molecules/emailInputField";
import PasswordInputField from "../../molecules/passwordInputField";
import BasicButton from "../../atoms/basicButton";
import { Box, Link as MuiLink } from "@mui/material";
import Title from "../../atoms/title";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import UseAuthStore from "../../../store/UseAuthStore";
import "./LoginForm.css";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const LoginForm = () => {
  const navigate = useNavigate();
  const loginUser = UseAuthStore((state) => state.loginUser);

  //email,pwd,alert  states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  //form submit handler function

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

  //hard coded user credentials

    const users = {
      admin: {
        email: "admin@example.com",
        name: "Peshala Ishari",
        password: "admin123",
        role: "admin",
      },

      developer: {
        email: "dev@example.com",
        name: "Nisal Karunarathne",
        password: "dev123",
        role: "developer",
      },

      client: {
        email: "client@example.com",
        name: "Kamal Nishantha",
        password:"client123",
        role: "client",
      },
    };

    

    let matchedUser = null;

    if (email === users.admin.email && password === users.admin.password) {
      matchedUser = users.admin;
    } else if (
      email === users.developer.email &&
      password === users.developer.password
    ) {
      matchedUser = users.developer;
    } else if (
      email === users.client.email &&
      password === users.client.password
    ) {
      matchedUser = users.client;
    }

    if (matchedUser) {
      setError("");
      loginUser(matchedUser);
      setShowSuccessAlert(true);

      setTimeout(() => {
        setShowSuccessAlert(false);
        navigate("/dashboard");
      }, 3500);
    } else {
      setError("Invalid email or password.");
      setShowSuccessAlert(false);
    }
  };

  return (
    <div>
      <BasicCard
        sx={{ height: "auto", width: "400px", padding: "20px", boxShadow: 3 }}
      >
        <Title text="Sign In" />

        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <img
            src="src/assets/login.png"
            alt="Login"
            style={{ width: "200px", height: "auto" }}
          />
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
            <EmailInputField
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
            />
          </Box>
          <Box sx={{ mb: 1 }}>
            <PasswordInputField
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              autoComplete="off"
            />
          </Box>
          <Box className="forgot-password" sx={{ textAlign: "right", mb: 2 }}>
            <MuiLink href="forgot-password" underline="hover">
              Forgot Password?
            </MuiLink>
          </Box>

          <Box sx={{ mb: 2 }}>
            <BasicButton
              type="submit"
              sx={{
                minHeight: "50px",
                minWidth: "100%",
                textTransform: "none",
              }}
              label="Sign In"
            />
          </Box>

          <Box className="footer-text" sx={{ textAlign: "center" }}>
            <span>Don't have an account? </span>
            <MuiLink
              component={RouterLink}
              to="/auth/signup"
              underline="hover"
              color="primary"
            >
              Sign up here
            </MuiLink>
          </Box>
        </form>
      </BasicCard>
    </div>
  );
};

export default LoginForm;
