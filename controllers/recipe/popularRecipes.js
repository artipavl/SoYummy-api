const {
  recipe: { Recipe },
} = require("../../models");

const popularRecipes = async (req, res) => {
  const result = await Recipe.aggregate([
    {
      $project: {
        title: 1,
        description: 1,
        preview: 1,
        favorites: 1,
        favorites_count: { $size: { $ifNull: ["$favorites", []] } },
      },
    },
    { $sort: { favorites_count: -1 } },
  ]).limit(4);

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = popularRecipes;
