const { ctrlWrapper } = require("../../helpers");

const allRecipes = require("./allRecipes");
const recipesById = require("./recipesById");
const recipesMainPage = require("./recipesMainPage");
const recipesByCategory = require("./recipesByCategory");
const categoryList = require("./categoryList");
const recipeByTitle = require("./recipeByTitle");
const popularRecipes = require("./popularRecipes");
const recipesByIngredient = require("./recipesByIngredient");
const allIngredients = require("./allIngredients");
const takeOwnRecipes = require("./takeOwnRecipes");
const addOwnRecipe = require("./addOwnRecipe");
const deleteOwnRecipe = require("./deleteOwnRecipe");
const popularRecipesByCategory = require("./popularRecipesByCategory");

module.exports = {
  allRecipes: ctrlWrapper(allRecipes),
  recipesById: ctrlWrapper(recipesById),
  recipesMainPage: ctrlWrapper(recipesMainPage),
  recipesByCategory: ctrlWrapper(recipesByCategory),
  categoryList: ctrlWrapper(categoryList),
  recipeByTitle: ctrlWrapper(recipeByTitle),
  recipesByIngredient: ctrlWrapper(recipesByIngredient),
  allIngredients: ctrlWrapper(allIngredients),
  takeOwnRecipes: ctrlWrapper(takeOwnRecipes),
  addOwnRecipe: ctrlWrapper(addOwnRecipe),
  deleteOwnRecipe: ctrlWrapper(deleteOwnRecipe),
  popularRecipes: ctrlWrapper(popularRecipes),
  popularRecipesByCategory: ctrlWrapper(popularRecipesByCategory),
};
