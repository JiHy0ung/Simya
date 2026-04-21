import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Logo from "../../assets/simya_favicon.png";
import { useNavigate } from "react-router";
import GameTimeDisplay from "./GameTimeDisplay";
import { Menu, X } from "lucide-react";

const HeaderContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "2rem",
  padding: "0.75rem 1.625rem",
  backgroundColor: "#18171c",
  borderBottom: "0.5px solid #b7b3da",
  position: "sticky",
  top: 0,
  zIndex: 1000,
});

const HeaderLogoBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.75rem",
  cursor: "var(--cursor-pointer)",
});

const HeaderTitle = styled(Typography)({
  fontSize: "1.5rem",
  fontWeight: "bold",
  fontFamily: "Mona8x12",
  color: "#fff",
});

const HeaderMenuBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.5rem",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const HeaderMenuButton = styled(Button)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.25rem",
  color: "white",
  fontSize: "0.875rem",
  whiteSpace: "nowrap",
  "&:hover": {
    transform: "scale(0.98)",
    backgroundColor: "transparent",
    color: "#bfb8ff",
  },
});

const HamburgerButton = styled(IconButton)(({ theme }) => ({
  justifyContent: "center",
  alignItems: "center",
  padding: "0 1rem",
  display: "none",
  color: "white",
  [theme.breakpoints.down("md")]: {
    display: "block",
  },
}));

const MobileHeaderLogoBox = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "2rem",
  cursor: "var(--cursor-pointer)",
  padding: "0 0.5rem",
});

const MobileHeaderTitle = styled(Typography)({
  fontSize: "2rem",
  fontWeight: "bold",
  fontFamily: "Mona8x12",
  color: "#fff",
});

const MENU_ITEMS = [
  { label: "호감도", path: "/like", emoji: "❤️" },
  { label: "레스토랑 & 카페", path: "/food", emoji: "🍖" },
  { label: "보석", path: "/jewel", emoji: "💎" },
  { label: "목재", path: "/wood", emoji: "🪵" },
];

const Header = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setMobileOpen(open);
  };

  const handleMenuClick = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  return (
    <HeaderContainer>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: "1rem", md: "5rem" },
        }}
      >
        <HeaderLogoBox onClick={() => navigate("/")}>
          <Box component="img" src={Logo} sx={{ height: "1.25rem" }} />
          <HeaderTitle>시먀</HeaderTitle>
        </HeaderLogoBox>

        {/* 데스크탑 메뉴 */}
        <HeaderMenuBox>
          {MENU_ITEMS.map((item) => (
            <HeaderMenuButton
              key={item.path}
              disableRipple
              onClick={() => navigate(item.path)}
            >
              <span style={{ fontFamily: "Mona12" }}>{item.emoji} </span>
              {item.label}
            </HeaderMenuButton>
          ))}
        </HeaderMenuBox>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Box sx={{ transform: { xs: "scale(0.85)", md: "scale(1)" } }}>
          <GameTimeDisplay />
        </Box>

        <HamburgerButton onClick={toggleDrawer(true)}>
          <Menu size={20} />
        </HamburgerButton>
      </Box>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            backgroundColor: "#18171c",
            borderLeft: "1px solid #b7b3da",
          },
        }}
      >
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            gap: "1rem",
            padding: "2rem 1rem",
            backgroundColor: "#18171c",
            width: "300px",
            height: "100vh",
          }}
        >
          <MobileHeaderLogoBox onClick={() => navigate("/")}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <Box component="img" src={Logo} sx={{ height: "2rem" }} />
              <MobileHeaderTitle>시먀</MobileHeaderTitle>
            </Box>
            <Button
              onClick={toggleDrawer(false)}
              disableRipple
              sx={{
                minWidth: "unset",
                padding: 0,
                width: "fit-content",
                height: "fit-content",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <X color="white" size={20} />
            </Button>
          </MobileHeaderLogoBox>
          {MENU_ITEMS.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton onClick={() => handleMenuClick(item.path)}>
                <Typography sx={{ color: "white", fontSize: "0.875rem" }}>
                  <span style={{ marginRight: "10px", fontFamily: "Mona12" }}>
                    {item.emoji}
                  </span>
                  {item.label}
                </Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </HeaderContainer>
  );
};

export default Header;
