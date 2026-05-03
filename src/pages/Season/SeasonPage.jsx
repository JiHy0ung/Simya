import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Box, Container, Typography } from "@mui/material";
import { seasonal } from "../../constants/food/seasonal";
import { town } from "../../constants/town/town";
import { SEASON_THEME } from "../../constants/commons";
import { getGameTime } from "../../utils/gameTime";
import { findRecipesByIngredient } from "../../utils/recipeUtils";
import IngredientTree from "../../commons/components/IngredientTree";
import { findWoodByIngredient } from "../../utils/woodUtils";
import { findJewelryByIngredient } from "../../utils/jewelryUtils";
import { woodRecipes } from "../../constants/town/woodRecipes";
import { jewelryRecipes } from "../../constants/town/jewelryRecipes";
import RecipeDetail from "../Food/components/RecipeDetail";

const findItemImage = (name, type) => {
  if (type === "wood") {
    const recipe = woodRecipes.find((r) =>
      r.ingredients.some(
        (ing) => ing.name.replace(/\s/g, "") === name.replace(/\s/g, ""),
      ),
    );
    return (
      recipe?.ingredients.find(
        (ing) => ing.name.replace(/\s/g, "") === name.replace(/\s/g, ""),
      )?.image ?? null
    );
  }
  // mineral, flower
  const recipe = jewelryRecipes.find((r) =>
    r.ingredients.some(
      (ing) => ing.name.replace(/\s/g, "") === name.replace(/\s/g, ""),
    ),
  );
  return (
    recipe?.ingredients.find(
      (ing) => ing.name.replace(/\s/g, "") === name.replace(/\s/g, ""),
    )?.image ?? null
  );
};

const SeasonContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "3rem",
  paddingBottom: "3rem",
});

const SeasonTitle = styled(Typography)(({ theme }) => ({
  fontSize: "3.5rem",
  fontWeight: "900",
  marginBottom: "1rem",
  [theme.breakpoints.down("md")]: {
    fontSize: "3rem",
  },
}));

const SeasonSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.1rem",
  color: "#666",
  marginBottom: "0.5rem",
  textAlign: "center",
  [theme.breakpoints.down("md")]: {
    fontSize: "0.875rem",
  },
}));

const SeasonDescription = styled(Typography)(({ theme }) => ({
  fontSize: "0.95rem",
  color: "#888",
  textAlign: "center",
  maxWidth: "600px",
  marginBottom: "4rem",
  [theme.breakpoints.down("md")]: {
    fontSize: "0.75rem",
  },
}));

const TabsWrapper = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  width: "100%",
  gap: "8px",
  marginBottom: "1.25rem",
});

const TabButton = styled("button")(({ active, season }) => {
  const c = SEASON_THEME[season] ?? {
    bg: "rgba(255,255,255,0.1)",
    text: "#fff",
  };
  return {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.3rem",
    padding: "0.5rem 1rem",
    fontSize: "0.85rem",
    color: active ? c.text : "rgba(255,255,255,0.45)",
    background: active ? c.bg : "transparent",
    border: active
      ? `0.5px solid ${c.text.replace(")", ", 0.5)").replace("rgb", "rgba")}`
      : "0.5px solid rgba(183,179,218,0.25)",
    borderRadius: "8px",
    cursor: "var(--cursor-pointer)",
    fontFamily: "Mona8x12",
    transition: "all 0.15s",
  };
});

const SeasonIcon = styled("img")({
  width: "1.2rem",
  height: "1.2rem",
  imageRendering: "pixelated",
  objectFit: "contain",
});

const CurrentBadge = styled("span")({
  fontSize: "0.625rem",
  padding: "1px 6px",
  background: "rgba(107,239,195,0.15)",
  color: "#6befc3",
  fontFamily: "Mona8x12",
  marginLeft: "8px",
});

const ContentLayout = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "1.5rem",
  alignItems: "start",
  [theme.breakpoints.down("md")]: { gridTemplateColumns: "1fr" },
}));

const Panel = styled(Box)({
  background: "#18171c",
  border: "2px solid #3d3a52",
  padding: "1.25rem",
});

const PanelTitle = styled(Typography)({
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  gap: "0.25rem",
  fontSize: "0.75rem",
  color: "#5a5670",
  fontFamily: "Mona8x12",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  marginBottom: "1rem",
  paddingBottom: "0.5rem",
  borderBottom: "1px solid #3d3a52",
});

const TownIcon = styled("img")({
  width: "3.5rem",
  height: "3.5rem",
  imageRendering: "pixelated",
});

// 작물 카드 그리드
const CropGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(72px, 1fr))",
  gap: "8px",
  marginBottom: "1.25rem",
});

