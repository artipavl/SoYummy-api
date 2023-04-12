const {
  recipe: { Recipe },
} = require("../../models");

const takeOwnRecipes = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Recipe.find({ owner }, "-createdAt -updatedAt");

  res.json({
    status: "success",
    code: 200,
    data: {
      total: result.length,
      result,
    },
  });
};

module.exports = takeOwnRecipes;
