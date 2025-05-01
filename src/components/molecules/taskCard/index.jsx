import React from 'react';
import { Typography } from "@mui/material";
import BasicCard from '../../atoms/basicCard';
import BasicButton from '../../atoms/basicButton';
import Title from '../../atoms/title'; // Import the Title atom

const TaskCard = ({ taskName, description, status }) => {
  const getStatusLabel = () => {
    switch (status) {
      case "unread":
        return "Mark as Read";
      case "processing":
        return "Process Task";
      case "completed":
        return "Task Completed";
      default:
        return "Status Unknown";
    }
  };

  return (
    <div>
      <BasicCard sx={{ width: "100%", maxHeight: "200px", margin: 2, padding: 2 }}>
        {/* Use the Title atom for the task name */}
        <Title text={taskName} />

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>

        {/* Use the BasicButton atom for the button */}
        <BasicButton
          label={getStatusLabel()}
          color={status === "completed" ? "success" : "primary"}
          size="small"
          sx={{
            marginTop: 2,
            borderRadius: "10px",
            minWidth: "150px", // Ensure button has minimum width
          }}
        />
      </BasicCard>
    </div>
  );
};

export default TaskCard;
