const { ctrlWrapper } = require("../../helpers");

const addIngredients = require("./addIngredients");
const removeIngredient = require("./removeIngredient");
const listIngredients = require("./listIngredients");

module.exports = {
  addIngredients: ctrlWrapper(addIngredients),
  removeIngredient: ctrlWrapper(removeIngredient),
  listIngredients: ctrlWrapper(listIngredients),
};
