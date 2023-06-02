import React from "react";
import { AppBar } from "@mui/material";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";

const NavBar = () => {
  return (
    <>
      <AppBar
        sx={{
          alignItems: "center",
          fontSize: "30px",
          padding: "10px",
          cursor: "context-menu",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <DashboardRoundedIcon sx={{ margin: "10px", marginTop: "15px" }} />
        Dashboard
      </AppBar>
    </>
  );
};

export default NavBar;
