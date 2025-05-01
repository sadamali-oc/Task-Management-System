import React, { useState } from "react";
import BasicCard from "../../atoms/basicCard";
import InputText from "../../atoms/inputText";
import BasicButton from "../../atoms/basicButton";
import InputAdornment from "@mui/material/InputAdornment";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import Title from "../../atoms/title";
import TaskTable from "../../molecules/ClientTaskTable";

const CreateTaskForm = () => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (taskName.trim() === "") {
      setError("Task name is required.");
      return;
    }

    const taskData = {
      id: Date.now(),
      taskName,
      description,
      status: "unread",
    };

    setTasks([taskData, ...tasks]);
    setTaskName("");
    setDescription("");
    setError("");
  };

  return (
    <div>

      <BasicCard
        sx={{
          padding: "20px",
          width: "900px",
          margin: "auto",
          marginBottom: "20px",
        }}
      >
        <form onSubmit={handleSubmit}>
          {error && (
            <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>
          )}

          <div style={{ marginBottom: "16px" }}>
            <InputText
              label="Task Name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              inputSlotProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DriveFileRenameOutlineIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <InputText
              label="Task Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline={true}
            />
          </div>

          <BasicButton label="Create Task" type="submit" />
        </form>
      </BasicCard>

   
    </div>
  );
};

export default CreateTaskForm;
