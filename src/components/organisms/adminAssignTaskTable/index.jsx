import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

// Dummy Data for Developers
const developers = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "David Brown" },
];

const AdminAssignTaskTable = ({ tasks = [], onStatusChange, onAssignTask }) => {
  const [selectedDeveloper, setSelectedDeveloper] = useState({});
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const handleDeveloperChange = (taskId, developerId) => {
    setSelectedTaskId(taskId);
    setSelectedDeveloper(developerId);
    onAssignTask(taskId, developerId); // Assuming this function assigns the developer to the task.
  };

  return (
    <>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: "#d6dbe08d" }}>
            <TableCell align="center">Task Name</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Category</TableCell>
            <TableCell align="center">Subcategory</TableCell>
            <TableCell align="center">Assigned Developer</TableCell>
            <TableCell align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task, index) => (
            <TableRow key={index}>
              <TableCell align="center">{task.taskName}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell align="center">{task.category}</TableCell>
              <TableCell align="center">{task.subcategory}</TableCell>

              {/* Assign Developer Dropdown */}
              <TableCell align="center">
                <FormControl fullWidth>
                  <Select
                    value={task.developer || ""}
                    onChange={(e) => handleDeveloperChange(task.id, e.target.value)}
                    displayEmpty
                    sx={{ minWidth: "150px" }}
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
                  value={task.status}
                  onChange={(e) => onStatusChange(index, e.target.value)}
                  displayEmpty
                  sx={{
                    minWidth: "100px",
                    borderRadius: "20px",
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
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default AdminAssignTaskTable;
