const {
  recipe: { Recipe },
} = require("../../models");

const popularRecipesByCategory = async (req, res) => {
  const { category } = req.params;

  const { page = 1, limit = 8 } = req.query;
  const skip = (page - 1) * limit;

  const normalizedCategory =
    category[0].toUpperCase() + category.slice(1).toLowerCase();

  const result = await Recipe.aggregate([
    { $match: { category: normalizedCategory } },
    {
      $project: {
        category: 1,
        title: 1,
        description: 1,
        preview: 1,
        favorites: 1,
        favorites_count: { $size: { $ifNull: ["$favorites", []] } },
      },
    },
    { $sort: { favorites_count: -1 } },
    { $skip: skip },
    { $limit: Number(limit) },
  ]);

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
