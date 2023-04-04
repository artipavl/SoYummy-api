const express = require("express");

const { recipe } = require("../../controllers");
const { isValidId, authenticate, validateBody } = require("../../middlewares");
const { schemas } = require("../../models");
const router = express.Router();


router.get("/", recipe.allRecipes);


router.get("/popular-recipe", recipe.popularRecipes);

router.get("/own-recipes", authenticate, recipe.takeOwnRecipes);

router.post(
  "/own-recipes",
  authenticate,
  validateBody(schemas.addSchema),
  recipe.addOwnRecipe
);

router.delete(
  "/own-recipes/:id",
  authenticate,
  isValidId,
  recipe.deleteOwnRecipe
);


router.get("/main-page", recipe.recipesMainPage);

router.get("/list/:category", recipe.recipesByCategory);

router.get("/category-list", recipe.categoryList);

router.get("/search", recipe.recipeByTitle);

router.get("/searchByIngredient", recipe.recipesByIngredient);

router.get("/ingredients", recipe.allIngredients);

router.get("/:id", isValidId, recipe.recipesById);

module.exports = router;
