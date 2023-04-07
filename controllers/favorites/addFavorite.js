const { HttpError } = require("../../helpers");
const {
  recipe: { Recipe },
} = require("../../models");

const addFavorite = async (req, res) => {
  const { id } = req.params;

  const { _id: userId } = req.user;

  const result = await Recipe.findOne({
    _id: id,

    owner: userId,
  });

  if (result) {
    throw HttpError(409, "user is owner");
  }
  const favoriteRecipe = await Recipe.updateOne(
    { _id: id },
    {
      $push: { favorites: userId },
    },
    { new: true }
  );

  if (!favoriteRecipe) {
    throw HttpError(400);
  }

  res.status(200).json({
    code: 200,
    status: "success",
    message: `Recipe with id ${id} added to favorite success`,
  });
};

module.exports = addFavorite;
