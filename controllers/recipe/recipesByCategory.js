const { recipe } = require("../../models");

const { HttpError } = require("../../helpers");

const recipesByCategory = async (request, response) => {
  const { category } = request.params;

  const { page = 1, limit = 8 } = request.query;
  const skip = (page - 1) * limit;

  const normalizedCategory =
    category[0].toUpperCase() + category.slice(1).toLowerCase();

  const recipes = await recipe.find(
    { category: normalizedCategory },
    "title category thumb preview",
    { skip, limit }
  );
  console.log(!recipes);

  if (recipes.length === 0) {
    throw HttpError(400, `No recipes found by category ${normalizedCategory}`);
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
