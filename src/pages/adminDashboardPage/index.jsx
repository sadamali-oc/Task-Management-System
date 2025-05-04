import React, { useState } from "react";
import AdminAssignTaskTable from "../../components/organisms/adminAssignTaskTable";

const tasksData = [
  {
    id: 1,
    taskName: "Build Login Page",
    description:
      "Implement the user login page using React, including form validation, input handling, and UI responsiveness.",
    category: "Frontend",
    subcategory: "React",
    status: "processing",
  },
  {
    id: 2,
    taskName: "Fix Payment Bug",
    description:
      "Investigate and fix the payment gateway timeout issue occurring during transaction processing.",
    category: "Backend",
    subcategory: "Node.js",
    status: "completed",
  },
  {
    id: 3,
    taskName: "Prepare API Docs",
    description:
      "Write API usage documentation, including setup instructions, authentication methods, endpoint descriptions, and example requests.",
    category: "Documentation",
    subcategory: "API",
    status: "pending",
  },
  {
    id: 4,
    taskName: "User Authentication",
    description:
      "Set up user authentication with JWT in the backend, ensuring secure login and session management.",
    category: "Backend",
    subcategory: "Node.js",
    status: "processing",
  },
  {
    id: 5,
    taskName: "Create Dashboard UI",
    description:
      "Develop the dashboard UI in React, integrating with backend data and displaying user statistics.",
    category: "Frontend",
    subcategory: "React",
    status: "pending",
  },
  {
    id: 6,
    taskName: "Optimize Database Queries",
    description:
      "Analyze and optimize slow database queries, ensuring better performance under load.",
    category: "Backend",
    subcategory: "Database Optimization",
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
