import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
} from '@mui/material';
import BasicCard from '../../atoms/basicCard';

const DeveloperTaskTable = ({ tasks = [], onStatusChange }) => {
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
                  <Select
                    value={task.status}
                    onChange={(e) => onStatusChange(index, e.target.value)}
                    displayEmpty
                    sx={{
                      minWidth: '130px',
                      borderRadius: "20px",
                      bgcolor:
                        task.status === 'completed'
                          ? '#d0f2d8'
                          : task.status === 'processing'
                          ? '#fff4e5'
                          : '#fdecea',
                      color:
                        task.status === 'completed'
                          ? '#388e3c'
                          : task.status === 'processing'
                          ? '#f57c00'
                          : '#d32f2f',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor:
                          task.status === 'completed'
                            ? '#81c784'
                            : task.status === 'processing'
                            ? '#ffb74d'
                            : '#e57373',
                      },
                      '& .MuiSelect-select': {
                        paddingTop: '8px',
                        paddingBottom: '8px',
                        minHeight: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        fontWeight: 500,
                        textAlign: 'center',
                        textTransform: 'capitalize',
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
      </Paper>
    </BasicCard>
  );
};

export default DeveloperTaskTable;
