import { town } from "../constants/town/town";
import { woodRecipes } from "../constants/town/woodRecipes";
export const getWoodIngredientPrice = (name, directPrice) => {
  if (directPrice !== undefined) return directPrice;
  return woodRecipes.find((r) => r.name === name)?.price ?? 0;
};

export const getWoodCost = (ingredients) =>
  ingredients.reduce(
    (sum, ing) => sum + getWoodIngredientPrice(ing.name, ing.price) * ing.count,
    0,
  );

export const getWoodProfit = (recipe) =>
  (recipe.price ?? 0) - getWoodCost(recipe.ingredients);

export const getTownsByTree = (treeName) =>
  town.filter((t) => t.resources.trees.some((tree) => treeName.includes(tree)));

export const getRequiredTownsByTree = (ingredients, visited = new Set()) => {
  const result = [];

  for (const ing of ingredients) {
    if (visited.has(ing.name)) continue;
    visited.add(ing.name);

    const towns = getTownsByTree(ing.name);
    for (const t of towns) {
      if (!result.find((r) => r.name === t.name)) result.push(t);
    }

    const processed = woodRecipes.find((r) => r.name === ing.name);
    if (processed) {
      const subTowns = getRequiredTownsByTree(processed.ingredients, visited);
      for (const t of subTowns) {
        if (!result.find((r) => r.name === t.name)) result.push(t);
      }
    }
  }

  return result;
};
