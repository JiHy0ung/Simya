import { seasonal } from "../constants/food/seasonal";
import { vanilla } from "../constants/food/vanilla";
import { etc } from "../constants/food/etc";
import { processedRecipes } from "../constants/food/processed";

const allCrops = [...vanilla, ...Object.values(seasonal).flat(), ...etc];

export const getCropImage = (name) =>
  allCrops.find((c) => c.name === name)?.image ?? null;

// 모든 재료 가격 맵 { 이름: price }
const allSeasonalCrops = Object.values(seasonal).flat();

const priceMap = [...allSeasonalCrops, ...vanilla, ...etc].reduce(
  (map, item) => {
    map[item.name] = item.price;
    return map;
  },
  {},
);

// 가공 레시피 자체 price도 맵에 추가 (런타임에 합산)
const getIngredientPrice = (name) => {
  const processed = processedRecipes.find((r) => r.name === name);
  if (processed) return processed.price ?? 0;

  return priceMap[name] ?? 0;
};

// 재료 비용 합산
export const getTotalCost = (ingredients) =>
  ingredients.reduce(
    (sum, ing) => sum + getIngredientPrice(ing.name) * ing.count,
    0,
  );

// 순수익
export const getNetProfit = (recipe) =>
  (recipe.price ?? 0) - getTotalCost(recipe.ingredients);

// 계절 정보
const allSeasonalWithSeason = Object.entries(seasonal).flatMap(
  ([season, crops]) => crops.map((crop) => ({ ...crop, season })),
);

export const getSeasonalInfo = (name) =>
  allSeasonalWithSeason.find((c) => c.name === name) ?? null;

const findProcessedRecipe = (name) =>
  processedRecipes.find((r) => r.name === name) ?? null;

export const getMaxGrowthDay = (ingredients, visited = new Set()) => {
  let max = 0;
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
  for (const ing of ingredients) {
    if (visited.has(ing.name)) continue;
    const seasonal = getSeasonalInfo(ing.name);
    if (seasonal) result.push({ ...ing, seasonal });
    const processed = findProcessedRecipe(ing.name);
    if (processed) {
      visited.add(ing.name);
      const subResults = getSeasonalIngredients(processed.ingredients, visited);
      result.push(...subResults);
    }
  }
  return result.filter(
    (item, idx, self) => self.findIndex((i) => i.name === item.name) === idx,
  );
};
