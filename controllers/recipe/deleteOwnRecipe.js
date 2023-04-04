const { recipe } = require('../../models');
const { HttpError } = require("../../helpers");

const deleteOwnRecipe = async (request, response) => {
    const { id } = request.params;
    const { _id: owner } = request.user;
    if (!owner) {
      throw HttpError(404, "Not found the owner");
    }
    const result = await recipe.findByIdAndRemove(id);
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


