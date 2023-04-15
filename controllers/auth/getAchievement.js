const {
	recipe: { Recipe },
	auth: { User },
} = require("../../models");

const { HttpError, getDays, getUserRecipeCount } = require("../../helpers");

const getAchievement = async (req, res) => {
	const { name, createdAt, _id: userId } = req.user;

	const countDay = getDays(createdAt);

	const recipes = await Recipe.find({
		$or: [{ owner: userId }, { favorites: userId }],
	});

	if (!recipes) {
		throw HttpError(404, "Not found");
	}

	const allRecipes = getUserRecipeCount(recipes, userId);
	const achievements = {
		annexedDays: countDay,
		ownCount: allRecipes.owner,
		favoritesCount: allRecipes.favorites,
	};
	await User.findByIdAndUpdate(userId, { achievements });

	res.status(200).json({
		code: 200,
		status: "Success",
		data: {
			user: {
				name,
				achievements,
			},
		},
	});
};

module.exports = getAchievement;
