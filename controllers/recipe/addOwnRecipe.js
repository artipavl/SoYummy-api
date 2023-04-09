const cloudinary = require("cloudinary").v2;

const {
  recipe: { Recipe },
} = require("../../models");

const addOwnRecipe = async (req, res) => {
  const { _id: owner } = req.user;
  const thumb = req.file.path;
  const preview = cloudinary.url(req.file.filename, {
    transformation: ["thumbnail"],
  });

  const result = await Recipe.create({ ...req.body, thumb, preview, owner });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = addOwnRecipe;
