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

// 재료 이름으로 마을 찾기
export const getTownsByMineral = (mineralName) =>
  town.filter((t) => t.resources.minerals.some((m) => m === mineralName));

// 레시피 전체 재료 기준으로 필요한 마을 목록
export const getRequiredTowns = (ingredients) => {
  const result = [];
  for (const ing of ingredients) {
    const towns = getTownsByMineral(ing.name);
    for (const t of towns) {
      if (!result.find((r) => r.name === t.name)) {
        result.push(t);
      }
    }
  }
  return result;
};
