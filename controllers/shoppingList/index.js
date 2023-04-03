const { ctrlWrapper } = require("../../helpers");

const addIngredients = require("./addIngredients");
const removeIngredients = require("./removeIngredients");
const listIngredients = require("./listIngredients");

module.exports = {
  addIngredients: ctrlWrapper(addIngredients),
  removeIngredients: ctrlWrapper(removeIngredients),
  listIngredients: ctrlWrapper(listIngredients),
};
