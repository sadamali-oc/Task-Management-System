import React, { useEffect } from "react";
import AdminAssignTaskTable from "../../components/organisms/adminAssignTaskTable";
import useTaskStore from "../../store/useTaskStore";
import useAuthStore from "../../store/useAuthStore";

const AdminDashboardPage = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const developers = useTaskStore((state) => state.developers); // Assuming developers are stored in the state
  const assignDeveloper = useTaskStore((state) => state.assignDeveloper);
  const updateStatus = useTaskStore((state) => state.updateStatus);
  const loggedInUser = useAuthStore((state) => state.loggedInUser); // Get logged-in user

  useEffect(() => {
    if (loggedInUser && loggedInUser.role === "developer") {
      // If the logged-in user is a developer, you can add them to the developers list
      useTaskStore.getState().setDevelopers((prevDevelopers) => {
        // Add the logged-in user to the developers list only if they are not already in the list
        if (!prevDevelopers.some((dev) => dev.id === loggedInUser.id)) {
          return [...prevDevelopers, loggedInUser];
        }
        return prevDevelopers;
      });
    }
  }, [loggedInUser]);

  const handleAssignTask = (taskId, developerId) => {
    console.log("Assigning Developer: Task ID:", taskId, "Developer ID:", developerId);
    assignDeveloper(taskId, developerId);
  };

  const handleStatusChange = (taskId, newStatus) => {
    console.log("Changing Status: Task ID:", taskId, "New Status:", newStatus);
    updateStatus(taskId, newStatus);
  };

  return (
    <div>
      <AdminAssignTaskTable
        tasks={tasks}
        developers={developers}
        onAssignTask={handleAssignTask}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default AdminDashboardPage;
