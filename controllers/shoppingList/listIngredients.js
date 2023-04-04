const {
  auth: { User },
} = require("../../models");
const { HttpError } = require("../../helpers");

const listIngredients = async (req, res) => {
  const { _id: userId } = req.user;
  const { shoppingList } = await User.findById(userId);

  if (!shoppingList) {
    throw HttpError(400, "No list ingredients");
  }

  res.json({
    code: 200,
    status: "Success",
    data: {
      result: shoppingList,
    },
  });
};

module.exports = listIngredients;
