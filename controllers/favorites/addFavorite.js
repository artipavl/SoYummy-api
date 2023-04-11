const { HttpError } = require("../../helpers");
const {
  recipe: { Recipe },
} = require("../../models");

const addFavorite = async (req, res) => {
  const { id } = req.params;

  const { _id: userId } = req.user;

  const recipe = await Recipe.findById(id);

  if (String(recipe.owner) === String(userId)) {
    throw HttpError(409, "You can't add your own recipe to favorites");
  }

  for (const ownerId of recipe.favorites) {
    if (String(ownerId) === String(userId)) {
      throw HttpError(
        409,
        `The recipe "${recipe.title}" is already added to your favorites`
      );
    }
  }

  const favoriteRecipe = await Recipe.updateOne(
    { _id: id },
    {
      $push: { favorites: userId },
    },
    { new: true }
  );

  if (!favoriteRecipe) {
    throw HttpError(400, `Unable to add recipe "${recipe.title}" to favorites`);
  }

  res.json({
    code: 200,
    status: "success",
    message: `The recipe "${recipe.title}" successfully added to favorites`,
  });
};

module.exports = addFavorite;
