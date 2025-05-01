import React from "react";
import { useNavigate } from "react-router-dom";
import IconLabelButton from "../../atoms/iconLabelButton";

const NavigationItem = ({ icon, label, path, onClick, sx }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) onClick(); 
    if (path && path !== "#") navigate(path);
  };

  return (
    <IconLabelButton icon={icon} label={label} onClick={handleClick} sx={sx} />
  );
};

export default NavigationItem;
