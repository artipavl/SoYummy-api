const express = require("express");
const { favorites: controllers } = require("../../controllers");
const { isValidId, authenticate } = require("../../middlewares");

const router = express.Router();

router
  .get("/", authenticate, controllers.getAllFavorite)

  .patch("/:id", authenticate, isValidId, controllers.addFavorite)

  .put("/:id", authenticate, isValidId, controllers.removeFavorite);

module.exports = router;
