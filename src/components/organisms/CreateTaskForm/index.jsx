import React, { useState, useEffect } from "react";
import { Box, Paper, Alert, Stack, CircularProgress } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import useTaskStore from "../../../store/useTaskStore";
import FormField from "../../molecules/formField";
import CategorySelector from "../../molecules/categorySelector";
import BasicButton from "../../atoms/basicButton";
import api from "../../../api/api";
import useAuthStore from "../../../store/useAuthStore"; // Importing the auth store to get the token

const CreateTaskForm = () => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const [error, setError] = useState({
    taskNameError: "",
    categoryError: "",
    subcategoryError: "",
  });

  const createTask = useTaskStore((state) => state.createTask);

  // Fetching token from auth store
  const { token } = useAuthStore(state => state);

  const handleSubmit = async (e) => {
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
      title: taskName,  // Renamed taskName to title
      description: description.trim(),
      category_id: category,  // Renamed category to category_id
      subcategory_id: subcategory,  // Renamed subcategory to subcategory_id
    };

    // Log the data you're sending to the server to inspect the structure
    console.log("Sending task data:", taskData);

    if (!token) {
      setError((prev) => ({
        ...prev,
        taskNameError: "Authentication required. Please log in.",
      }));
      return;
    }

    setLoading(true); // Show loading state

    try {
      const response = await api.post(
        "/task/create",
        taskData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in headers
          },
        }
      );
      createTask(response.data); // Update Zustand store with new task
      setSuccess(true); // Show success message
      setTaskName("");
      setDescription("");
      setCategory("");
      setSubcategory("");
    } catch (err) {
      console.error("Error creating task:", err);
      setError((prev) => ({
        ...prev,
        taskNameError: err.response?.data?.message || "Failed to create task. Please try again.",
      }));
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <Paper sx={{ padding: 2, marginTop: 2 }}>
      <form onSubmit={handleSubmit}>
        {success && (
          <Stack sx={{ mb: 2 }}>
            <Alert severity="success">Task created successfully!</Alert>
          </Stack>
        )}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CircularProgress />
          </Box>
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
            disabled={loading} // Disable button while loading
          />
        </Box>
      </form>
    </Paper>
  );
};

export default CreateTaskForm;
