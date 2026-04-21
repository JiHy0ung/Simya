import { town } from "../constants/town/town";
import { jewelryRecipes } from "../constants/town/jewelryRecipes";

export const getJewelryIngredientPrice = (name, directPrice) => {
  if (directPrice !== undefined) return directPrice;
  return jewelryRecipes.find((r) => r.name === name)?.price ?? 0;
};

export const getJewelryCost = (ingredients) =>
  ingredients.reduce(
    (sum, ing) =>
      sum + getJewelryIngredientPrice(ing.name, ing.price) * ing.count,
    0,
  );

export const getJewelryProfit = (recipe) =>
  (recipe.price ?? 0) - getJewelryCost(recipe.ingredients);

export const getTownsByMineral = (mineralName) =>
  town.filter((t) => t.resources.minerals.some((m) => m === mineralName));

// 재귀적으로 원석까지 타고 들어가서 마을 찾기
export const getRequiredTowns = (ingredients, visited = new Set()) => {
  const result = [];

  for (const ing of ingredients) {
    if (visited.has(ing.name)) continue;
    visited.add(ing.name);

    // 직접 마을에서 채집 가능한 재료인지 확인
    const towns = getTownsByMineral(ing.name);
    for (const t of towns) {
      if (!result.find((r) => r.name === t.name)) {
        result.push(t);
      }
    }

    // 가공품이면 재귀 탐색
    const processed = jewelryRecipes.find((r) => r.name === ing.name);
    if (processed) {
      const subTowns = getRequiredTowns(processed.ingredients, visited);
      for (const t of subTowns) {
        if (!result.find((r) => r.name === t.name)) {
          result.push(t);
        }
      }
    }
  }

  return result;
};
