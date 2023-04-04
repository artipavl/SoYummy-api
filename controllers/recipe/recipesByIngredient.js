const { recipe } = require("../../models");
const { ingredient } = require("../../models");

const { HttpError } = require("../../helpers");

const recipesByIngredient = async (req, res) => {
  
  const { ttl } = req.query;
  const { page = 1, limit = 6 } = req.query;
  const skip = (page - 1) * limit;
 
  const ingredientId = await ingredient.find({ ttl: ttl  }, { _id: 1 });
  
  const result = await recipe.find({ "ingredients.id": ingredientId },"-createdAt -updatedAt",
    { skip, limit });
  
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

module.exports = recipesByIngredient