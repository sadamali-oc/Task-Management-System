import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, Typography
} from '@mui/material';
import BasicCard from '../../atoms/basicCard';

const dummyTasks = [
  { taskName: "Design Homepage", description: "Create landing page layout", status: "processing" },
  { taskName: "Fix Login Bug", description: "Resolve 401 error", status: "completed" },
  { taskName: "Write API Docs", description: "Document all user endpoints", status: "pending" },
];

const ClientTaskTable = ({ tasks = dummyTasks }) => {
  return (
    <BasicCard sx={{ width: "80%" }}>
      <Paper sx={{ padding: "16px", overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#d6dbe08d" }}>
              <TableCell align="center">Task Name</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task, index) => (
              <TableRow key={index}>
                <TableCell align="center">{task.taskName}</TableCell>
                <TableCell align="center">{task.description}</TableCell>
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
                      textTransform: 'none',
                      minWidth: '120px',
                      borderRadius: "20px",
                    }}
                  >
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
    </BasicCard>
  );
};

export default ClientTaskTable;
