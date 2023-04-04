const express = require("express");
const { shoppingList: controllers } = require("../../controllers");

const { authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/shopping-list", authenticate, controllers.listIngredients);
router.post("/shopping-list", authenticate, controllers.addIngredients);
router.patch("/shopping-list", authenticate, controllers.removeIngredient);

module.exports = router;
