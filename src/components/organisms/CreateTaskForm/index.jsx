import React, { useState } from "react";
import { Box, Paper, Alert, Stack } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import useTaskStore from "../../../store/useTaskStore";
import FormField from "../../molecules/formField";
import CategorySelector from "../../molecules/categorySelector";
import BasicButton from "../../atoms/basicButton";

const CreateTaskForm = () => {

  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState({


    taskNameError: "",
    categoryError: "",
    subcategoryError: "",

  });



  const addTask = useTaskStore((state) => state.addTask);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({ taskNameError: "", categoryError: "", subcategoryError: "" });
    setSuccess(false);

    let hasError = false;

    if (taskName.trim() === "") {
      setError((prev) => ({
        ...prev,
        taskNameError: "Task name is required.",
      }));
      hasError = true;
    }

    if (!category) {
      setError((prev) => ({
        ...prev,
        categoryError: "Please select a category.",
      }));
      hasError = true;
    }

    if (!subcategory) {
      setError((prev) => ({
        ...prev,
        subcategoryError: "Please select a subcategory.",
      }));
      hasError = true;
    }

    if (hasError) return;

    const taskData = {
      id: `task-${Date.now()}`,
      taskName,
      description,
      category,
      subcategory,
      status: "pending", 
    };

    addTask(taskData);

    setTaskName("");
    setDescription("");
    setCategory("");
    setSubcategory("");
    setSuccess(true);
  };

  return (
    <div>
      <Paper sx={{ padding: 2, marginTop: 2 }}>
        <form onSubmit={handleSubmit}>
          {success && (
            <Stack sx={{ mb: 2 }}>
              <Alert severity="success">Task created successfully!</Alert>
            </Stack>
          )}

          <FormField
            label="Task Name*"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            error={!!error.taskNameError}
            helperText={error.taskNameError}
          />
          <FormField
            label="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
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
