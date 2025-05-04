import React from "react";
import {  Container } from "@mui/material";

const AuthTemplate = ({children}) => {
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
      {children}
    </Container>
  );
};

export default AuthTemplate;
