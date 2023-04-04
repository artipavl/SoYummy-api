const { recipe } = require("../../models");

const recipesByCategory = async (request, response) => {
	const { category } = request.params;

	const { page = 1, limit = 8 } = request.query;
	const skip = (page - 1) * limit;

	const normalizedCategory =
		category[0].toUpperCase() + category.slice(1).toLowerCase();

	const result = await recipe.find(
		{ category: normalizedCategory },
		"title category thumb preview",
		{ skip, limit }
	);
	const total = await recipe
		.find({ category: normalizedCategory })
		.countDocuments();

	response.json({
		status: "success",
		code: 200,
		data: {
			total,
			result,
		},
	});
};

module.exports = recipesByCategory;
