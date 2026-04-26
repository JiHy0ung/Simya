import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Box, Container, Typography } from "@mui/material";
import { shopSlots } from "../../constants/shopSlots";
import { processedRecipes } from "../../constants/food/processed";
import { restaurantRecipes } from "../../constants/food/restaurant";
import { cafeRecipes } from "../../constants/food/cafe";
import { jamRecipes } from "../../constants/food/jam";
import { wineRecipes } from "../../constants/food/wine";
import { jewelryRecipes } from "../../constants/town/jewelryRecipes";
import { seasonal } from "../../constants/food/seasonal";
import { vanilla } from "../../constants/food/vanilla";
import { etc } from "../../constants/food/etc";
import { getTotalCost } from "../../utils/recipeUtils";
import { getJewelryIngredientPrice } from "../../utils/jewelryUtils";
import IngredientTree from "../../commons/components/IngredientTree";

const STORAGE_KEY = "shop_selections";

const ShopContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "3rem",
  gap: "2rem",
});

const ShopTitle = styled(Typography)(({ theme }) => ({
  fontSize: "3.5rem",
  fontWeight: "900",
  marginBottom: "1rem",
  [theme.breakpoints.down("md")]: {
    fontSize: "3rem",
  },
}));

const ShopSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.1rem",
  color: "#666",
  marginBottom: "0.5rem",
  textAlign: "center",
  [theme.breakpoints.down("md")]: {
    fontSize: "0.875rem",
  },
}));

const ShopDescription = styled(Typography)(({ theme }) => ({
  fontSize: "0.95rem",
  color: "#888",
  textAlign: "center",
  maxWidth: "600px",
  marginBottom: "4rem",
  [theme.breakpoints.down("md")]: {
    fontSize: "0.75rem",
  },
}));
const SlotGrid = styled(Box)({
  width: "100%",
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "1rem",
});

const SlotPanel = styled(Box)(({ active }) => ({
  background: "#18171c",
  border: active ? "2px solid #b7b3da" : "2px solid #3d3a52",
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  transition: "border-color 0.15s",
}));

const SlotLabel = styled(Typography)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.875rem",
  color: "#5a5670",
  fontFamily: "Mona10x12",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
});

const LimitBadge = styled("span")({
  fontSize: "0.75rem",
  color: "#b7b3da",
  background: "rgba(183,179,218,0.1)",
  border: "0.5px solid rgba(183,179,218,0.2)",
  padding: "3px 6px",
  fontFamily: "Mona8x12",
  marginLeft: "6px",
});

const ItemSelect = styled("select")({
  background: "#0f0e13",
  border: "1px solid #3d3a52",
  color: "#e8e4ff",
  fontFamily: "Mona8x12",
  fontSize: "0.8125rem",
  padding: "6px 8px",
  width: "100%",
  cursor: "var(--cursor-pointer)",
  "&:focus": { outline: "none", borderColor: "#b7b3da" },
});

const DetailPanel = styled(Box)({
  width: "100%",
  background: "#18171c",
  border: "2px solid #3d3a52",
  padding: "1.5rem",
});

const DetailTitle = styled(Typography)({
  fontSize: "1.1rem",
  fontWeight: "bold",
  color: "#e8e4ff",
  fontFamily: "Mona10x12",
  marginBottom: "1.25rem",
  paddingBottom: "0.75rem",
  borderBottom: "1px solid #3d3a52",
});

const DetailGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "1rem",
  "@media (max-width: 900px)": { gridTemplateColumns: "repeat(2, 1fr)" },
  "@media (max-width: 500px)": { gridTemplateColumns: "1fr" },
});

const RecipeCard = styled(Box)({
  background: "#0f0e13",
  border: "1px solid #3d3a52",
  padding: "1rem",
});

