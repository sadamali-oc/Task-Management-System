// ClientTaskTable.js
import React, { useState, useEffect } from "react";
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
import CommentBox from "../../molecules/commentBox";
import CommentIcon from "@mui/icons-material/Comment";
import api from "../../../api/api";
import useAuthStore from "../../../store/useAuthStore";

// Icons for status
const statusIcon = {
  completed: <CheckCircleIcon color="success" sx={{ mr: 1 }} />,
  processing: <HourglassBottomIcon color="warning" sx={{ mr: 1 }} />,
  pending: <ErrorIcon color="error" sx={{ mr: 1 }} />,
};

const ClientTaskTable = () => {


  const [tasks, setTasks] = useState([]);  // State to store tasks
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTaskId, setSelectedTaskId] = useState(null);  // Track the task being commented on
  const [comment, setComment] = useState("");  // Store the comment text
  const [openCommentBox, setOpenCommentBox] = useState(false);  // Control the Comment Box visibility

  const fetchTasks = async () => {
    try {
      const response = await api.get("/task/my-tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error.response ? error.response.data : error);
    }
  };
  




  const { token } = useAuthStore(state => state);



  
  useEffect(() => {
    fetchTasks();  // Fetch tasks on component mount
  }, []);

  // Filter tasks based on selected status
  const filteredTasks = tasks.filter((task) => {
    return statusFilter === "all" || task.status === statusFilter;
  });

  // Unique statuses for the dropdown filter
  const uniqueStatuses = ["all", ...new Set(tasks.map((task) => task.status))];

  // Open the comment box for the specific task
  const handleCommentClick = (taskId) => {
    setSelectedTaskId(taskId);
    setOpenCommentBox(true);
  };

  // Close the comment box without saving
  const handleCloseCommentBox = () => {
    setOpenCommentBox(false);
    setSelectedTaskId(null);
  };

  // Save the comment and update the task
  const handleSaveComment = () => {
    if (selectedTaskId && comment) {
      // Here you would send the comment to the server or update the store
      // Assuming you are updating the task with the comment
      const updatedTasks = tasks.map((task) =>
        task.id === selectedTaskId ? { ...task, comments: comment } : task
      );
      setTasks(updatedTasks);  // Update the tasks state
      setComment("");  // Clear the comment field
      handleCloseCommentBox();  // Close the comment box
    }
  };

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
                {status
                  ? status.charAt(0).toUpperCase() + status.slice(1)
                  : "Unknown"}
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
              {["Task Name", "Description", "Category", "Status", "Comments"].map((label, index) => (
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
                <TableCell align="center">{task.title}</TableCell>
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
                <TableCell align="center">{task.category_name}</TableCell>
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
                <TableCell
                  align="center"
                  sx={{
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                    maxWidth: 300,
                    fontStyle: task.comments ? "normal" : "italic",
                    color: task.comments ? "inherit" : "gray",
                  }}
                >
                  {task.comments || "No comments"}
                  <CommentIcon
                    titleAccess="Add comment"
                    sx={{
                      cursor: "pointer",
                      color: "#121213b5",
                      ml: 1,
                    }}
                    onClick={() => handleCommentClick(task.id)} // Open the comment box
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Comment Box Pop-up */}
      <CommentBox
        open={openCommentBox}
        onClose={handleCloseCommentBox}
        onSave={handleSaveComment}
        comment={comment}
        setComment={setComment}
      />
    </Paper>
  );
};

export default ClientTaskTable;
