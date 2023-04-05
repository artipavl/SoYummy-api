const {
  auth: { User },
} = require("../../models");
const { HttpError } = require("../../helpers");

const removeIngredient = async (req, res) => {
  const { _id: userId } = req.user;
  const user = await User.findById(userId);

  if (!user.shoppingList) {
    throw HttpError(400, "No list ingridients");
  }
  const deletedIngredient = req.body;

  const isIdInshoppingList =
    user.shoppingList.findIndex(
      (item) => item._id.toString() === deletedIngredient._id.toString()
    ) !== -1;

  if (!isIdInshoppingList) {
    throw HttpError(400, "Bad request");
  }

  const filteredList = user.shoppingList.filter(
    (item) => item._id.toString() !== deletedIngredient._id.toString()
  );
  user.shoppingList = filteredList;

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

module.exports = removeIngredient;
