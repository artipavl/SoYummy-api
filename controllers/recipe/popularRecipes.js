const {
  recipe: { Recipe },
} = require("../../models");

const popularRecipes = async (req, res) => {
  const result = await Recipe.find(
    {},
    {
      title: 1,
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

module.exports = popularRecipes;