const RecipeName = styled(Typography)({
  fontSize: "0.8125rem",
  fontWeight: "bold",
  color: "#e8e4ff",
  fontFamily: "Mona10x12",
  marginBottom: "0.5rem",
  padding: "0.8rem 0.3rem 0.2rem 0.3rem",
  borderBottom: "1px solid #28263a",
});

const RecipeRow = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  fontSize: "0.75rem",
  color: "#8a86aa",
  fontFamily: "Mona8x12",
  padding: "2px 0",
});

const RecipeValue = styled("span")({
  color: "#c4bdff",
  fontWeight: "500",
});

const ProfitValue = styled("span")(({ positive }) => ({
  color: positive ? "#6befc3" : "#f4365f",
  fontWeight: "bold",
}));

const IngRow = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  fontSize: "0.6875rem",
  color: "#8a86aa",
  fontFamily: "Mona8x12",
  padding: "2px 0",
  borderBottom: "0.5px solid #1e1c28",
  "&:last-child": { borderBottom: "none" },
});

const IngLeft = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "4px",
});

const IngIcon = styled("img")({
  width: "12px",
  height: "12px",
  imageRendering: "pixelated",
});

const EmptyText = styled(Typography)({
  fontSize: "0.8125rem",
  color: "#3d3a52",
  fontFamily: "Mona8x12",
  textAlign: "center",
  padding: "2rem 0",
});

// 모든 레시피 통합
const allRecipes = [
  ...processedRecipes,
  ...restaurantRecipes,
  ...cafeRecipes,
  ...jamRecipes,
  ...wineRecipes,
  ...jewelryRecipes,
];

// 작물 전체
const allCrops = [...vanilla, ...Object.values(seasonal).flat(), ...etc];

// 이름으로 레시피 찾기 (띄어쓰기 무시)
const normalize = (str) => str.replace(/\s/g, "").toLowerCase();

function findRecipe(name) {
  return allRecipes.find((r) => normalize(r.name) === normalize(name));
}

function findCrop(name) {
  return allCrops.find((c) => normalize(c.name) === normalize(name));
}

function calcCost(recipe) {
  if (!recipe) return 0;
  // 보석류
  if (jewelryRecipes.includes(recipe)) {
    return recipe.ingredients.reduce(
      (sum, ing) =>
        sum + getJewelryIngredientPrice(ing.name, ing.price) * ing.count,
      0,
    );
  }
  return getTotalCost(recipe.ingredients);
}

const SLOT_KEYS = ["slot1", "slot2", "slot3", "slot4"];

