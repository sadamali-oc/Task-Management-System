import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/loginPage";
import SignUpPage from "../pages/signUpPage";
import PasswordResetPage from "../pages/passwordResetPage";
import CreateTaskPage from "../pages/createtaskPage";
import ClientTaskTable from "../components/molecules/ClientTaskTable";
import MainDashboardTemplate from "../components/templates/mainDashboardTemplate";
import DeveloperDashboardPage from "../pages/developerDashboardPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/signup" element={<SignUpPage />} />
      <Route path="/auth/forgot-password" element={<PasswordResetPage />} />
      <Route path="/dashboard" element={<MainDashboardTemplate />}>
        <Route path="create-task" element={<CreateTaskPage />} />
        <Route path="tasks" element={<ClientTaskTable />} />
        <Route path="assign" element={<DeveloperDashboardPage/>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
