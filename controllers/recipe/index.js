const { ctrlWrapper } = require("../../helpers");

const allRecipes = require("./allRecipes");
const recipesById = require("./recipesById");
const recipesMainPage = require("./recipesMainPage");
const recipesByCategory = require("./recipesByCategory");
const categoryList = require("./categoryList");
const searchRecipe = require("./searchRecipe");
const popularRecipes = require("./popularRecipes");
const allIngredients = require("./allIngredients");
const takeOwnRecipes = require("./takeOwnRecipes");
const addOwnRecipe = require("./addOwnRecipe");
const deleteOwnRecipe = require("./deleteOwnRecipe");

module.exports = {
	allRecipes: ctrlWrapper(allRecipes),
	recipesById: ctrlWrapper(recipesById),
	recipesMainPage: ctrlWrapper(recipesMainPage),
	recipesByCategory: ctrlWrapper(recipesByCategory),
	categoryList: ctrlWrapper(categoryList),
	searchRecipe: ctrlWrapper(searchRecipe),
	allIngredients: ctrlWrapper(allIngredients),
	takeOwnRecipes: ctrlWrapper(takeOwnRecipes),
	addOwnRecipe: ctrlWrapper(addOwnRecipe),
	deleteOwnRecipe: ctrlWrapper(deleteOwnRecipe),
	popularRecipes: ctrlWrapper(popularRecipes),
};
