const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const { recipe: controllers } = require("../../controllers");
const { isValidId, authenticate, validateBody } = require("../../middlewares");
const {
  recipe: { schemas },
} = require("../../models");

const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;

const router = express.Router();

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "recipes",
    allowed_formats: ["jpg", "png"],
    transformation: {
      crop: "thumb",
      gravity: "auto",
    },
  },
});

const uploadCloud = multer({ storage });

router.get("/", controllers.allRecipes);

router.get("/popular-recipe", controllers.popularRecipes);

router.get("/popular-recipe/:category", controllers.popularRecipesByCategory);

router.get("/own-recipes", authenticate, controllers.takeOwnRecipes);

router.post(
  "/own-recipes",
  authenticate,
  uploadCloud.single("thumb"),
  // validateBody(schemas.addSchema),
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
