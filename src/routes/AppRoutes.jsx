import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/loginPage";
import SignUpPage from "../pages/signUpPage";
import PasswordResetPage from "../pages/passwordResetPage";
import CreateTaskPage from "../pages/createTaskPage";
import ClientTaskTable from "../components/molecules/clientTaskTable";
import MainDashboardTemplate from "../components/templates/mainDashboardTemplate";
import DeveloperDashboardPage from "../pages/developerDashboardPage";
import AdminDashboardPage from "../pages/adminDashboardPage";

const AppRoutes = () => {
  return (
    <Routes>

      {/* login page */}
      <Route path="" element={<LoginPage />} />

     

      <Route path="/forgot-password" element={<PasswordResetPage />} />


      <Route path="/dashboard" element={<MainDashboardTemplate />}>
        <Route path="client/create-task" element={<CreateTaskPage />} />
        <Route path="tasks" element={<ClientTaskTable />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="assign" element={<DeveloperDashboardPage />} />
        <Route path="developer" element={<AdminDashboardPage/>} />
      </Route>


    </Routes>
  );
};

export default AppRoutes;
