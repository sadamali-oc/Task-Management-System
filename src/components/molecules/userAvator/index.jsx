import React, { useEffect, useState } from "react";
import { Avatar, Box, Typography, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import UseAuthStore from "../../../store/UseAuthStore";
import adminProfile from "../../../assets/adminProfile.jpg";
import developerImage from "../../../assets/developerImage.jpg";
import clientImage from "../../../assets/clientImage.jpg";

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  backgroundColor:"#a7a7b335",
  borderRadius:"20px",
  width:"200px"
 
  
});

const roleImages = {
  admin: adminProfile,
  developer: developerImage,
  client: clientImage,
};

const UserAvator = () => {
  const user = UseAuthStore((state) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );
  }

  const { name, email, role } = user || {};
  const image = roleImages[role] || adminProfile;

  return (
    <UserBox>
      <Avatar alt={name || "User"} src={image} />
      <Box>
        <Typography variant="body2"  sx={{ fontWeight: "bold" }}>{name}</Typography>
        <Typography variant="caption">{email}</Typography>
      </Box>
    </UserBox>
  );
};

export default UserAvator;
