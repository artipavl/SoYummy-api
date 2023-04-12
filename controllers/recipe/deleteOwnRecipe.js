const { HttpError } = require("../../helpers");
const {
  recipe: { Recipe },
} = require("../../models");

const deleteOwnRecipe = async (request, response) => {
  const { id } = request.params;
  const { _id: owner } = request.user;

  const result = await Recipe.findOneAndRemove({ _id: id, owner });

  if (result === null) {
    throw HttpError(404, "Not found");
  }

  response.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: {
      result,
    },
  });
};

module.exports = deleteOwnRecipe;
