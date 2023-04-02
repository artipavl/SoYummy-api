const express = require("express");

const { favorites } = require("../../controllers");
const { isValidId, authenticate } = require("../../middlewares");
const router = express.Router();

router.get("/", authenticate, favorites.getAllFavorite);

router.patch("/:id", authenticate, isValidId, favorites.addFavorite);

router.put("/:id", authenticate, isValidId, favorites.removeFavorite);

module.exports = router;
