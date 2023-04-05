const { recipe, ingredient: Ingredient } = require("../../models");

const searchRecipe = async (req, res) => {
	const { page = 1, limit = 6, title = "", ingredient = "" } = req.query;
	const skip = (page - 1) * limit;

	const type = title ? "Title" : "Ingredients";

	let result;
	let total;

	if (type === "Title") {
		result = await recipe.find(
			{ title: { $regex: title, $options: "i" } },
			"-createdAt -updatedAt",
			{ skip, limit }
		);

		total = await recipe
			.find({ title: { $regex: title, $options: "i" } })
			.countDocuments();
	}

	if (type === "Ingredients") {
		const { _id: ingredientId } = await Ingredient.findOne({
			ttl: { $regex: ingredient, $options: "i" },
		});

		result = await recipe.find(
			{ "ingredients.id": ingredientId },
			"-createdAt -updatedAt",
			{ skip, limit }
		);

		total = await recipe
			.find({ "ingredients.id": ingredientId })
			.countDocuments();
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

module.exports = searchRecipe;
