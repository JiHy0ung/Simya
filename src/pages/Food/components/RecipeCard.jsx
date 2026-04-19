import React from "react";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

const Card = styled(Box)({
  background: "#18171c",
  border: "2px solid #3d3a52",
  borderRadius: "0px",
  overflow: "hidden",
  imageRendering: "pixelated",
  cursor: "var(--cursor-pointer)",
  "&:hover": {
    borderColor: "#b7b3da",
  },
});

const ImageBox = styled(Box)({
  width: "100%",
  height: "90px",
  backgroundColor: "#0f0e13",
  borderBottom: "2px solid #3d3a52",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& img": {
    width: "64px",
    height: "64px",
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
  padding: "2px 0",
  fontFamily: "Mona10x12",
});

const IngredientLeft = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "4px",
  fontFamily: "Mona10x12",
});

const IngredientIcon = styled("img")({
  width: "12px",
  height: "12px",
  objectFit: "contain",
  imageRendering: "pixelated",
});

const Amount = styled("span")({
  color: "#b7b3da",
});

const RecipeCard = ({ name, image, ingredients = [] }) => {
  return (
    <Card>
      <ImageBox>{image && <img src={image} alt={name} />}</ImageBox>
      <CardBody>
        <CardName>{name}</CardName>
        {ingredients.map((ing, i) => (
          <IngredientRow key={i}>
            <IngredientLeft>
              {ing.image && <IngredientIcon src={ing.image} alt={ing.name} />}
              <span>{ing.name}</span>
            </IngredientLeft>
            <Amount>× {ing.count}</Amount>
          </IngredientRow>
        ))}
      </CardBody>
    </Card>
  );
};

export default RecipeCard;
