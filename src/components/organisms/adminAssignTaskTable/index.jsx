import React from "react";
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
} from "@mui/material";

// Dummy Data for Developers
const developers = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "David Brown" },
];

// Column definitions for table head
const tableColumns = [
  { id: "taskName", label: "Task Name" },
  { id: "description", label: "Description" },
  { id: "category", label: "Category" },
  { id: "subcategory", label: "Subcategory" },
  { id: "assignedDeveloper", label: "Assigned Developer" },
  { id: "status", label: "Status" },
];

// Shared style for Select components
const selectStyle = {
  minWidth: "150px",
  borderRadius: "20px",
  fontSize: "14px",
  padding: "8px",
  textAlign: "center",
  height: "50px",
};

const AdminAssignTaskTable = ({ tasks = [], onStatusChange, onAssignTask }) => {
  const handleDeveloperChange = (taskId, developerId) => {
    onAssignTask(taskId, developerId);
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <TableContainer sx={{ maxHeight: 500, overflowX: "auto" }}>
        <Table stickyHeader>
          {/* Table Head */}
          <TableHead>
            <TableRow sx={{ bgcolor: "#f0f0f0" }}>
              {tableColumns.map((column) => (
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

          {/* Table Body */}
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell align="center">{task.taskName}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell align="center">{task.category}</TableCell>
                <TableCell align="center">{task.subcategory}</TableCell>

                {/* Assign Developer Dropdown */}
                <TableCell align="center">
                  <FormControl fullWidth>
                    <Select
                      value={task.developer || ""}
                      onChange={(e) =>
                        handleDeveloperChange(task.id, e.target.value)
                      }
                      displayEmpty
                      sx={{
                        ...selectStyle,
                        bgcolor: task.developer ? "#d0f2d8" : "#fff",
                        color: task.developer ? "#388e3c" : "#000",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: task.developer ? "#81c784" : "#ccc",
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
                    onChange={(e) =>
                      onStatusChange(task.id, e.target.value)
                    }
                    displayEmpty
                    sx={{
                      ...selectStyle,
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
    </Paper>
  );
};

export default AdminAssignTaskTable;
