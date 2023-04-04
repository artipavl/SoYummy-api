const { recipe } = require("../../models");

const { HttpError } = require("../../helpers");

const recipeByTitle = async (req, res) => {
	const { title } = req.params;
	const { page = 1, limit = 10 } = req.query;

	const skip = (page - 1) * limit;
	const result = await recipe.find(
		{ title: { $regex: title } },
		"-createdAt -updatedAt",
		{
			skip,
			limit,
		}
	);
	const total = await recipe
		.find({ title: { $regex: title } })
		.countDocuments();

	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.json({
		status: "success",
		code: 200,
		data: {
			total,
			result,
		},
	});
};

module.exports = recipeByTitle;