const CropCard = styled(Box)(({ selected }) => ({
  background: selected ? "rgba(183,179,218,0.08)" : "#0f0e13",
  border: selected ? "1.5px solid #b7b3da" : "1.5px solid #3d3a52",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "0.5rem",
  gap: "5px",
  cursor: "var(--cursor-pointer)",
  transition: "all 0.12s",
  aspectRatio: "1 / 1",
  "&:hover": {
    borderColor: "1.5px solid #b7b3da",
    background: "rgba(183,179,218,0.08)",
  },
}));

const CropIcon = styled("img")({
  width: "32px",
  height: "32px",
  imageRendering: "pixelated",
  objectFit: "contain",
});

const CropName = styled("span")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.15rem",
  fontSize: "0.75rem",
  color: "#8a86aa",
  fontFamily: "Mona10x12",
  textAlign: "center",
  wordBreak: "keep-all",
});

const DayBadge = styled("span")(({ season }) => {
  const c = SEASON_THEME[season] ?? {
    bg: "rgba(255,255,255,0.1)",
    text: "#fff",
  };
  return {
    fontSize: "0.5625rem",
    padding: "1px 4px",
    background: c.bg,
    color: c.text,
    fontFamily: "Mona8x12",
  };
});

// 완성품 카드
const RecipeGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
  gap: "8px",
  marginBottom: "1.25rem",
});

const RecipeCard = styled(Box)(({ selected }) => ({
  background: selected ? "rgba(183,179,218,0.08)" : "#0f0e13",
  border: selected ? "1.5px solid #b7b3da" : "1.5px solid #3d3a52",
  padding: "8px 4px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "5px",
  cursor: "var(--cursor-pointer)",
  transition: "all 0.12s",
  "&:hover": {
    borderColor: "#b7b3da",
    background: "rgba(183,179,218,0.06)",
  },
}));

const RecipeIcon = styled("img")({
  width: "36px",
  height: "36px",
  imageRendering: "pixelated",
  objectFit: "contain",
});

const RecipeName = styled("span")({
  display: "flex",
  alignItems: "center",
  gap: "0.15rem",
  fontSize: "0.75rem",
  color: "#8a86aa",
  fontFamily: "Mona10x12",
  textAlign: "center",
  lineHeight: 1.3,
  wordBreak: "keep-all",
});

const RecipePrice = styled("span")({
  fontSize: "0.625rem",
  color: "#c4bdff",
  fontFamily: "Mona8x12",
});

const EmptyText = styled(Typography)({
  fontSize: "0.75rem",
  color: "#3d3a52",
  fontFamily: "Mona8x12",
  textAlign: "center",
  padding: "1.5rem 0",
});

const SEASONS = ["봄", "여름", "가을", "겨울"];

