const { recipe } = require("../../models");

const { HttpError } = require("../../helpers");

const recipesById = async (request, response) => {
  const { id } = request.params;
  const recipes = await recipe.findById(id);
  if (!recipes) {
    throw HttpError(404, "Not found");
  }
  response.json({
    status: "success",
    code: 200,
    data: {
      recipes,
    },
  });
};

module.exports = recipesById;

