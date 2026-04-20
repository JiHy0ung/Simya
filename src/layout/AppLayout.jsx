import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router";
import Header from "./components/Header";
import { Analytics } from "@vercel/analytics/react";

const AppLayout = () => {
  return (
    <Box>
      <Header />
      <Outlet />
      <Analytics />
    </Box>
  );
};

export default AppLayout;
