const express = require("express");
const { recipe: controllers } = require("../../controllers");
const {
  isValidId,
  authenticate,
  validateBody,
  uploadCloud,
} = require("../../middlewares");
const {
  recipe: { schemas },
} = require("../../models");

const router = express.Router();

const cloudOptions = {
  fieldname: "thumb",
  destFolder: "recipes",
  transformation: {
    width: 700,
    height: 700,
    crop: "fill",
    gravity: "auto",
  },
};

router
  .get("/", controllers.allRecipes)

  .get("/popular-recipe", controllers.popularRecipes)

  .get("/popular-recipe/:category", controllers.popularRecipesByCategory)

  .get("/own-recipes", authenticate, controllers.takeOwnRecipes)

  .post(
    "/own-recipes",
    authenticate,
    uploadCloud(cloudOptions),
    validateBody(schemas.addSchema),
    controllers.addOwnRecipe
  )

  .delete(
    "/own-recipes/:id",
    authenticate,
    isValidId,
    controllers.deleteOwnRecipe
  )

  .get("/main-page", authenticate, controllers.recipesMainPage)

  .get("/list/:category", authenticate, controllers.recipesByCategory)

  .get("/category-list", authenticate, controllers.categoryList)

  .get("/search", authenticate, controllers.searchRecipe)

  .get("/ingredients", authenticate, controllers.allIngredients)

  .get("/:id", authenticate, isValidId, controllers.recipesById);

module.exports = router;
