import React, { useState } from "react";
import BasicCard from "../../atoms/basicCard";
import FormField from "../../molecules/formField";
import CategorySelector from "../../molecules/categorySelector";
import BasicButton from "../../atoms/basicButton";
import { Box, Paper } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import useTaskStore from "../../../store/useTaskStore"; // Import Zustand store

const CreateTaskForm = () => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [error, setError] = useState({
    taskNameError: "",
    categoryError: "",
    subcategoryError: "",
  });

  // Access addTask from Zustand store
  const addTask = useTaskStore((state) => state.addTask);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset error states
    setError({ taskNameError: "", categoryError: "", subcategoryError: "" });

    let hasError = false;

    // Validate fields
    if (taskName.trim() === "") {
      setError((prev) => ({ ...prev, taskNameError: "Task name is required." }));
      hasError = true;
    }

    if (!category) {
      setError((prev) => ({ ...prev, categoryError: "Please select a category." }));
      hasError = true;
    }

    if (!subcategory) {
      setError((prev) => ({ ...prev, subcategoryError: "Please select a subcategory." }));
      hasError = true;
    }

    if (hasError) return;

    const taskData = {
      id: `task-${new Date().getTime()}`, // Unique ID based on timestamp
      taskName,
      description,
      category,
      subcategory,
      status: "unread", // Default status
    };

    // Use addTask from Zustand store to add the task
    addTask(taskData);

    setTaskName("");
    setDescription("");
    setCategory("");
    setSubcategory("");
  };

  return (
    <div>
      <Paper sx={{ padding: "10px", marginTop: "2px" }}>
        <form onSubmit={handleSubmit}>
          <FormField
            label="Task Name*"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            error={!!error.taskNameError}
            helperText={error.taskNameError} // Conditionally show error message here
          />
          <FormField
            label="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            error={false}
          />
          <CategorySelector
            category={category}
            setCategory={setCategory}
            subcategory={subcategory}
            setSubcategory={setSubcategory}
            categoryError={error.categoryError}
            subcategoryError={error.subcategoryError}
          />

          <Box display="flex" justifyContent="flex-end" mt={2}>
            <BasicButton
              label="Create Task"
              type="submit"
              startIcon={<AddCircleIcon />}
            />
          </Box>
        </form>
      </Paper>
    </div>
  );
};

export default CreateTaskForm;
