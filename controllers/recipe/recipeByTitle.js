const { recipe } = require("../../models");

const { HttpError } = require("../../helpers");

const recipeByTitle = async (req, res) => {
	const { title } = req.query;

	const { page = 1, limit = 6 } = req.query;
	const skip = (page - 1) * limit;
	const result = await recipe.find(
		{ title: { $regex: title, $options: "i" } },
		"-createdAt -updatedAt",
		{ skip, limit }
	);
	if (!result) {
		throw HttpError(404, "Not found");
	}
	const total = await recipe
		.find({ title: { $regex: title } })
		.countDocuments();

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
