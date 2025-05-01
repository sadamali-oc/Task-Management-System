import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/loginPage";
import SignUpPage from "../pages/signUpPage";
import MainDashboard from "../components/templates/MainDashboard";
import PasswordResetPage from "../pages/passwordResetPage";
import CreateTaskPage from "../pages/CreatetaskPage";
import TaskList from "../components/organisms/taskList";
import TaskCard from "../components/molecules/taskCard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/signup" element={<SignUpPage />} />
      <Route path="/auth/forgot-password" element={<PasswordResetPage />} />
      <Route path="/dashboard" element={<MainDashboard />} />

      <Route path="/client/create/task" element={<CreateTaskPage />} />

      <Route path="" element={< TaskCard />} />

    </Routes>
  );
};

export default AppRoutes;
