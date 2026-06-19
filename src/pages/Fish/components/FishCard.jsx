import React from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const GRADE_COLORS = {
  일반: { bg: "rgb(86, 86, 86)", text: "#eee" },
  희귀: { bg: "rgb(0, 128, 207)", text: "#eee" },
  고급: { bg: "rgb(210, 182, 1)", text: "#ffffff" },
  특급: { bg: "rgb(37, 184, 127)", text: "#eee" },
  전설: { bg: "rgb(197, 52, 23)", text: "#eee" },
};

const Card = styled(Box)(({ selected }) => ({
  background: "#18171c",
  border: selected ? "2px solid #b7b3da" : "2px solid #3d3a52",
  overflow: "hidden",
  imageRendering: "pixelated",
  cursor: "var(--cursor-pointer)",
  "&:hover": {
    borderColor: "#b7b3da",
  },
}));

const ImageBox = styled(Box)({
  width: "100%",
  height: "90px",
  backgroundColor: "#0f0e13",
  borderBottom: "2px solid #3d3a52",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& img": {
    width: "4rem",
    height: "4rem",
    objectFit: "contain",
    imageRendering: "pixelated",
  },
});

const CardBody = styled(Box)({
  padding: "8px 10px",
});

const CardName = styled(Box)({
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  gap: "0.5rem",
  fontSize: "0.75rem",
  fontWeight: "bold",
  color: "#e8e4ff",
  fontFamily: "Mona10x12",
  marginBottom: "4px",
});

const CardBottom = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const CardPrice = styled(Box)({
  fontSize: "0.6875rem",
  color: "#8881be",
  fontFamily: "Mona8x12",
});

const GradeBadge = styled("span")(({ grade }) => {
  const c = GRADE_COLORS[grade] ?? GRADE_COLORS["일반"];
  return {
    fontSize: "0.5rem",
    padding: "1px 4px",
    background: c.bg,
    color: c.text,
    fontFamily: "Mona8x12",
    whiteSpace: "nowrap",
  };
});

const FishCard = ({ name, image, grade, price, selected, onClick }) => {
  return (
    <Card selected={selected} onClick={onClick}>
      <ImageBox>{image && <img src={image} alt={name} />}</ImageBox>
      <CardBody>
        <CardName>
          <GradeBadge grade={grade}>{grade}</GradeBadge> {name}
        </CardName>
        <CardBottom>
          {price != null && <CardPrice>{price.toLocaleString()}G</CardPrice>}
        </CardBottom>
      </CardBody>
    </Card>
  );
};

export default FishCard;
