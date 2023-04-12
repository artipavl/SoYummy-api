const {
  auth: { User },
} = require("../../models");
const { HttpError } = require("../../helpers");

const addIngredients = async (req, res) => {
  const { _id: userId } = req.user;

  const user = await User.findByIdAndUpdate(userId, { new: true });

  for (const ingredient of user.shoppingList) {
    if (
      String(ingredient.ingredientId) === req.body.ingredientId &&
      String(ingredient.recipeId) === req.body.recipeId
    ) {
      throw HttpError(
        400,
        "This ingredient is already added to your shoppinglist"
      );
    }
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
