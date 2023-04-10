const { HttpError } = require("../../helpers");
const {
  recipe: { Recipe },
} = require("../../models");

const removeFavorite = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;

  const favoriteRecipe = await Recipe.findOne({ _id: id, favorites: userId });

  if (!favoriteRecipe) {
    throw HttpError(400, `The recipe not found`);
  }

  const result = await Recipe.updateOne(
    { _id: id },
    { $pull: { favorites: userId } },
    { new: true }
  );

  if (!result) {
    throw HttpError(400, `Unable to remove recipe "${favoriteRecipe.title}"`);
  }

  res.status(200).json({
    code: 200,
    status: "success",
    message: `The recipe "${favoriteRecipe.title}" successfully removed `,
  });
};

module.exports = removeFavorite;
