const { recipe } = require("../../models");

const { HttpError } = require("../../helpers");

const recipesByIngredient = async (req, res) => {
  const { ingredientId} = req.params;

 
  const result = await recipe.find({ "ingredient.id": ingredientId });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result
    },
  });
};

module.exports = recipesByIngredient;