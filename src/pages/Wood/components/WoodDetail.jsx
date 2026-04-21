import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import {
  getWoodCost,
  getWoodProfit,
  getRequiredTownsByTree,
} from "../../../utils/woodUtils";
import { SEASON_THEME } from "../../../constants/commons";

const Panel = styled(Box)({
  background: "#18171c",
  border: "2px solid #3d3a52",
  padding: "1.25rem",
  position: "sticky",
  top: "1rem",
  "@media (max-width: 768px)": { position: "static" },
});

const RecipeImage = styled("img")({
  width: "80px",
  height: "80px",
  objectFit: "contain",
  imageRendering: "pixelated",
  marginBottom: "0.75rem",
});

const RecipeName = styled(Typography)({
  fontSize: "1.1rem",
  fontWeight: "bold",
  color: "#e8e4ff",
  fontFamily: "Mona10x12",
  marginBottom: "1rem",
  borderBottom: "1px solid #3d3a52",
  paddingBottom: "0.5rem",
});

const SectionLabel = styled(Typography)({
  fontSize: "0.6875rem",
  color: "#5a5670",
  fontFamily: "Mona8x12",
  marginBottom: "0.375rem",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
});

const StatRow = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "0.8125rem",
  color: "#8a86aa",
  fontFamily: "Mona8x12",
  padding: "4px 0",
  borderBottom: "1px solid #28263a",
  "&:last-child": { borderBottom: "none" },
});

const StatValue = styled("span")({
  color: "#c4bdff",
  fontWeight: "bold",
});

const IngRow = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "5px 0",
  borderBottom: "1px solid #28263a",
  "&:last-child": { borderBottom: "none" },
});

const IngLeft = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "6px",
});

const IngIcon = styled("img")({
  width: "16px",
  height: "16px",
  imageRendering: "pixelated",
});

const IngName = styled("span")({
  fontSize: "0.75rem",
  color: "#8a86aa",
  fontFamily: "Mona8x12",
});

const IngCount = styled("span")({
  fontSize: "0.75rem",
  color: "#c4bdff",
  fontFamily: "Mona8x12",
});

const EmptyPanel = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "200px",
  color: "#3d3a52",
  fontSize: "0.8125rem",
  fontFamily: "Mona8x12",
  border: "2px solid #3d3a52",
});

const SeasonBadge = styled("span")(({ season }) => {
  const c = SEASON_THEME[season] ?? {
    bg: "rgba(255,255,255,0.1)",
    text: "#fff",
  };
  return {
    fontSize: "0.625rem",
    padding: "1px 6px",
    background: c.bg,
    color: c.text,
    fontFamily: "Mona8x12",
    marginLeft: "4px",
  };
});

const TownRow = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "5px 0",
  borderBottom: "1px solid #28263a",
  "&:last-child": { borderBottom: "none" },
});

const TownName = styled("span")({
  fontSize: "0.8125rem",
  color: "#8a86aa",
  fontFamily: "Mona10x12",
});

const WoodDetail = ({ recipe }) => {
  if (!recipe) return <EmptyPanel>레시피를 선택하세요</EmptyPanel>;

  const totalCost = getWoodCost(recipe.ingredients);
  const netProfit = getWoodProfit(recipe);
  const requiredTowns = getRequiredTownsByTree(recipe.ingredients);

  return (
    <Panel>
      {recipe.image && <RecipeImage src={recipe.image} alt={recipe.name} />}
      <RecipeName>{recipe.name}</RecipeName>

      <SectionLabel>정보</SectionLabel>
      <Box sx={{ mb: "1rem" }}>
        <StatRow>
          <span>판매가</span>
          <StatValue style={{ color: "#eee" }}>
            {recipe.price?.toLocaleString()}G
          </StatValue>
        </StatRow>
        <StatRow>
          <span>재료 비용</span>
          <StatValue style={{ fontWeight: "normal" }}>
            {totalCost.toLocaleString()}G
          </StatValue>
        </StatRow>
        <StatRow>
          <span>순수익</span>
          <StatValue style={{ color: netProfit >= 0 ? "#6befc3" : "#f4365f" }}>
            {netProfit >= 0 ? "+" : ""}
            {netProfit.toLocaleString()}G
          </StatValue>
        </StatRow>
      </Box>

      <SectionLabel>재료</SectionLabel>
      <Box sx={{ mb: "1rem" }}>
        {recipe.ingredients.map((ing, i) => (
          <IngRow key={i}>
            <IngLeft>
              {ing.image && <IngIcon src={ing.image} alt={ing.name} />}
              <IngName>{ing.name}</IngName>
            </IngLeft>
            <IngCount>x {ing.count}</IngCount>
          </IngRow>
        ))}
      </Box>

      {requiredTowns.length > 0 && (
        <>
          <SectionLabel>채집 마을</SectionLabel>
          <Box>
            {requiredTowns.map((t, i) => (
              <TownRow key={i}>
                <TownName>{t.name}</TownName>
                <Box>
                  {t.seasons.map((s) => (
                    <SeasonBadge key={s} season={s}>
                      {s}
                    </SeasonBadge>
                  ))}
                </Box>
              </TownRow>
            ))}
          </Box>
        </>
      )}
    </Panel>
  );
};

export default WoodDetail;
