import { jewelryRecipes } from "../constants/town/jewelryRecipes";
import { woodRecipes } from "../constants/town/woodRecipes";
import { getJewelryProfit } from "./jewelryUtils";
import { getNetProfit, getSeasonalIngredients } from "./recipeUtils";
import { getWoodProfit } from "./woodUtils";

const getProfit = (recipe) => {
  if (jewelryRecipes.find((r) => r.name === recipe.name))
    return getJewelryProfit(recipe);
  if (woodRecipes.find((r) => r.name === recipe.name))
    return getWoodProfit(recipe);
  return getNetProfit(recipe);
};

const getSeasonalCount = (recipe) =>
  getSeasonalIngredients(recipe.ingredients).length;

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
