import React from 'react';
import PasswordResetForm  from "../../components/organisms/passwordResetForm"
import AuthTemplate from '../../components/templates/authTemplate';

const PasswordResetPage = () => {
  return (
    <>
    <AuthTemplate>
    <PasswordResetForm  />
    </AuthTemplate>
     
    </>
  );
};

export default PasswordResetPage;
