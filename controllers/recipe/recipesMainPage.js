const { recipe } = require("../../models");

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

  const DISH_PER_CATEGORY = 4;

  const dishesByCategory = {};
  let dishesArray = [];

  for (const category of CATEGORIES) {
    const dishes = await recipe.find({ category });
    if (dishes) {
      dishesArray = dishes.slice(0, Math.min(dishes.length, DISH_PER_CATEGORY));
    } else {
      dishesArray = [];
    }
    dishesByCategory[category] = dishesArray;
  }

  response.json({
    status: "success",
    code: 200,
    data: {
      dishesByCategory,
    },
  });
};

module.exports = recipesMainPage;
