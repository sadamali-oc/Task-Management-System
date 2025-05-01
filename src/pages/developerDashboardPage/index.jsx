import React, { useState } from "react";
import DeveloperTaskTable from "../../components/organisms/developerTaskTable";

const dummyTasks = [
  { taskName: "Fix Login Bug", description: "Resolve error 401", status: "pending" },
  { taskName: "Update UI", description: "Redesign dashboard", status: "processing" },
  { taskName: "Write Tests", description: "Add unit tests", status: "completed" },
];

export default function DeveloperDashboardPage() {
  const [tasks, setTasks] = useState(dummyTasks);

  const handleStatusChange = (index, newStatus) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].status = newStatus;
    setTasks(updatedTasks);
  };

  return (
    <div style={{ padding: "24px" }}>
     
      <DeveloperTaskTable tasks={tasks} onStatusChange={handleStatusChange} />
    </div>
  );
}
