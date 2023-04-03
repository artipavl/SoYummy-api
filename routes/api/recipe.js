const express = require("express");

const { recipe } = require("../../controllers");
const { isValidId } = require("../../middlewares");

const router = express.Router();

router.get("/", recipe.allRecipes);

router.get("/popular-recipe", recipe.popularRecipes);

router.get("/main-page", recipe.recipesMainPage);

router.get("/list/:category", recipe.recipesByCategory);

router.get("/category-list", recipe.categoryList);

router.get("/search/:title", recipe.recipeByTitle);

router.get("/search/ingredients/:ingredientId", recipe.recipesByIngredient);

router.get("/ingredients", recipe.allIngredients);

router.get("/:id", isValidId, recipe.recipesById);

module.exports = router;
