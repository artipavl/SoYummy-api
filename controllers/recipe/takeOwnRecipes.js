const { recipe } = require("../../models");

const takeOwnRecipes = async (request, response) => {
	const { _id: owner } = request.user;
	const result = await recipe.find({ owner }, "-createdAt -updatedAt");
	response.json({
		status: "success",
		code: 200,
		data: {
			total: result.length,
			result,
		},
	});
};

module.exports = takeOwnRecipes;
