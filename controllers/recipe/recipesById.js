const { recipe } = require("../../models");

const { HttpError } = require("../../helpers");

const recipesById = async (request, response) => {
  const { id } = request.params;
  const result = await recipe.findById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  response.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = recipesById;

