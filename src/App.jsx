import React, { useState } from "react";
// import { Routes, Route } from "react-router-dom";
// import DashboardPage from "./pages/DashboardPage";
// import TasksPage from "./pages/taskPage";
// import MainLayout from "./components/templates/dashboardTemplate";
// import LoginForm from "./components/organisms/loginForm";
import AppRoutes from "./routes/AppRoutes";
import TaskCard from "./components/molecules/taskCard";
import CreateTaskForm from "./components/organisms/CreateTaskForm";
import InputText from "./components/atoms/inputText";
import ClientTaskTable from "./components/molecules/ClientTaskTable";
import DeveloperTaskTable from "./components/molecules/DeveloperTaskTable";

const App = () => {
  // const user = {
  //   name: "John Doe",
  //   email: "john.doe@example.com",
  //   role: "client",
  // };
  const [tasks, setTasks] = useState([
    {
      taskName: "Finish Documentation",
      description: "Complete the user manual and API docs.",
      status: "processing",
    },
    {
      taskName: "Design Homepage",
      description: "Design the layout and structure of the homepage.",
      status: "completed",
    },
    {
      taskName: "Fix Bugs in Login",
      description: "Resolve the issues with the login form validation.",
      status: "unread",
    },

  ]);


  const handleStatusChange = (index, newStatus) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].status = newStatus;
    setTasks(updatedTasks);
  };


  return (
    <div style={{ padding: "20px" }}>
      {/* <MainLayout user={user}>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/tasks" element={<TasksPage />} />
        </Routes>
      </MainLayout> */}

      {/* <LoginForm/> */}

      {/* <TaskTable/> */}

      <ClientTaskTable tasks={tasks} />

      <DeveloperTaskTable tasks={tasks} onStatusChange={handleStatusChange} />


      

      {/* < TaskCard /> */}
      {/* <AppRoutes /> */}
    </div>
  );
};

export default App;
