import { vanilla } from "../constants/food/vanilla";
import { seasonal } from "../constants/food/seasonal";
import { etc } from "../constants/food/etc";
import { woodRecipes } from "../constants/town/woodRecipes";
import { jewelryRecipes } from "../constants/town/jewelryRecipes";
import { fish } from "../constants/town/fish";

const allSeasonalCrops = Object.values(seasonal).flat();

const crops = [...vanilla, ...allSeasonalCrops, ...etc];

const extractIngredients = (recipes) =>
  recipes.flatMap((r) =>
    r.ingredients.map((i) => ({
      name: i.name,
      image: i.image,
    })),
  );

const recipeItems = [
  ...woodRecipes.map((r) => ({ name: r.name, image: r.image })),
  ...jewelryRecipes.map((r) => ({ name: r.name, image: r.image })),
];

const ingredientItems = [
  ...extractIngredients(woodRecipes),
  ...extractIngredients(jewelryRecipes),
];

const allItems = [...crops, ...recipeItems, ...ingredientItems, ...fish];

export const getItemImage = (name) =>
  allItems.find((item) => item.name === name)?.image ?? null;
