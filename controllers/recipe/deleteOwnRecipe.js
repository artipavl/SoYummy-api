const { recipe } = require('../../models');
const { HttpError } = require("../../helpers");

const deleteOwnRecipe = async (request, response) => {
    const { id } = request.params;
    const result = await recipe.findByIdAndRemove(id);
    if (!result) {
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

module.exports = deleteOwnRecipe

