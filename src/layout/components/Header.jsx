import styled from "@emotion/styled";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import Logo from "../../assets/simya_favicon.png";
import { useNavigate } from "react-router";

const HeaderContainer = styled(Box)({
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  gap: "5rem",
  padding: "0.75rem 1.625rem",
  backgroundColor: "#18171c",
  borderBottom: "0.5px solid #b7b3da",
});

const HeaderLogoBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.5rem",
  cursor: "var(--cursor-pointer)",
});

const HeaderTitle = styled(Typography)({
  fontSize: "1.5rem",
  fontWeight: "bold",
  fontFamily: "Mona8x12",
});

const HeaderMenuBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.5rem",
});

const HeaderMenuButton = styled(Button)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.25rem",
  color: "white",
  fontSize: "0.875rem",
  cursor: "var(--cursor-pointer)",
  "&:hover": {
    transform: "scale(0.98)",
    backgroundColor: "transparent",
    color: "#bfb8ff",
  },
});

const Header = () => {
  const navigate = useNavigate();
  return (
    <HeaderContainer>
      <HeaderLogoBox onClick={() => navigate("/")}>
        <Box
          component="img"
          src={Logo}
          sx={{
            height: "1.25rem",
          }}
        />
        <HeaderTitle>시먀</HeaderTitle>
      </HeaderLogoBox>

      <HeaderMenuBox>
        <HeaderMenuButton disableRipple onClick={() => navigate("/like")}>
          <span style={{ fontFamily: "Mona12" }}>❤️ </span>호감도
        </HeaderMenuButton>
        <HeaderMenuButton disableRipple onClick={() => navigate("/food")}>
          <span style={{ fontFamily: "Mona12" }}>🍖 </span> 레스토랑 & 카페
        </HeaderMenuButton>
        <HeaderMenuButton disableRipple onClick={() => navigate("/jewel")}>
          <span style={{ fontFamily: "Mona12" }}>💎 </span> 보석
        </HeaderMenuButton>
        <HeaderMenuButton disableRipple onClick={() => navigate("/wood")}>
          <span style={{ fontFamily: "Mona12" }}>🪵 </span>목재
        </HeaderMenuButton>
      </HeaderMenuBox>
    </HeaderContainer>
  );
};

export default Header;
