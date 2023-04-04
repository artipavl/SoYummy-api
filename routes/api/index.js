const recipeRouter = require("./recipe");
const authRouter = require("./auth");
const emailRouter = require("./email");
const shoppingListRoute = require("./shoppingList");
const favoriteRouter = require("./favorites");
const userUpdateRouter = require("./updateUser");


module.exports = { recipeRouter, authRouter, emailRouter, userUpdateRouter, favoriteRouter, shoppingListRoute };

