import React, { useState } from "react";
import { Box } from "@mui/material";
import styled from "@emotion/styled";
import { processedRecipes } from "../../constants/food/processed";
import { jewelryRecipes } from "../../constants/town/jewelryRecipes";
import { woodRecipes } from "../../constants/town/woodRecipes";
import { getSeasonalInfo, SEASON_LABEL } from "../../utils/recipeUtils";
import { SEASON_THEME } from "../../constants/commons";

const allProcessed = [...processedRecipes, ...jewelryRecipes, ...woodRecipes];

const findSubRecipe = (name) =>
  allProcessed.find(
    (r) => r.name.replace(/\s/g, "") === name.replace(/\s/g, ""),
  );

const Row = styled(Box)(({ depth }) => ({
  display: "flex",
  flexDirection: "column",
  paddingLeft: depth > 0 ? "10px" : "0",
  borderLeft: depth > 0 ? "1px solid #28263a" : "none",
  marginLeft: depth > 0 ? "4px" : "0",
}));

const IngItem = styled(Box)(({ expandable }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "0.75rem",
  color: "#8a86aa",
  fontFamily: "Mona8x12",
  padding: "5px 0",
  cursor: expandable ? "var(--cursor-pointer)" : "default",
  "&:hover": expandable ? { color: "#c4bdff" } : {},
}));

const IngLeft = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "4px",
});

const IngIcon = styled("img")({
  width: "1.5rem",
  height: "1.5rem",
  imageRendering: "pixelated",
});

const ExpandIcon = styled("span")(({ open }) => ({
  fontSize: "0.5rem",
  color: "#5a5670",
  marginLeft: "3px",
  display: "inline-block",
  transition: "transform 0.15s",
  transform: open ? "rotate(90deg)" : "rotate(0deg)",
}));

const SeasonBadge = styled("span")(({ season }) => {
  const c = SEASON_THEME[season] ?? {
    bg: "rgba(255,255,255,0.1)",
    text: "#fff",
  };
  return {
    fontSize: "0.625rem",
    padding: "1px 5px",
    background: c.bg,
    color: c.text,
    fontFamily: "Mona8x12",
    whiteSpace: "nowrap",
  };
});

const IngredientNode = ({ ing, depth = 0 }) => {
  const [open, setOpen] = useState(false);
  const subRecipe = findSubRecipe(ing.name);
  const expandable = !!subRecipe;
  const seasonal = getSeasonalInfo(ing.name);

  return (
    <Row depth={depth}>
      <IngItem
        expandable={expandable}
        onClick={() => expandable && setOpen((p) => !p)}
      >
        <IngLeft>
          {ing.image && <IngIcon src={ing.image} alt={ing.name} />}
          <span style={{ color: expandable && open ? "#c4bdff" : undefined }}>
            {ing.name}
          </span>
          {seasonal && (
            <SeasonBadge season={seasonal.season}>
              {SEASON_LABEL[seasonal.season]}
            </SeasonBadge>
          )}
          {expandable && <ExpandIcon open={open}>▶</ExpandIcon>}
        </IngLeft>
        <span style={{ color: "#c4bdff", fontFamily: "Mona8x12" }}>
          x {ing.count}
        </span>
      </IngItem>

      {open && subRecipe && (
        <Box sx={{ mt: "2px", mb: "4px" }}>
          {subRecipe.ingredients.map((subIng, i) => (
            <IngredientNode key={i} ing={subIng} depth={depth + 1} />
          ))}
        </Box>
      )}
    </Row>
  );
};

const IngredientTree = ({ ingredients }) => (
  <Box>
    {ingredients.map((ing, i) => (
      <IngredientNode key={i} ing={ing} depth={0} />
    ))}
  </Box>
);

export default IngredientTree;
