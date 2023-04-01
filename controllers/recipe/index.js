const { ctrlWrapper } = require("../../helpers");


const allRecipes = require('./allRecipes');
const recipesById = require('./recipesById');
const recipesMainPage = require('./recipesMainPage');
const recipesByCategory = require('./recipesByCategory');
const categoryList = require("./categoryList");

module.exports = {
    allRecipes: ctrlWrapper(allRecipes),
    recipesById: ctrlWrapper(recipesById),
    recipesMainPage: ctrlWrapper(recipesMainPage),
    recipesByCategory: ctrlWrapper(recipesByCategory),
    categoryList: ctrlWrapper(categoryList),
  };


