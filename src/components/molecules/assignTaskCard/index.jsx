import React from 'react';
import { Typography } from "@mui/material";
import BasicCard from '../../atoms/basicCard';
import BasicButton from '../../atoms/basicButton';
import Title from '../../atoms/title'; 

const AssignTaskCard = ({ taskName, description, status }) => {
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
        <Title text={taskName} />

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>

        <BasicButton
          label={getStatusLabel()}
          color={status === "completed" ? "success" : "primary"}
          size="small"
          sx={{
            marginTop: 2,
            borderRadius: "10px",
            minWidth: "150px", 
          }}
        />
      </BasicCard>
    </div>
  );
};

export default AssignTaskCard;
