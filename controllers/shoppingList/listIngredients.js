const { mongoose } = require("mongoose");
const {
	auth: { User },
} = require("../../models");
const { HttpError } = require("../../helpers");

const listIngredients = async (req, res) => {
	const { _id: userId } = req.user;

	// const {shoppingList} = await User.findById(userId);

	const result = await User.aggregate([
		{
			$match: {
				_id: mongoose.Types.ObjectId(userId),
			},
		},
		{
			$lookup: {
				from: "ingredients",
				localField: "shoppingList.ingredientId",
				foreignField: "_id",
				as: "ingr_nfo",
			},
		},
		{
			$set: {
				shoppingList: {
					$map: {
						input: "$shoppingList",
						in: {
							$mergeObjects: [
								"$$this",
								{
									$arrayElemAt: [
										"$ingr_nfo",
										{
											$indexOfArray: ["$ingr_nfo._id", "$$this.ingredientId"],
										},
									],
								},
								{
									_id: "$$this._id",
								},
							],
						},
					},
				},
			},
		},
		{
			$unset: ["ingr_nfo"],
		},
	]);
	console.log(result);
	// if (!result) {
	// 	throw HttpError(400, "No list ingredients");
	// }

	const [ingridients] = result;

	res.json({
		code: 200,
		status: "Success",
		data: {
			total: ingridients.shoppingList.length,
			result: ingridients.shoppingList,
		},
	});
};

module.exports = listIngredients;
