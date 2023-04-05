const express = require("express");

const { recipe } = require("../../controllers");
const { isValidId, authenticate, validateBody } = require("../../middlewares");
const { schemas } = require("../../models");
const router = express.Router();

router.get("/", recipe.allRecipes);

router.get("/popular-recipe", recipe.popularRecipes);

router.get("/popular-recipe/:category", recipe.popularRecipesByCategory);

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

router.get("/main-page", authenticate, recipe.recipesMainPage);

router.get("/list/:category", authenticate, recipe.recipesByCategory);

router.get("/category-list", authenticate, recipe.categoryList);

router.get("/search", authenticate, recipe.recipeByTitle);

router.get("/searchByIngredient", authenticate, recipe.recipesByIngredient);

router.get("/ingredients", authenticate, recipe.allIngredients);

router.get("/:id", authenticate, isValidId, recipe.recipesById);

module.exports = router;
