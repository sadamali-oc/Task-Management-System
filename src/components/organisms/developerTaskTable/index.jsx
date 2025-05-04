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
} from "@mui/material";
import AddCommentIcon from "@mui/icons-material/AddComment";
import CommentBox from "../../molecules/commentBox";

const DeveloperTaskTable = ({ tasks = [], onStatusChange }) => {
  const [openCommentBox, setOpenCommentBox] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [comment, setComment] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleCommentClick = (taskId) => {
    setSelectedTaskId(taskId);
    setOpenCommentBox(true);
  };

  const handleCloseCommentBox = () => {
    setOpenCommentBox(false);
    setSelectedTaskId(null);
  };

  const handleSaveComment = () => {
    console.log(`Saved comment for Task ID ${selectedTaskId}:`, comment);
    handleCloseCommentBox();
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
                      <AddCommentIcon
                        titleAccess="Add comment"
                        sx={{ cursor: "pointer", color: "#121213b5" }}
                        onClick={() => handleCommentClick(task.id)}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Select
                        value={task.status}
                        onChange={(e) => onStatusChange(task.id, e.target.value)}
                        disabled={task.status === "completed"}
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
                        title={task.status === "completed" ? "Task already completed" : ""}
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

export default DeveloperTaskTable;
