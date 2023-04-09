const express = require("express");

const { recipe: controllers } = require("../../controllers");
const { isValidId, authenticate, validateBody } = require("../../middlewares");
const {
  recipe: { schemas },
} = require("../../models");
const uploadCloud = require("../../middlewares/cloudinarySender");

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

router.get("/", controllers.allRecipes);

router.get("/popular-recipe", controllers.popularRecipes);

router.get("/popular-recipe/:category", controllers.popularRecipesByCategory);

router.get("/own-recipes", authenticate, controllers.takeOwnRecipes);

router.post(
  "/own-recipes",
  authenticate,
  uploadCloud(cloudOptions),
  validateBody(schemas.addSchema),
  controllers.addOwnRecipe
);

router.delete(
  "/own-recipes/:id",
  authenticate,
  isValidId,
  controllers.deleteOwnRecipe
);

router.get("/main-page", authenticate, controllers.recipesMainPage);

router.get("/list/:category", authenticate, controllers.recipesByCategory);

router.get("/category-list", authenticate, controllers.categoryList);

router.get("/search", authenticate, controllers.searchRecipe);

router.get("/ingredients", authenticate, controllers.allIngredients);

router.get("/:id", authenticate, isValidId, controllers.recipesById);

module.exports = router;
