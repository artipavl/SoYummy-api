const { Ingredient } = require("../../models");
const { HttpError } = require("../../helpers");

const allIngredients = async (req, res) => {
  const result = await Ingredient.find();

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = allIngredients;
