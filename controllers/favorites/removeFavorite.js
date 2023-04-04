const { HttpError } = require("../../helpers");
const { recipe } = require("../../models");

const removeFavorite = async (req, res) => {
	const { id } = req.params;

	const { _id: userId } = req.user;

	const favoriteRecipe = await recipe.findOne({ _id: id, favorites: userId });

	if (!favoriteRecipe) {
		throw HttpError(404, "Not found");
	}

	const result = await recipe.updateOne(
		{ _id: id },
		{ $pull: { favorites: userId } },
		{ new: true }
	);

	if (!result) {
		throw HttpError(400);
	}

	res.status(200).json({
		code: 200,
		status: "success",
		message: `Recipe with id ${id} success removed `,
	});
};

module.exports = removeFavorite;
