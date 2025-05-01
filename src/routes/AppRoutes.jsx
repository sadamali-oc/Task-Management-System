import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/loginPage";
import SignUpPage from "../pages/signUpPage";
import PasswordResetPage from "../pages/passwordResetPage";
import CreateTaskPage from "../pages/createtaskPage";
import TaskCard from "../components/molecules/assignTaskCard";
import ClientTaskTable from "../components/molecules/ClientTaskTable";
import MainDashboardTemplate from "../components/templates/mainDashboardTemplate";
import DeveloperTaskTable from "../components/organisms/developerTaskTable"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/signup" element={<SignUpPage />} />
      <Route path="/auth/forgot-password" element={<PasswordResetPage />} />
      <Route path="/" element={<MainDashboardTemplate />}>
        <Route path="create-task" element={<CreateTaskPage />} />
        <Route path="tasks" element={<ClientTaskTable />} />
        <Route path="assign" element={<DeveloperTaskTable/>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
