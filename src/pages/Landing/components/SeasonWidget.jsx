import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Box, Button, Typography } from "@mui/material";
import { seasonal } from "../../../constants/food/seasonal";
import { town } from "../../../constants/town/town";
import { SEASON_THEME } from "../../../constants/commons";
import { getGameTime } from "../../../utils/gameTime";
import { useNavigate } from "react-router";
import { getItemImage } from "../../../utils/getItemImage";

const Widget = styled(Box)(({ season }) => {
  const theme = SEASON_THEME[season] ?? {};
  return {
    background: theme.bg.replace("0.15)", "0.02)"),
    border: `1.5px solid ${
      theme.bg
        ? theme.text.replace(")", ", 0.2)").replace("rgb", "rgba")
        : "#3d3a52"
    }`,
    padding: "1.25rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    width: "100%",
  };
});

const SeasonHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  paddingBottom: "0.75rem",
  borderBottom: "1px solid #3d3a52",
});

const SeasonBadge = styled(Box)(({ season }) => {
  const c = SEASON_THEME[season] ?? {
    bg: "rgba(255,255,255,0.1)",
    text: "#fff",
  };
  return {
    fontSize: "1rem",
    padding: "2px 8px 2px 11px",
    background: c.bg,
    color: c.text,
    fontFamily: "Mona8x12",
  };
});

const SectionLabel = styled(Typography)({
  fontSize: "0.75rem",
  color: "#5a5670",
  fontFamily: "Mona10x12",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  marginBottom: "0.5rem",
});

const CropGrid = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  gap: "6px",
});

const CropBadge = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "4px",
  background: "rgba(255,255,255,0.04)",
  border: "0.5px solid #3d3a52",
  padding: "4px 8px",
  fontSize: "0.75rem",
  color: "#8a86aa",
  fontFamily: "Mona8x12",
});

const CropIcon = styled("img")({
  width: "1.25rem",
  height: "1.25rem",
  imageRendering: "pixelated",
});

const TownWrapper = styled(Box)({
  borderBottom: "0.5px solid #28263a",
  marginBottom: "0.3rem",

  "&:hover": {
    cursor: "var(--cursor-pointer)",
  },

  "&:last-child": {
    borderBottom: "none",
  },
});

const TownRow = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "0.75rem",
  color: "#8a86aa",
  fontFamily: "Mona8x12",
  padding: "4px 0",
  borderBottom: "0.5px solid #28263a",
  marginBottom: "0.3rem",

  "&:hover": {
    cursor: "var(--cursor-pointer)",
  },

  "&:last-child": { borderBottom: "none" },
});

const TownName = styled("span")({
  color: "#c4bdff",
});

const SeasonBox = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "start",
  gap: "2rem",

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

const MoveButton = styled(Button)({
  display: "flex",
  gap: "0.3rem",
  marginLeft: "auto",
  color: "#c4c0d8",
  fontFamily: "Mona12",
  fontSize: "0.625rem",
  padding: "0 1rem",
  minWidth: "auto",

  "&:hover": {
    cursor: "var(--cursor-pointer)",
    backgroundColor: "transparent",
    color: "#ffffff",
  },
});

const SeasonWidget = () => {
  const navigate = useNavigate();
  const [gameTime, setGameTime] = useState(getGameTime());
  const [openTown, setOpenTown] = useState({});

  useEffect(() => {
    const interval = setInterval(() => setGameTime(getGameTime()), 5000);
    return () => clearInterval(interval);
  }, []);

  const handleToggle = (name) => {
    setOpenTown((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const { season } = gameTime;
  const crops = seasonal[season] ?? [];
  const availableTowns = town.filter((t) => t.seasons.includes(season));

  return (
    <Widget season={season}>
      <SeasonHeader>
        <SeasonBadge season={season}>{season}</SeasonBadge>
        <Typography
          sx={{
            fontSize: ".875rem",
            color: "#c4c0d8",
            fontFamily: "Mona8x12",
          }}
        >
          에 획득 가능한 아이템
        </Typography>
        <MoveButton disableRipple onClick={() => navigate("/season")}>
          더보기 <span style={{ fontSize: "0.875rem" }}> ›</span>
        </MoveButton>
      </SeasonHeader>

      <SeasonBox>
        {/* 작물 */}
        <Box sx={{ flex: 1, width: "100%" }}>
          <SectionLabel>작물</SectionLabel>
          <CropGrid>
            {crops.map((crop) => (
              <CropBadge key={crop.name}>
                {crop.image && <CropIcon src={crop.image} alt={crop.name} />}
                <span>{crop.name}</span>
                <span
                  style={{
                    color: "#5a5670",
                    fontSize: "0.75rem",
                  }}
                >
                  {crop.day}일
                </span>
              </CropBadge>
            ))}
          </CropGrid>
        </Box>

        {/* 마을 */}
        <Box sx={{ flex: 1, width: "100%" }}>
          <SectionLabel>방문 가능한 마을</SectionLabel>

          {availableTowns.length === 0 ? (
            <Typography
              sx={{
                fontSize: "0.75rem",
                color: "#3d3a52",
                fontFamily: "Mona8x12",
              }}
            >
              방문 가능한 마을이 없어요
            </Typography>
          ) : (
            availableTowns.map((t) => (
              <TownWrapper key={t.name}>
                <TownRow onClick={() => handleToggle(t.name)}>
                  <TownName>
                    {t.name}{" "}
                    <span
                      style={{
                        marginLeft: "4px",
                        fontFamily: "Mona8x12",
                        color: "#5a5670",
                      }}
                    >
                      {openTown[t.name] ? "▼" : "▶"}
                    </span>
                  </TownName>
                </TownRow>

                {/* 드롭다운 */}
                {openTown[t.name] && (
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "6px",
                      padding: "6px 0 10px 0",
                    }}
                  >
                    {[
                      ...(t.resources.minerals || []),
                      ...(t.resources.trees || []),
                      ...(t.resources.flowers || []),
                    ].map((item) => (
                      <CropBadge key={item}>
                        <CropIcon src={getItemImage(item)} alt={item.name} />
                        <span>{item}</span>
                      </CropBadge>
                    ))}
                  </Box>
                )}
              </TownWrapper>
            ))
          )}
        </Box>
      </SeasonBox>
    </Widget>
  );
};

export default SeasonWidget;
