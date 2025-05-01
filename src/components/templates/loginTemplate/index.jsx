import React from 'react'
import { Box, Container } from "@mui/material";
import LoginForm from "../../organisms/loginForm"


const LoginTemplate = () => {
  return (
    <Container maxWidth="sm">
    <Box sx={{ mt: 8 }}>
      <LoginForm />
    </Box>
  </Container>
  )
}

export default LoginTemplate