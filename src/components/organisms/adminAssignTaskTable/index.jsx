import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  Paper,
  TableContainer,
  Snackbar,
  Stack,
  Alert,
} from "@mui/material";
import api from "../../../api/api";
import useAuthStore from "../../../store/useAuthStore";

const AdminAssignTaskTable = ({ onStatusChange, isStatusEditable = false }) => {
  const { token } = useAuthStore();
  const [tasks, setTasks] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false); // Success alert state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const developersResponse = await api.get("/admin/developers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDevelopers(developersResponse.data.developers);

        const tasksResponse = await api.get("/admin/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(tasksResponse.data.tasks);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(
          "Failed to fetch data. Please check your authentication or permissions."
        );
        setOpenSnackbar(true);
      }
    };

    fetchData();
  }, [token]);

  const handleDeveloperChange = async (taskId, developerId) => {
    try {
      await api.put(
        `/admin/task/${taskId}/assign`,
        { developer_id: developerId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, assigned_to: developerId } : task
        )
      );

      // Show success alert after assignment
      setShowSuccessAlert(true);
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 2000); // Hide after 2 seconds
    } catch (error) {
      console.error("Error reassigning developer:", error);
      setError("Failed to assign developer. Please try again.");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Paper sx={{ padding: 2 }}>
      {/* Success Alert */}
      {showSuccessAlert && (
        <Stack sx={{ width: "100%", mb: 2 }} spacing={2}>
          <Alert severity="success">Developer assigned successfully!</Alert>
        </Stack>
      )}

      <TableContainer sx={{ maxHeight: 500, overflowX: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ bgcolor: "#f0f0f0" }}>
              {[
                { id: "taskName", label: "Task Name" },
                { id: "description", label: "Description" },
                { id: "category", label: "Category" },
                { id: "subcategory", label: "Subcategory" },
                { id: "assignedDeveloper", label: "Assigned Developer" },
                { id: "status", label: "Status" },
              ].map((column) => (
                <TableCell
                  key={column.id}
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    backgroundColor: "#d6dbe0",
                    padding: "10px",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell align="center">{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell align="center">{task.category_name}</TableCell>
                <TableCell align="center">{task.subcategory_name}</TableCell>

                {/* Assign Developer Dropdown */}
                <TableCell align="center">
                  <FormControl fullWidth>
                    <Select
                      value={task.assigned_to || ""}
                      onChange={(e) => {
                        handleDeveloperChange(task.id, e.target.value);
                      }}
                      displayEmpty
                      sx={{
                        minWidth: "150px",
                        borderRadius: "20px",
                        fontSize: "14px",
                        padding: "8px",
                        textAlign: "center",
                        height: "50px",
                        bgcolor: task.assigned_to ? "#f8fbf9" : "#fff4e5",
                        color: task.assigned_to ? "#388e3c" : "#d32f2f",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: task.assigned_to ? "#81c784" : "#ffcccb",
                        },
                      }}
                    >
                      <MenuItem value="">None</MenuItem>
                      {developers.map((developer) => (
                        <MenuItem key={developer.id} value={developer.id}>
                          {developer.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>

                {/* Task Status Dropdown */}
                <TableCell align="center">
                  <Select
                    value={task.status || "pending"}
                    onChange={(e) => {
                      if (isStatusEditable) {
                        onStatusChange(task.id, e.target.value);
                      }
                    }}
                    displayEmpty
                    sx={{
                      minWidth: "150px",
                      borderRadius: "20px",
                      fontSize: "14px",
                      padding: "8px",
                      textAlign: "center",
                      height: "50px",
                      bgcolor:
                        task.status === "completed"
                          ? "#d0f2d8"
                          : task.status === "processing"
                            ? "#fff4e5"
                            : "#fdecea",
                      color:
                        task.status === "completed"
                          ? "#388e3c"
                          : task.status === "processing"
                            ? "#f57c00"
                            : "#d32f2f",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor:
                          task.status === "completed"
                            ? "#81c784"
                            : task.status === "processing"
                              ? "#ffb74d"
                              : "#e57373",
                      },
                    }}
                    disabled={!isStatusEditable}
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="processing">Processing</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {error && (
        <Snackbar
          open={openSnackbar}
          onClose={handleCloseSnackbar}
          message={error}
          autoHideDuration={6000}
        />
      )}
    </Paper>
  );
};

export default AdminAssignTaskTable;
