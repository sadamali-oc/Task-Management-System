import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  TableContainer,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import ErrorIcon from "@mui/icons-material/Error";
import useTaskStore from "../../../store/useTaskStore";

const statusIcon = {
  completed: <CheckCircleIcon color="success" sx={{ mr: 1 }} />,
  processing: <HourglassBottomIcon color="warning" sx={{ mr: 1 }} />,
  pending: <ErrorIcon color="error" sx={{ mr: 1 }} />,
};

const dummyTasks = [
  {
    taskName: "Build Login Page",
    description: "Implement the user login page with basic authentication functionality using React and integrate it with the backend for validation.",
    category: "Frontend",
    subcategory: "React",
    status: "processing",
  },
  {
    taskName: "Fix Payment Bug",
    description: "Investigate and fix the payment gateway issue causing users to receive incorrect transaction statuses and error messages. Ensure that the payment system is working properly across all supported payment methods.",
    category: "Backend",
    subcategory: "Node.js",
    status: "completed",
  },
  {
    taskName: "Prepare Docs",
    description: "Write comprehensive API documentation including authentication mechanisms, endpoints, request/response formats, error codes, and usage examples for the public API.",
    category: "Documentation",
    subcategory: "API",
    status: "pending",
  },
  {
    taskName: "Implement Search Functionality",
    description: "Develop the search functionality for the application, allowing users to search for specific tasks or projects with filtering options based on categories, tags, and dates.",
    category: "Frontend",
    subcategory: "React",
    status: "pending",
  },
  {
    taskName: "Setup Database Schema",
    description: "Design and set up the initial database schema for the application, including tables for users, tasks, projects, and logs, ensuring normalization and relational integrity.",
    category: "Backend",
    subcategory: "SQL",
    status: "processing",
  },
];


const ClientTaskTable = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);

  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    if (tasks.length === 0) {
      dummyTasks.forEach(addTask);
    }
  }, [tasks, addTask]);

  const filteredTasks = tasks.filter((task) => {
    return statusFilter === "all" || task.status === statusFilter;
  });

  const uniqueStatuses = ["all", ...new Set(tasks.map((task) => task.status))];

  return (
    <Paper sx={{ padding: "16px" }}>


      {/* Filters */}
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <FormControl sx={{ minWidth: 300 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {uniqueStatuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>



      {/* Table */}
      <TableContainer sx={{ maxHeight: 400 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {["Task Name", "Description", "Category", "Status"].map((label, index) => (
                <TableCell
                  key={index}
                  align="center"
                  sx={{
                    backgroundColor: "#d6dbe0",
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                >
                  {label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTasks.map((task, index) => (
              <TableRow key={index}>
                <TableCell align="center">{task.taskName}</TableCell>
                <TableCell
                  align="justify"
                  sx={{
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                    maxWidth: 300,
                  }}
                >
                  {task.description}
                </TableCell>
                <TableCell align="center">{task.category}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color={
                      task.status === "completed"
                        ? "success"
                        : task.status === "processing"
                        ? "warning"
                        : "error"
                    }
                    sx={{
                      textTransform: "none",
                      minWidth: "120px",
                      borderRadius: "20px",
                    }}
                  >
                    {statusIcon[task.status]}
                    <Typography variant="subtitle1" color="inherit">
                      {task.status}
                    </Typography>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Footer */}
      <Box mt={2}>
        <Typography variant="subtitle1" align="right">
        </Typography>
      </Box>
    </Paper>
  );
};

export default ClientTaskTable;
