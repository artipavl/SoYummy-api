const { recipe } = require("../../models");

const { HttpError } = require("../../helpers");

const recipesByCategory = async (request, response) => {
  const { category } = request.params;

  const { page = 1, limit = 8 } = request.query;
  const skip = (page - 1) * limit;
  const recipes = await recipe.find(
    { category },
    "title category thumb preview",
    { skip, limit }
  );

  if (!recipes) {
    throw HttpError(404, "Not found");
  }
  response.json({
    status: "success",
    code: 200,
    data: {
      recipes,
    },
  });
};

module.exports = recipesByCategory;
