import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
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
    description:
      "Implement the user login page using React, including form validation, input handling, and UI responsiveness. Integrate with backend authentication services and ensure error handling for incorrect credentials and server issues.",
    category: "Frontend",
    subcategory: "React",
    status: "processing",
  },
  {
    taskName: "Fix Payment Bug",
    description:
      "Investigate and fix the payment gateway timeout issue occurring during transaction processing. Ensure that the payment system works seamlessly under heavy traffic and verify the fix through load testing.",
    category: "Backend",
    subcategory: "Node.js",
    status: "completed",
  },
  {
    taskName: "Prepare Docs",
    description:
      "Write comprehensive API usage documentation, including setup instructions, authentication methods, endpoint descriptions, and example requests and responses. The documentation should be clear and easy to follow for both front-end developers and external users.",
    category: "Documentation",
    subcategory: "API",
    status: "pending",
  },
];


const ClientTaskTable = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);

  useEffect(() => {
    if (tasks.length === 0) {
      dummyTasks.forEach(addTask);
    }
  }, [tasks, addTask]);

  return (
    <Paper sx={{ padding: "16px", overflow: "hidden" }}>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: "#d6dbe08d" }}>
            <TableCell align="center">Task Name</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Category</TableCell>
            <TableCell align="center">Subcategory</TableCell>
            <TableCell align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task, index) => (
            <TableRow key={index}>
              <TableCell>{task.taskName}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell align="center">{task.category}</TableCell>
              <TableCell align="center">{task.subcategory}</TableCell>
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
    </Paper>
  );
};

export default ClientTaskTable;
