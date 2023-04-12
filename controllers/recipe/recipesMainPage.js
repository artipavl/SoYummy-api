const {
  recipe: { Recipe, CATEGORIES },
} = require("../../models");

const recipesMainPage = async (req, res) => {
  const dishesArray = [];

  const skip = 0;
  const limit = 4;

  for (const category of CATEGORIES) {
    const dishes = await Recipe.find({ category }, "-createdAt -updatedAt", {
      skip,
      limit,
    });
    dishesArray.push({ category, recipes: dishes });
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      result: dishesArray,
    },
  });
};

module.exports = recipesMainPage;
