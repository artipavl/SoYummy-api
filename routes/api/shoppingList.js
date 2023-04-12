const express = require("express");
const { shoppingList: controllers } = require("../../controllers");
const { authenticate } = require("../../middlewares");

const router = express.Router();

router
  .get("/shopping-list", authenticate, controllers.listIngredients)

  .post("/shopping-list", authenticate, controllers.addIngredients)

  .patch("/shopping-list", authenticate, controllers.removeIngredient);

module.exports = router;
