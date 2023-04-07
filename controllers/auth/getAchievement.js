const {
  recipe: { Recipe },
} = require("../../models");

const { HttpError, getDays } = require("../../helpers");

const getAchievement = async (req, res) => {
  const { name, createdAt, _id: userId } = req.user;

  const countDay = getDays(createdAt);

  const recipes = await Recipe.find({
    $or: [{ owner: userId }, { favorites: userId }],
  });

  if (!recipes) {
    throw HttpError(404, "Not found");
  }

  const allRecipes = recipes.reduce(
    (obj, item) => {
      if (String(item.owner) === String(userId)) {
        obj.owner += 1;
      }
      if (item.favorites.includes(userId)) {
        obj.favorites += 1;
      }

      return obj;
    },
    { owner: 0, favorites: 0 }
  );

  res.status(200).json({
    code: 200,
    status: "Success",
    data: {
      name,
      annexedDays: countDay,
      ownCount: allRecipes.owner,
      favoritesCount: allRecipes.favorites,
    },
  });
};

module.exports = getAchievement;
