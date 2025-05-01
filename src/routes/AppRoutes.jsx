import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/loginPage";
import SignUpPage from "../pages/signUpPage";
import PasswordResetPage from "../pages/passwordResetPage";
import MainDashboard from "../components/templates/MainDashboard";
import CreateTaskPage from "../pages/CreatetaskPage";
import TaskList from "../components/organisms/taskList";
import TaskCard from "../components/molecules/taskCard";
import ClientTaskTable from "../components/molecules/ClientTaskTable"

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/signup" element={<SignUpPage />} />
      <Route path="/auth/forgot-password" element={<PasswordResetPage />} />

      {/* Dashboard Layout with nested routes */}
      <Route path="/" element={<MainDashboard />}>
        <Route path="create-task" element={<CreateTaskPage />} />
        {/* <TaskTable tasks={tasks} /> */}
        <Route path="tasks" element={<ClientTaskTable />} />
        <Route path="task/:id" element={<TaskCard />} />
        {/* Add more nested routes here */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
