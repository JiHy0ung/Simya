import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router";
import Header from "./components/Header";
import FloatingTips from "./components/FloatingTips";
import Footer from "./components/Footer";

const AppLayout = () => {
  return (
    <Box>
      <Header />
      <Outlet />
      <FloatingTips />
      <Footer />
    </Box>
  );
};

export default AppLayout;
