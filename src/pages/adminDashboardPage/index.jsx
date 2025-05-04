import React, { useState } from "react";
import AdminAssignTaskTable from "../../components/organisms/adminAssignTaskTable";

const tasksData = [
  {
    id: 1,
    taskName: "Design Admin Dashboard UI",
    description: "Create responsive and user-friendly UI mockups for the admin dashboard, including tables, forms, and charts using Figma or Adobe XD.",
    category: "Design",
    subcategory: "Web",
    status: "pending",
  },
  {
    id: 2,
    taskName: "Integrate Authentication API",
    description: "Implement user authentication and authorization by connecting to the existing REST API using JWT-based login and role-based access control.",
    category: "Development",
    subcategory: "Backend",
    status: "processing",
  },
  {
    id: 3,
    taskName: "Setup PostgreSQL Database Schema",
    description: "Design and implement the PostgreSQL database schema including users, tasks, and project modules with foreign key relationships and initial seed data.",
    category: "Database",
    subcategory: "SQL",
    status: "completed",
  },
];
const AdminDashboardPage = () => {
  const [tasks, setTasks] = useState(tasksData);

  const handleAssignTask = (taskId, developerId) => {
    setTasks(tasks.map((task) =>
      task.id === taskId ? { ...task, developer: developerId } : task
    ));
  };

  const handleStatusChange = (taskIndex, newStatus) => {
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex].status = newStatus;
    setTasks(updatedTasks);
  };

  return (
    <div>
      <AdminAssignTaskTable
        tasks={tasks}
        onStatusChange={handleStatusChange}
        onAssignTask={handleAssignTask}
      />
    </div>
  );
};

export default AdminDashboardPage;
