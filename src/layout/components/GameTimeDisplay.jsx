import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import { getGameTime } from "../../utils/gameTime";
import { SEASON_THEME } from "../../constants/commons";

const TimeContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.3rem",
  backdropFilter: "blur(4px)",
  background: "rgba(45, 45, 64, 0.8)",
  border: "1px solid rgba(183, 179, 218, 0.2)",
  padding: "4px 8px",
  width: "fit-content",
});

const SeasonIcon = styled("img")({
  width: "1rem",
  height: "1rem",
  imageRendering: "pixelated",
});

const SeasonBadge = styled(Box)(({ season }) => {
  const current = SEASON_THEME[season] || SEASON_THEME["봄"];

  return {
    color: current.text,
    fontSize: "0.875rem",
    fontFamily: "Mona8x12",
  };
});

const DigitalTime = styled(Typography)(({ theme }) => ({
  fontFamily: "Mona8x12",
  color: "#fff",
  fontSize: "0.875rem",
  letterSpacing: "0.5px",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const GameTimeDisplay = () => {
  const [time, setTime] = useState(getGameTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getGameTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <TimeContainer>
      <SeasonIcon src={SEASON_THEME[time.season].image} />
      <SeasonBadge season={time.season}>{time.season}</SeasonBadge>
      <DigitalTime>
        {time.day}일{" "}
        <span style={{ color: "#999", fontFamily: "Mona8x12" }}>
          {String(time.hour).padStart(2, "0")}:
          {String(time.minute).padStart(2, "0")}
        </span>
      </DigitalTime>
    </TimeContainer>
  );
};

export default GameTimeDisplay;
