const {
  recipe: { Recipe },
} = require("../../models");

const takeOwnRecipes = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = "1", limit = "10" } = req.query;
  const skip = (page - 1) * limit;

  const result = await Recipe.find({ owner }, "-createdAt -updatedAt", { skip, limit });

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
