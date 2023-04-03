const {
  auth: { User },
} = require("../../models");
const { HttpError } = require("../../helpers");

const removeIngredients = async (req, res) => {
  const { _id: userId } = req.user;
  const user = await User.findById(userId);

  if (!user.shoppingList) {
    throw HttpError(400, "No list ingridients");
  }

  const deletedIngredients = req.body;

  const filteredList = user.shoppingList.filter((item) => {
    return !deletedIngredients.some((deletedItem) => {
      return deletedItem._id.toString() === item._id.toString();
    });
  });

  user.shoppingList = filteredList;
  const updatedUser = await user.save();

  res.json({
    code: 200,
    status: "Success",
    data: updatedUser.shoppingList,
  });
};

module.exports = removeIngredients;
