const { HttpError } = require("../../helpers");
const { recipe } = require("../../models");

const getAllFavorite = async (req, res) => {
	const { _id: userId } = req.user;

	const result = await recipe.find({ favorites: userId });
	if (!result) {
		throw new HttpError(404, "Not found");
	}
	res.status(200).json({
		code: 200,
		status: "success",
		data: {
			result,
		},
	});
};

module.exports = getAllFavorite;
