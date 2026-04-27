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

export const getRequiredTowns = (ingredients, visited = new Set()) => {
  const result = [];
  for (const ing of ingredients) {
    if (visited.has(ing.name)) continue;
    visited.add(ing.name);
    const towns = getTownsByMineral(ing.name);
    for (const t of towns) {
      if (!result.find((r) => r.name === t.name)) result.push(t);
    }
    const processed = jewelryRecipes.find((r) => r.name === ing.name);
    if (processed) {
      const subTowns = getRequiredTowns(processed.ingredients, visited);
      for (const t of subTowns) {
        if (!result.find((r) => r.name === t.name)) result.push(t);
      }
    }
  }
  return result;
};

// 특정 재료가 직접 또는 간접적으로 들어가는지 확인 (재귀)
const containsIngredient = (recipe, targetName, visited = new Set()) => {
  if (visited.has(recipe.name)) return false;
  visited.add(recipe.name);

  for (const ing of recipe.ingredients) {
    if (ing.name.replace(/\s/g, "") === targetName.replace(/\s/g, ""))
      return true;

    // 하위 레시피 재귀 탐색
    const subRecipe = jewelryRecipes.find(
      (r) => r.name.replace(/\s/g, "") === ing.name.replace(/\s/g, ""),
    );
    if (subRecipe && containsIngredient(subRecipe, targetName, visited))
      return true;
  }
  return false;
};

export const findJewelryByIngredient = (ingredientName) =>
  jewelryRecipes.filter((r) =>
    containsIngredient(r, ingredientName, new Set()),
  );
