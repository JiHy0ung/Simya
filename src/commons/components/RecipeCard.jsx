import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import { getSeasonalInfo } from "../../utils/recipeUtils";
import { SEASON_THEME } from "../../constants/commons";

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

const CardInfo = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignContent: "center",
  borderBottom: "1px solid #3d3a52",
  paddingBottom: "6px",
  marginBottom: "6px",
});

const CardName = styled(Box)({
  fontSize: "0.75rem",
  fontWeight: "bold",
  color: "#e8e4ff",
  fontFamily: "Mona10x12",
});

const CardPrice = styled(Box)({
  fontSize: "0.6875rem",
  color: "#8881be",
  fontFamily: "Mona8x12",
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
  justifyContent: "center",
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
  lineHeight: 1,

  color: "#b7b3da",
});

const SeasonBadge = styled("span")(({ season }) => {
  const c = SEASON_THEME[season] ?? {
    bg: "rgba(255,255,255,0.1)",
    text: "#fff",
  };
  return {
    fontSize: "0.5rem",
    padding: "1px 4px",
    background: c.bg,
    color: c.text,
    fontFamily: "Mona8x12",
    whiteSpace: "nowrap",
    marginBottom: "0.1rem",
  };
});

const RecipeCard = ({
  name,
  image,
  ingredients = [],
  price,
  selected,
  onClick,
}) => {
  return (
    <Card selected={selected} onClick={onClick}>
      <ImageBox>{image && <img src={image} alt={name} />}</ImageBox>
      <CardBody>
        <CardInfo>
          <CardName>{name}</CardName>
          {price && <CardPrice>{price.toLocaleString()}G</CardPrice>}
        </CardInfo>
        {ingredients.map((ing, i) => {
          const ingSeasonalInfo = getSeasonalInfo(ing.name);
          return (
            <IngredientRow key={i}>
              <IngredientLeft>
                {ing.image && <IngredientIcon src={ing.image} alt={ing.name} />}
                {ingSeasonalInfo && (
                  <SeasonBadge season={ingSeasonalInfo.season}>
                    {ingSeasonalInfo.season}
                  </SeasonBadge>
                )}
                <span>{ing.name}</span>
                {ingSeasonalInfo && (
                  <span style={{ fontSize: "0.6275rem", color: "#514e5f" }}>
                    ({ingSeasonalInfo.day}일)
                  </span>
                )}
              </IngredientLeft>
              <Amount>
                <span style={{ fontSize: "0.75rem" }}>x</span> {ing.count}
              </Amount>
            </IngredientRow>
          );
        })}
      </CardBody>
    </Card>
  );
};

export default RecipeCard;
