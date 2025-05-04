import React from "react";
import AuthTemplate from "../../components/templates/authTemplate";
import LoginForm from '../../components/organisms/loginForm'
const LoginPage = () => {
  return (
    <>
      <AuthTemplate>
        <LoginForm />
      </AuthTemplate>
    </>
  );
};

export default LoginPage;
