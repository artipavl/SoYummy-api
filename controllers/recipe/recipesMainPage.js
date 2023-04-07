const {
  recipe: { Recipe },
} = require("../../models");

const recipesMainPage = async (request, response) => {
  const CATEGORIES = [
    "Beef",
    "Breakfast",
    "Chicken",
    "Dessert",
    "Goat",
    "Lamb",
    "Miscellaneous",
    "Pasta",
    "Pork",
    "Seafood",
    "Side",
    "Starter",
    "Vegan",
    "Vegetarian",
  ];

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

  response.json({
    status: "success",
    code: 200,
    data: {
      result: dishesArray,
    },
  });
};

module.exports = recipesMainPage;
