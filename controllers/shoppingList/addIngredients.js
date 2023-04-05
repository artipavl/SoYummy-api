const {
	auth: { User },
} = require("../../models");
const { HttpError } = require("../../helpers");

const addIngredients = async (req, res) => {
	const { _id: userId } = req.user;
	const user = await User.findByIdAndUpdate(userId, { new: true });
	if (!user.shoppingList) {
		throw HttpError(400, "No list ingredients");
	}
	user.shoppingList.push(req.body);
	const updatedUser = await user.save();

	res.json({
    code: 200,
    status: "Success",
    data: {
      total: updatedUser.shoppingList.length,
      result: updatedUser.shoppingList,
    },
  });
};
module.exports = addIngredients;
