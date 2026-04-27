import React, { useEffect, useState } from "react";
import { Fab } from "@mui/material";
import { styled } from "@mui/material/styles";

const ScrollTopButton = styled(Fab)({
  position: "fixed",
  bottom: "2rem",
  right: "2rem",
  backgroundColor: "#18171c",
  color: "#c4c0d8",
  boxShadow: "0 0 0 1px #3d3a52",
  fontSize: "1.5rem",
  paddingLeft: "0.15rem",
  paddingTop: "0.1rem",
  cursor: "var(--cursor-pointer)",

  "&:hover": {
    backgroundColor: "#18171c",
    color: "#ffffff",
  },
});

const FloatingButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <ScrollTopButton size="medium" onClick={handleClick}>
      ▴
    </ScrollTopButton>
  );
};

export default FloatingButton;
