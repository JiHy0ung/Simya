import { seasonal } from "../constants/food/seasonal";
import { vanilla } from "../constants/food/vanilla";
import { etc } from "../constants/food/etc";
import { processedRecipes } from "../constants/food/processed";
import { restaurantRecipes } from "../constants/food/restaurant";
import { cafeRecipes } from "../constants/food/cafe";
import { jamRecipes } from "../constants/food/jam";
import { wineRecipes } from "../constants/food/wine";

export const SEASON_LABEL = {
  봄: "봄",
  여름: "여름",
  가을: "가을",
  겨울: "겨울",
};

// 1. 모든 재료 데이터 통합 (이미지 검색용)
// 이 변수들은 원시 배열들이라 초기화 에러 위험이 적습니다.
const allSeasonalCrops = Object.values(seasonal).flat();
const allCrops = [...vanilla, ...allSeasonalCrops, ...etc];

/**
 * 2. 가격 맵을 반환하는 헬퍼 함수
 * 초기화 시점에 바로 참조하지 않고, 함수가 호출될 때 참조하도록 하여
 * "Cannot access before initialization" 에러를 피합니다.
 */
const getPriceMap = () => {
  return [...allCrops, ...processedRecipes].reduce((map, item) => {
    map[item.name] = item.price ?? 0;
    return map;
  }, {});
};

/**
 * 재료의 비용(Cost)을 가져오는 함수
 */
const getIngredientPrice = (name) => {
  const priceMap = getPriceMap();
  return priceMap[name] ?? 0;
};

/**
 * 요리 재료 리스트의 총 비용 합산
 */
export const getTotalCost = (ingredients) => {
  if (!ingredients || !Array.isArray(ingredients)) return 0;
  return ingredients.reduce(
    (sum, ing) => sum + getIngredientPrice(ing.name) * ing.count,
    0,
  );
};

/**
 * 순수익 계산: 판매가 - 재료비
 */
export const getNetProfit = (recipe) => {
  const sellPrice = recipe.price ?? 0;
  const cost = getTotalCost(recipe.ingredients);

  // 만약 오일 가격이 200원이고 판매가가 1000원이라면,
  // 1000 - 200 = 800이 정상적으로 반환됩니다.
  return sellPrice - cost;
};

// --- 계절 및 성장일 정보 관련 로직 ---

const allSeasonalWithSeason = Object.entries(seasonal).flatMap(
  ([season, crops]) => crops.map((crop) => ({ ...crop, season })),
);

export const getSeasonalInfo = (name) =>
  allSeasonalWithSeason.find((c) => c.name === name) ?? null;

const findProcessedRecipe = (name) =>
  processedRecipes.find((r) => r.name === name) ?? null;

export const getMaxGrowthDay = (ingredients, visited = new Set()) => {
  let max = 0;
  if (!ingredients) return max;

  for (const ing of ingredients) {
    if (visited.has(ing.name)) continue;

    const seasonal = getSeasonalInfo(ing.name);
    if (seasonal && seasonal.day > max) max = seasonal.day;

    const processed = findProcessedRecipe(ing.name);
    if (processed) {
      visited.add(ing.name);
      const subMax = getMaxGrowthDay(processed.ingredients, visited);
      if (subMax > max) max = subMax;
    }
  }
  return max;
};

export const getSeasonalIngredients = (ingredients, visited = new Set()) => {
  const result = [];
  if (!ingredients) return result;

  for (const ing of ingredients) {
    if (visited.has(ing.name)) continue;

    const seasonal = getSeasonalInfo(ing.name);
    if (seasonal) result.push({ ...ing, seasonal });

    // const processed = findProcessedRecipe(ing.name);
    // if (processed) {
    //   visited.add(ing.name);
    //   const subResults = getSeasonalIngredients(processed.ingredients, visited);
    //   result.push(...subResults);
    // }
  }
  return result.filter(
    (item, idx, self) => self.findIndex((i) => i.name === item.name) === idx,
  );
};

const allFinalRecipes = [
  ...processedRecipes,
  ...restaurantRecipes,
  ...cafeRecipes,
  ...jamRecipes,
  ...wineRecipes,
];

// 특정 재료가 들어가는 완성품 찾기 (재귀)
export const findRecipesByIngredient = (
  ingredientName,
  visited = new Set(),
) => {
  const result = [];

  for (const recipe of allFinalRecipes) {
    if (visited.has(recipe.name)) continue;

    const hasIngredient = recipe.ingredients.some(
      (ing) =>
        ing.name.replace(/\s/g, "") === ingredientName.replace(/\s/g, ""),
    );

    if (hasIngredient) {
      result.push(recipe);
      continue;
    }

    // 재료가 가공품인 경우 재귀 탐색
    for (const ing of recipe.ingredients) {
      const subRecipe = processedRecipes.find(
        (r) => r.name.replace(/\s/g, "") === ing.name.replace(/\s/g, ""),
      );
      if (subRecipe && !visited.has(subRecipe.name)) {
        visited.add(subRecipe.name);
        const subHas = subRecipe.ingredients.some(
          (si) =>
            si.name.replace(/\s/g, "") === ingredientName.replace(/\s/g, ""),
        );
        if (subHas && !result.find((r) => r.name === recipe.name)) {
          result.push(recipe);
        }
      }
    }
  }

  return result;
};
