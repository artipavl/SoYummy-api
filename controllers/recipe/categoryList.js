const {
  recipe: { Recipe },
} = require("../../models");

const categoryList = async (req, res) => {
  const result = await Recipe.distinct("category");

  res.json({
    status: "success",
    code: 200,
    data: { result },
  });
};

module.exports = categoryList;
