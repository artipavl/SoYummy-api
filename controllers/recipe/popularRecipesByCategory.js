const { recipe } = require("../../models");

const popularRecipesByCategory = async (req, res) => {
  const { category } = req.params;

  const normalizedCategory =
    category[0].toUpperCase() + category.slice(1).toLowerCase();

  const result = await recipe.find(
    { category: normalizedCategory },
    {
      title: 1,
      category: 1,
      description: 1,
      preview: 1,
      favorites: 1,
    }
  );
  result
    .sort((a, b) => b.favorites.length - a.favorites.length)
    .splice(4, result.length);

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = popularRecipesByCategory;
