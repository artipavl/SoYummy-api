const { recipe } = require("../../models");

const addOwnRecipe = async (request, response) => {
  const { _id: owner } = request.user;
  const result = await recipe.create({ ...request.body, owner });
  response.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = addOwnRecipe;

