import React  from "react";
import DeveloperTaskTable from "../../components/organisms/developerTaskTable";
import useTaskStore from "../../store/useTaskStore";


export default function DeveloperDashboardPage() {

  const tasks = useTaskStore((state)=> state.tasks)
  const updateStatus = useTaskStore((state) => state.updateStatus);



  const handleStatusChange = (taskId, newStatus) => {
    console.log("Changing Status: Task ID:", taskId, "New Status:", newStatus); // Log status change
    updateStatus(taskId, newStatus);
  };


  return (
    <>
      <DeveloperTaskTable tasks={tasks} onStatusChange={handleStatusChange} />
    </>
  );
}
