import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  Box,
  FormControl,
  InputLabel,
  TableContainer,
  Paper,
  Typography,
  Tooltip,
  Button,
} from "@mui/material";
import AddCommentIcon from "@mui/icons-material/AddComment";
import CommentBox from "../../molecules/commentBox";
import useTaskStore from "../../../store/useTaskStore"; // Zustand store

const DeveloperTaskTable = ({ tasks = [], onStatusChange }) => {
  const [openCommentBox, setOpenCommentBox] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [comment, setComment] = useState("");
  const [isReply, setIsReply] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");

  const { updateTaskComment, addReply } = useTaskStore();

  const handleCommentClick = (taskId, commentId = null) => {
    setSelectedTaskId(taskId);
    setSelectedCommentId(commentId);
    setIsReply(commentId !== null);
    setOpenCommentBox(true);
  };

  const handleCloseCommentBox = () => {
    setOpenCommentBox(false);
    setSelectedTaskId(null);
    setSelectedCommentId(null);
    setIsReply(false);
    setComment("");
  };

  const handleSaveComment = () => {
    if (!comment.trim()) return; // prevent empty submissions

    if (isReply && selectedCommentId !== null) {
      addReply(selectedTaskId, selectedCommentId, comment); // Save the reply
    } else {
      updateTaskComment(selectedTaskId, comment); // Save the main comment
    }

    handleCloseCommentBox();
  };

  const handleStatusChange = (taskId, newStatus) => {
    onStatusChange(taskId, newStatus);
  };

  const filteredTasks = tasks.filter(
    (task) => statusFilter === "all" || task.status === statusFilter
  );

  const uniqueStatuses = ["all", ...new Set(tasks.map((task) => task.status))];

  const headerCellStyle = {
    fontWeight: "bold",
    fontSize: "15px",
    backgroundColor: "#d6dbe0",
    position: "sticky",
    top: 0,
    zIndex: 1,
    textAlign: "center",
  };

  const getStatusStyles = (status) => {
    const styles = {
      pending: {
        backgroundColor: "#fdecea",
        color: "#d32f2f",
        borderColor: "#e57373",
      },
      processing: {
        backgroundColor: "#fff4e5",
        color: "#f57c00",
        borderColor: "#ffb74d",
      },
      completed: {
        backgroundColor: "#d0f2d8",
        color: "#388e3c",
        borderColor: "#81c784",
      },
    };
    return styles[status] || {};
  };

  return (
    <Paper sx={{ padding: 2 }}>
      {/* Filter */}
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {uniqueStatuses.map((status) => {
              // Check if the status is valid before calling charAt
              if (!status) return null;
              return (
                <MenuItem key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>

      {/* Table */}
      <TableContainer sx={{ maxHeight: 400 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {["Task Name", "Description", "Category", "Subcategory", "Comment", "Status"].map(
                (label) => (
                  <TableCell key={label} sx={headerCellStyle}>
                    {label}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No tasks match the selected filter.
                </TableCell>
              </TableRow>
            ) : (
              filteredTasks.map((task) => {
                const statusStyles = getStatusStyles(task.status);

                return (
                  <TableRow key={task.id}>
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
                    <TableCell align="center">{task.subcategory}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Add Comment">
                        <AddCommentIcon
                          sx={{ cursor: "pointer", color: "#121213b5" }}
                          onClick={() => handleCommentClick(task.id)}
                        />
                      </Tooltip>
                      {task.comments?.length > 0 && (
                        <Typography variant="caption" display="block" mt={0.5}>
                          {task.comments.length} comment{task.comments.length > 1 ? "s" : ""}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <Select
                        value={task.status || "unknown"}  // Default to 'unknown' if task.status is undefined
                        onChange={(e) => handleStatusChange(task.id, e.target.value)}
                        displayEmpty
                        sx={{
                          minWidth: "100px",
                          borderRadius: "20px",
                          bgcolor: statusStyles.backgroundColor,
                          color: statusStyles.color,
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: statusStyles.borderColor,
                          },
                          "& .MuiSelect-select": {
                            paddingTop: "8px",
                            paddingBottom: "8px",
                            minHeight: "30px",
                            display: "flex",
                            alignItems: "center",
                            fontWeight: 500,
                            textAlign: "center",
                            textTransform: "capitalize",
                          },
                        }}
                      >
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="processing">Processing</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                      </Select>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Comment Box Modal */}
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

export default DeveloperTaskTable;
