import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import {
  getMaxGrowthDay,
  getNetProfit,
  getTotalCost,
} from "../../../utils/recipeUtils";
import { SEASON_THEME } from "../../../constants/commons";
import IngredientTree from "../../../commons/components/IngredientTree";
import { collectSeasonalNames } from "../../../utils/sortUtils";
import { formatCraftTime } from "../../../utils/formatTime";

const Panel = styled(Box)(({ theme }) => ({
  background: "#18171c",
  border: "2px solid #3d3a52",
  padding: "1.25rem",
  position: "sticky",
  top: "1rem",

  [theme.breakpoints.down("md")]: {
    position: "static",
  },
}));

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
  padding: "3px 0",
  borderBottom: "1px solid #28263a",
  "&:last-child": { borderBottom: "none" },
});

const IngLeft = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "4px",
});

const IngIcon = styled("img")({
  width: "1.75rem",
  height: "1.75rem",
  imageRendering: "pixelated",
});

const IngName = styled("span")({
  fontSize: "0.75rem",
  color: "#8a86aa",
  fontFamily: "Mona8x12",
});

const IngRight = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "6px",
});

const IngCount = styled("span")({
  fontSize: "0.75rem",
  color: "#c4bdff",
  fontFamily: "Mona8x12",
});

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
  };
});

const EmptyPanel = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "200px",
  color: "#3d3a52",
  fontSize: "0.8125rem",
  fontFamily: "Mona10x12",
  border: "2px solid #3d3a52",
});

const getProfitColor = (value) => {
  if (value > 0) return "#6befc3";
  if (value < 0) return "#f4365f";
  return "#c4bdff";
};

const RecipeDetail = ({ recipe }) => {
  if (!recipe) return <EmptyPanel>레시피를 선택하세요</EmptyPanel>;

  const maxDay = getMaxGrowthDay(recipe.ingredients);
  const seasonalIngs = collectSeasonalNames(recipe.ingredients);
  const totalCost = getTotalCost(recipe.ingredients);
  const netProfit = getNetProfit(recipe);

  return (
    <Panel>
      {recipe.image && <RecipeImage src={recipe.image} alt={recipe.name} />}
      <RecipeName>{recipe.name}</RecipeName>

      {/* 요약 정보 */}
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
          <StatValue
            style={{
              color: getProfitColor(netProfit),
            }}
          >
            {netProfit.toLocaleString()}G
          </StatValue>
        </StatRow>
        {recipe.craftTime && (
          <StatRow>
            <span>제작 시간</span>
            <StatValue>{formatCraftTime(recipe.craftTime)}</StatValue>
          </StatRow>
        )}
        {maxDay > 0 && (
          <StatRow>
            <span>최대 성장 기간</span>
            <StatValue>{maxDay}일</StatValue>
          </StatRow>
        )}
        {seasonalIngs.size > 0 && (
          <StatRow>
            <span>계절 재료</span>
            <StatValue>{seasonalIngs.size}종</StatValue>
          </StatRow>
        )}
      </Box>

      {/* 재료 목록 */}
      <SectionLabel>재료</SectionLabel>
      <Box>
        <IngredientTree ingredients={recipe.ingredients} />
      </Box>
    </Panel>
  );
};

export default RecipeDetail;
