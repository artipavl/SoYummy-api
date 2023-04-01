const express = require("express");

const { recipe } = require('../../controllers');
const { isValidId } = require('../../middlewares');

const router = express.Router();

router.get("/", recipe.allRecipes);

router.get("/main-page", recipe.recipesMainPage);

router.get("/:id", isValidId, recipe.recipesById);

router.get("/list/:category", recipe.recipesByCategory);

router.get("/category-list", recipe.categoryList);

module.exports = router;
