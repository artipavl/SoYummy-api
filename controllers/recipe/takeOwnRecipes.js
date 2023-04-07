const {
  recipe: { Recipe },
} = require("../../models");

const takeOwnRecipes = async (request, response) => {
  const { _id: owner } = request.user;
  const result = await Recipe.find({ owner }, "-createdAt -updatedAt");
  response.json({
    status: "success",
    code: 200,
    data: {
      total: result.length,
      result,
    },
  });
};

module.exports = takeOwnRecipes;
