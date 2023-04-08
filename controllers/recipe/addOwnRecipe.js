const {
  recipe: { Recipe },
} = require("../../models");

const addOwnRecipe = async (req, res) => {
  const { _id: owner } = req.user;

  console.log("req.file :", req.file);
  console.log("req.body: ", req.body);

  const thumb = req.file.path;

  const result = await Recipe.create({ ...req.body, thumb, owner });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = addOwnRecipe;