const ShopPage = () => {
  const [selections, setSelections] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved
        ? JSON.parse(saved)
        : { slot1: "", slot2: "", slot3: "", slot4: "" };
    } catch {
      return { slot1: "", slot2: "", slot3: "", slot4: "" };
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selections));
  }, [selections]);

  const handleChange = (slotKey, value) => {
    setSelections((prev) => ({ ...prev, [slotKey]: value }));
  };

  // 선택된 아이템들의 레시피/정보 수집
  const selectedItems = SLOT_KEYS.map((key) => {
    const name = selections[key];
    if (!name) return null;

    const slot = shopSlots[key];
    const recipe = findRecipe(name);
    const crop = !recipe ? findCrop(name) : null;

    const cost = recipe ? calcCost(recipe) : 0;
    const sellPrice = recipe
      ? (recipe.price ?? 0) * 2
      : crop
        ? (crop.price ?? 0) * 2
        : 0;
    const profit = sellPrice - cost;

    return { key, name, slot, recipe, crop, cost, sellPrice, profit };
  }).filter(Boolean);

  return (
    <ShopContainer>
      <Box sx={{ textAlign: "center" }}>
        <ShopTitle>심야 잡화점</ShopTitle>
        <ShopSubtitle>
          슬롯별 아이템을 선택하면 레시피와 예상 수익을 확인할 수 있어요
        </ShopSubtitle>
        <ShopDescription>
          심야 잡화점은 매일 밤 19시~23시 30분 사이, 30분간만 등장해요.
          <br />
          모든 아이템을 기본 판매가의 2배에 구매하며, 슬롯별로 판매 제한이
          있어요.
        </ShopDescription>
      </Box>

      {/* 슬롯 선택 */}
      <SlotGrid>
        {SLOT_KEYS.map((key) => {
          const slot = shopSlots[key];
          return (
            <SlotPanel key={key} active={!!selections[key]}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0.25rem",
                }}
              >
                <SlotLabel>{slot.label}</SlotLabel>
                <LimitBadge>최대 {slot.limit}개</LimitBadge>
              </Box>
              <ItemSelect
                value={selections[key]}
                onChange={(e) => handleChange(key, e.target.value)}
              >
                <option value="">— 아이템 선택 —</option>
                {slot.items.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </ItemSelect>
            </SlotPanel>
          );
        })}
      </SlotGrid>

      {/* 레시피 상세 */}
      <DetailPanel>
        <DetailTitle>선택된 아이템 정보</DetailTitle>
        {selectedItems.length === 0 ? (
          <EmptyText>슬롯에서 아이템을 선택해주세요</EmptyText>
        ) : (
          <DetailGrid>
            {selectedItems.map(
              ({ key, name, slot, recipe, crop, cost, sellPrice, profit }) => (
                <RecipeCard key={key}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      mb: "0.5rem",
                    }}
                  >
                    {(recipe?.image || crop?.image) && (
                      <img
                        src={recipe?.image || crop?.image}
                        width="36"
                        height="36"
                        style={{
                          imageRendering: "pixelated",
                          objectFit: "contain",
                        }}
                        alt={name}
                      />
                    )}
                    <RecipeName sx={{ mb: 0, pb: 0, border: "none" }}>
                      {name}
                    </RecipeName>
                  </Box>

                  <Box
                    sx={{
                      borderBottom: "1px solid #28263a",
                      mb: "0.5rem",
                      pb: "0.5rem",
                    }}
                  >
                    <RecipeRow>
                      <span>심야 판매가</span>
                      <RecipeValue style={{ fontWeight: "bold" }}>
                        {sellPrice.toLocaleString()}G
                      </RecipeValue>
                    </RecipeRow>
                    {recipe && (
                      <RecipeRow>
                        <span>재료 비용</span>
                        <RecipeValue>{cost.toLocaleString()}G</RecipeValue>
                      </RecipeRow>
                    )}
                    <RecipeRow>
                      <span>순수익</span>
                      <ProfitValue positive={profit >= 0}>
                        {profit >= 0 ? "+" : ""}
                        {profit.toLocaleString()}G
                      </ProfitValue>
                    </RecipeRow>
                    <RecipeRow>
                      <span>판매 제한</span>
                      <RecipeValue>{slot.limit}개</RecipeValue>
                    </RecipeRow>
                  </Box>

                  {/* 재료 목록 */}
                  {recipe && (
                    <Box>
                      <SlotLabel sx={{ mb: "4px" }}>재료</SlotLabel>
                      <IngredientTree ingredients={recipe.ingredients} />
                    </Box>
                  )}

                  {/* 작물이면 계절 정보 */}
                  {crop && (
                    <Box>
                      <SlotLabel sx={{ mb: "4px" }}>정보</SlotLabel>
                      <RecipeRow>
                        <span>기본가</span>
                        <RecipeValue>
                          {crop.price?.toLocaleString()}G
                        </RecipeValue>
                      </RecipeRow>
                      {crop.day && (
                        <RecipeRow>
                          <span>성장 기간</span>
                          <RecipeValue>{crop.day}일</RecipeValue>
                        </RecipeRow>
                      )}
                    </Box>
                  )}
                </RecipeCard>
              ),
            )}
          </DetailGrid>
        )}
      </DetailPanel>
    </ShopContainer>
  );
};

export default ShopPage;
