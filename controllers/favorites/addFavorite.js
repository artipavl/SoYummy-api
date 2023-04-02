const { HttpError } = require("../../helpers");
const { recipe } = require("../../models");

const addFavorite = async (req, res) => {
	const { id } = req.params;

	const { _id: userId } = req.user;

	const result = await recipe.findOne({ _id: id, favorites: userId });

	if (result) {
		throw HttpError(409, "Recipe already favorite");
	}

	const favoriteRecipe = await recipe.updateOne(
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
