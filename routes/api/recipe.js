const express = require("express");

const router = express.Router();

const { recipe } = require("../../controllers");

router.get("/category-list", recipe.categoryList);

module.exports = router;
