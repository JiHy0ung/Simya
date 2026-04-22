import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router";
import Header from "./components/Header";
import FloatingTips from "./components/FloatingTips";

const AppLayout = () => {
  return (
    <Box>
      <Header />
      <Outlet />
      <FloatingTips />
    </Box>
  );
};

export default AppLayout;
