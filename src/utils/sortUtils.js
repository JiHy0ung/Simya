import { jewelryRecipes } from "../constants/town/jewelryRecipes";
import { woodRecipes } from "../constants/town/woodRecipes";
import { processedRecipes } from "../constants/food/processed";
import { getJewelryProfit } from "./jewelryUtils";
import { getNetProfit, getSeasonalInfo } from "./recipeUtils";
import { getWoodProfit } from "./woodUtils";

const allProcessed = [...processedRecipes, ...jewelryRecipes, ...woodRecipes];

const getProfit = (recipe) => {
  if (jewelryRecipes.find((r) => r.name === recipe.name))
    return getJewelryProfit(recipe);
  if (woodRecipes.find((r) => r.name === recipe.name))
    return getWoodProfit(recipe);
  return getNetProfit(recipe);
};

// 재귀적으로 계절 재료 이름 수집
export const collectSeasonalNames = (ingredients, visited = new Set()) => {
  const names = new Set();

  for (const ing of ingredients) {
    if (visited.has(ing.name)) continue;

    const seasonal = getSeasonalInfo(ing.name);
    if (seasonal) names.add(ing.name);

    // 가공품이면 재귀 탐색
    const subRecipe = allProcessed.find(
      (r) => r.name.replace(/\s/g, "") === ing.name.replace(/\s/g, ""),
    );
    if (subRecipe) {
      visited.add(ing.name);
      const subNames = collectSeasonalNames(subRecipe.ingredients, visited);
      subNames.forEach((n) => names.add(n));
    }
  }

  return names;
};

const getSeasonalCount = (recipe) =>
  collectSeasonalNames(recipe.ingredients).size;

export const sortRecipes = (recipes, sortKey) => {
  const arr = [...recipes];
  switch (sortKey) {
    case "profit_desc":
      return arr.sort((a, b) => getProfit(b) - getProfit(a));
    case "profit_asc":
      return arr.sort((a, b) => getProfit(a) - getProfit(b));
    case "price_desc":
      return arr.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    case "price_asc":
      return arr.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    case "seasonal_desc":
      return arr.sort((a, b) => getSeasonalCount(b) - getSeasonalCount(a));
    case "seasonal_asc":
      return arr.sort((a, b) => getSeasonalCount(a) - getSeasonalCount(b));
    default:
      return arr;
  }
};
