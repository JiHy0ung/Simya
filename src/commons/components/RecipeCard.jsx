import React from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

const Card = styled(Box)(({ selected }) => ({
  background: "#18171c",
  border: selected ? "2px solid #b7b3da" : "2px solid #3d3a52",
  borderRadius: "0px",
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
  fontSize: "0.75rem",
  fontWeight: "bold",
  color: "#e8e4ff",
  marginBottom: "6px",
  fontFamily: "Mona10x12",
  borderBottom: "1px solid #3d3a52",
  paddingBottom: "5px",
});

const IngredientRow = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "0.6875rem",
  color: "#8a86aa",
  padding: "1px 0",
  fontFamily: "Mona10x12",
});

const IngredientLeft = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "3px",
  fontFamily: "Mona10x12",
});

const IngredientIcon = styled("img")({
  width: "1.25rem",
  height: "1.25rem",
  objectFit: "contain",
  imageRendering: "pixelated",
});

const Amount = styled("span")({
  display: "flex",
  alignItems: "center",
  gap: "2px",
  fontFamily: "Mona8x12",
  fontSize: "0.75rem",
  lineHeight: 1, // 🔥 핵심

  color: "#b7b3da",
});

const RecipeCard = ({ name, image, ingredients = [], selected, onClick }) => {
  return (
    <Card selected={selected} onClick={onClick}>
      <ImageBox>{image && <img src={image} alt={name} />}</ImageBox>
      <CardBody>
        <CardName>{name}</CardName>
        {ingredients.map((ing, i) => (
          <IngredientRow key={i}>
            <IngredientLeft>
              {ing.image && <IngredientIcon src={ing.image} alt={ing.name} />}
              <span>{ing.name}</span>
            </IngredientLeft>
            <Amount>
              <span style={{ fontSize: "0.75rem" }}>x</span> {ing.count}
            </Amount>
          </IngredientRow>
        ))}
      </CardBody>
    </Card>
  );
};

export default RecipeCard;