const SeasonPage = () => {
  const [gameTime, setGameTime] = useState(getGameTime());
  const [selectedSeason, setSelectedSeason] = useState(getGameTime().season);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const [selectedTown, setSelectedTown] = useState(null);
  const [selectedTownItem, setSelectedTownItem] = useState(null);
  const [selectedTownRecipe, setSelectedTownRecipe] = useState(null);

  const availableTowns = town.filter((t) => t.seasons.includes(selectedSeason));

  const handleTownClick = (t) => {
    if (selectedTown?.name === t.name) {
      setSelectedTown(null);
      setSelectedTownItem(null);
      setSelectedTownRecipe(null);
    } else {
      setSelectedTown(t);
      setSelectedTownItem(null);
      setSelectedTownRecipe(null);
    }
  };

  const handleTownItemClick = (item, type) => {
    if (selectedTownItem?.name === item) {
      setSelectedTownItem(null);
      setSelectedTownRecipe(null);
    } else {
      setSelectedTownItem({ name: item, type });
      setSelectedTownRecipe(null);
    }
  };

  const townItemRecipes = selectedTownItem
    ? selectedTownItem.type === "wood"
      ? findWoodByIngredient(selectedTownItem.name)
      : findJewelryByIngredient(selectedTownItem.name)
    : [];

  useEffect(() => {
    const interval = setInterval(() => setGameTime(getGameTime()), 5000);
    return () => clearInterval(interval);
  }, []);

  const crops = seasonal[selectedSeason] ?? [];
  const relatedRecipes = selectedCrop
    ? findRecipesByIngredient(selectedCrop.name)
    : [];

  const handleSeasonChange = (s) => {
    setSelectedSeason(s);
    setSelectedCrop(null);
    setSelectedRecipe(null);
  };

  const handleCropClick = (crop) => {
    if (selectedCrop?.name === crop.name) {
      setSelectedCrop(null);
      setSelectedRecipe(null);
    } else {
      setSelectedCrop(crop);
      setSelectedRecipe(null);
    }
  };

  const handleRecipeClick = (recipe) => {
    if (selectedRecipe?.name === recipe.name) {
      setSelectedRecipe(null);
    } else {
      setSelectedRecipe(recipe);
    }
  };

  return (
    <SeasonContainer>
      <SeasonTitle>계절 정보</SeasonTitle>
      <SeasonSubtitle>
        현재 계절의 작물과 관련 레시피를 확인하세요
      </SeasonSubtitle>
      <SeasonDescription>
        계절마다 수확 가능한 작물이 달라져요.
        <br />
        현재 서버 계절은{" "}
        <strong style={{ color: SEASON_THEME[gameTime.season]?.text }}>
          {gameTime.season}
        </strong>
        이에요.
      </SeasonDescription>

      <TabsWrapper>
        {SEASONS.map((s) => (
          <TabButton
            key={s}
            active={selectedSeason === s}
            season={s}
            onClick={() => handleSeasonChange(s)}
          >
            <SeasonIcon src={SEASON_THEME[s].image} alt={s.name} />
            {s}
          </TabButton>
        ))}
      </TabsWrapper>

      <ContentLayout>
        {/* 왼쪽 */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* 작물 카드 */}
          <Panel>
            <PanelTitle>
              <span style={{ color: "#dadada" }}>{gameTime.season}</span>에 수확
              가능한 작물
            </PanelTitle>
            <CropGrid>
              {crops.map((crop) => (
                <CropCard
                  key={crop.name}
                  selected={selectedCrop?.name === crop.name}
                  season={selectedSeason}
                  onClick={() => handleCropClick(crop)}
                >
                  {crop.image && <CropIcon src={crop.image} alt={crop.name} />}
                  <CropName>
                    {crop.name}{" "}
                    <span style={{ fontSize: "0.6875rem", color: "#5a5670" }}>
                      ({crop.day}일)
                    </span>
                  </CropName>
                </CropCard>
              ))}
            </CropGrid>
          </Panel>

          {/* 완성품 카드 */}
          {selectedCrop && (
            <Panel>
              <PanelTitle>
                <span style={{ color: "#dadada" }}>{selectedCrop.name} </span>
                이(가) 들어가는 완성품
              </PanelTitle>
              {relatedRecipes.length === 0 ? (
                <EmptyText>해당 작물이 들어가는 완성품이 없어요</EmptyText>
              ) : (
                <>
                  <RecipeGrid>
                    {relatedRecipes.map((recipe) => (
                      <RecipeCard
                        key={recipe.name}
                        selected={selectedRecipe?.name === recipe.name}
                        onClick={() => handleRecipeClick(recipe)}
                      >
                        {recipe.image && (
                          <RecipeIcon src={recipe.image} alt={recipe.name} />
                        )}
                        <RecipeName>{recipe.name}</RecipeName>
                        <RecipePrice>
                          {recipe.price?.toLocaleString()}G
                        </RecipePrice>
                      </RecipeCard>
                    ))}
                  </RecipeGrid>

                  {/* 레시피 상세 */}
                  {selectedRecipe && <RecipeDetail recipe={selectedRecipe} />}
                </>
              )}
            </Panel>
          )}
        </Box>

        {/* 오른쪽 */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* 마을 카드 */}
          <Panel>
            <PanelTitle>방문 가능한 마을</PanelTitle>
            {availableTowns.length === 0 ? (
              <EmptyText>방문 가능한 마을이 없어요</EmptyText>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                {availableTowns.map((t) => (
                  <Box
                    key={t.name}
                    onClick={() => handleTownClick(t)}
                    sx={{
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "center",
                      gap: "0.875rem",
                      background:
                        selectedTown?.name === t.name
                          ? "rgba(183,179,218,0.06)"
                          : "#0f0e13",
                      border:
                        selectedTown?.name === t.name
                          ? "1.5px solid #b7b3da"
                          : "1.5px solid #3d3a52",
                      padding: "0.875rem",
                      cursor: "var(--cursor-pointer)",
                      transition: "all 0.12s",
                      "&:hover": {
                        borderColor: "#b7b3da",
                        background: "rgba(183,179,218,0.04)",
                      },
                    }}
                  >
                    <TownIcon src={t.image} alt={t.name} />
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "0.9375rem",
                          fontWeight: "bold",
                          color: "#e8e4ff",
                          fontFamily: "Mona10x12",
                          mb: "0.5rem",
                        }}
                      >
                        {t.name}
                      </Typography>
                      <Box
                        sx={{ display: "flex", flexWrap: "wrap", gap: "4px" }}
                      >
                        {[
                          ...t.resources.minerals,
                          ...t.resources.trees,
                          ...t.resources.flowers,
                        ].map((item) => (
                          <span
                            key={item}
                            style={{
                              fontSize: "0.625rem",
                              color: "#5a5670",
                              background: "rgba(255,255,255,0.04)",
                              border: "0.5px solid #28263a",
                              padding: "1px 6px",
                              fontFamily: "Mona8x12",
                            }}
                          >
                            {item}
                          </span>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </Panel>

          {/* 채집 아이템 */}
          {selectedTown && (
            <Panel>
              <PanelTitle>
                <span style={{ color: "#dadada" }}>{selectedTown.name} </span>
                채집 아이템
              </PanelTitle>

              {/* 광물 */}
              {selectedTown.resources.minerals.length > 0 && (
                <Box sx={{ mb: "1.25rem" }}>
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      color: "#5a5670",
                      fontFamily: "Mona10x12",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      mb: "6px",
                    }}
                  >
                    광물
                  </Typography>
                  <CropGrid>
                    {selectedTown.resources.minerals.map((item) => (
                      <CropCard
                        key={item}
                        selected={selectedTownItem?.name === item}
                        season={selectedSeason}
                        onClick={() => handleTownItemClick(item, "mineral")}
                      >
                        {findItemImage(item, "mineral") && (
                          <CropIcon
                            src={findItemImage(item, "mineral")}
                            alt={item}
                          />
                        )}
                        <CropName>{item}</CropName>
                      </CropCard>
                    ))}
                  </CropGrid>
                </Box>
              )}

              {/* 나무 */}
              {selectedTown.resources.trees.length > 0 && (
                <Box sx={{ mb: "1.25rem" }}>
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      color: "#5a5670",
                      fontFamily: "Mona10x12",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      mb: "6px",
                    }}
                  >
                    나무
                  </Typography>
                  <CropGrid>
                    {selectedTown.resources.trees.map((item) => (
                      <CropCard
                        key={item}
                        selected={selectedTownItem?.name === item}
                        season={selectedSeason}
                        onClick={() => handleTownItemClick(item, "wood")}
                      >
                        {findItemImage(item, "wood") && (
                          <CropIcon
                            src={findItemImage(item, "wood")}
                            alt={item}
                          />
                        )}
                        <CropName>{item}</CropName>
                      </CropCard>
                    ))}
                  </CropGrid>
                </Box>
              )}

              {/* 꽃 */}
              {selectedTown.resources.flowers.length > 0 && (
                <Box sx={{ mb: selectedTownItem ? "1.25rem" : 0 }}>
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      color: "#5a5670",
                      fontFamily: "Mona10x12",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      mb: "6px",
                    }}
                  >
                    꽃
                  </Typography>
                  <CropGrid>
                    {selectedTown.resources.flowers.map((item) => (
                      <CropCard
                        key={item}
                        selected={selectedTownItem?.name === item}
                        season={selectedSeason}
                        onClick={() => handleTownItemClick(item, "flower")}
                      >
                        {findItemImage(item, "flower") && (
                          <CropIcon
                            src={findItemImage(item, "flower")}
                            alt={item}
                          />
                        )}
                        <CropName>{item}</CropName>
                      </CropCard>
                    ))}
                  </CropGrid>
                </Box>
              )}

              {/* 완성품 카드 */}
              {selectedTownItem && (
                <Box sx={{ pt: "1rem", borderTop: "1px solid #3d3a52" }}>
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      color: "#5a5670",
                      fontFamily: "Mona8x12",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      mb: "0.75rem",
                    }}
                  >
                    <span style={{ color: "#dadada" }}>
                      {selectedTownItem.name}
                    </span>{" "}
                    이(가) 들어가는 완성품
                  </Typography>
                  {townItemRecipes.length === 0 ? (
                    <EmptyText>
                      해당 아이템이 들어가는 완성품이 없어요
                    </EmptyText>
                  ) : (
                    <>
                      <RecipeGrid>
                        {townItemRecipes.map((recipe) => (
                          <RecipeCard
                            key={recipe.name}
                            selected={selectedTownRecipe?.name === recipe.name}
                            onClick={() =>
                              setSelectedTownRecipe(
                                selectedTownRecipe?.name === recipe.name
                                  ? null
                                  : recipe,
                              )
                            }
                          >
                            {recipe.image && (
                              <RecipeIcon
                                src={recipe.image}
                                alt={recipe.name}
                              />
                            )}
                            <RecipeName>{recipe.name}</RecipeName>
                            <RecipePrice>
                              {recipe.price?.toLocaleString()}G
                            </RecipePrice>
                          </RecipeCard>
                        ))}
                      </RecipeGrid>

                      {selectedTownRecipe && (
                        <RecipeDetail recipe={selectedTownRecipe} />
                      )}
                    </>
                  )}
                </Box>
              )}
            </Panel>
          )}
        </Box>
      </ContentLayout>
    </SeasonContainer>
  );
};

export default SeasonPage;
