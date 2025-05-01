import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import profileImage from "../../../assets/profileImage.jpg";

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "20px",
});

const UserAvator = ({
  name = "Chamalka Obadage",
  email = "chamalka@gmail.com",
  image = profileImage,
}) => {
  return (
    <div>
      <UserBox>
        <Avatar alt={name} src={image} />
        <Box>
          <Typography variant="body2">{name}</Typography>
          <Typography variant="caption" color="text.secondary">
            {email}
          </Typography>
        </Box>
      </UserBox>
    </div>
  );
};

export default UserAvator;
