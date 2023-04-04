const { recipe } = require('../../models');

const allRecipes = async (request, response) => {
  const result = await recipe.find();
  response.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = allRecipes


