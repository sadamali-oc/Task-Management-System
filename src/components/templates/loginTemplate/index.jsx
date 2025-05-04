import React from "react";
import { Box, Container } from "@mui/material";
import LoginForm from "../../organisms/loginForm";

const LoginTemplate = () => {
  return (
    <Container
      maxWidth="sm" 
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", 
        mt: 0,
      }}
    >
      <LoginForm />
    </Container>
  );
};

export default LoginTemplate;
