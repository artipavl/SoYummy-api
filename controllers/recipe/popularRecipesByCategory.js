const {
  recipe: { Recipe },
} = require("../../models");

const popularRecipesByCategory = async (req, res) => {
  const { category } = req.params;

  const { page = 1, limit = 8 } = req.query;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const normalizedCategory =
    category[0].toUpperCase() + category.slice(1).toLowerCase();

  const recipes = await Recipe.find(
    { category: normalizedCategory },
    {
      title: 1,
      category: 1,
      description: 1,
      preview: 1,
      favorites: 1,
    }
  );
  const result = recipes
    .sort((a, b) => b.favorites.length - a.favorites.length)
    .slice(startIndex, endIndex);

  const total = await Recipe.find({
    category: normalizedCategory,
  }).countDocuments();

  res.json({
    status: "success",
    code: 200,
    data: {
      total,
      result,
    },
  });
};

module.exports = popularRecipesByCategory;
