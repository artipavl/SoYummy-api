const recipeRouter = require("./recipe");
const authRouter = require("./auth");
const emailRouter = require("./email");
const shoppingListRoute = require("./shoppingList");
const favoriteRouter = require("./favorites");

module.exports = {
  recipeRouter,
  authRouter,
  emailRouter,
  favoriteRouter,
  shoppingListRoute,
};
