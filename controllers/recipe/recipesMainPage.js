const { recipe } = require("../../models");

const recipesMainPage = async (request, response) => {
    const allArray = await recipe.find();

const arrayCategories = allArray.map(arr => arr.category)

const sorted = [...arrayCategories].sort((a, b) => a.localeCompare(b))

    // const sortedArray = [...allArray].sort((a, b) => a - b)

    response.json({
      status: "success",
      code: 200,
      data: {
        sorted,
      },
    });
};

module.exports =  recipesMainPage;


// module.exports = {
//   emailTokenExpiresIn: '3d',
//   accessTokenExpiresIn: '1d',
//   refreshTokenExpiresIn: '1w',
//   popularRecipesLimit: 10,
//   DEFAULT_RECIPE_IMG_URL:
//     'https://res.cloudinary.com/dcpsasqw8/image/upload/v1678474415/assets/own_recipes_photos/dafault.png',
//   BASE_INGREDIENT_IMG_URL: 'https://www.themealdb.com/images/ingredients/',
//   DEFAULT_AVATAR_iMG_URL:
//     'https://res.cloudinary.com/dcpsasqw8/image/upload/v1678720730/assets/avatars/defaul_avatar.png',
//   FAV_MEALS_PER_PAGE: 4,
//   themealdp_API_ID_LENGTH: 7,
// }


// const { PopularMeals } = require('../../models/popularMeals');
// const { popularRecipesLimit } = require('../../config/defaults');

// const getPopularRecipes = async (req, res) => {
//   const data = await PopularMeals.find(
//     {
//       idMeal: { $exists: true },
//       $expr: { $lt: [{ $strLenCP: '$idMeal' }, 6] },
//     },
//     '-_id -users'
//   )
//     .sort({ users: 1 })
//     .limit(popularRecipesLimit);

//   res.json({ meals: data });
// };

// module.exports = getPopularRecipes;




