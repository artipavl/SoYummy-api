const { HttpError } = require("../../helpers");
const {
  recipe: { Recipe },
} = require("../../models");

const getAllFavorite = async (req, res) => {
  const { _id: userId } = req.user;
  const { page = "1", limit = "10" } = req.query;
  const skip = (page - 1) * limit;
  const result = await Recipe.find({ favorites: userId }, "", { skip, limit });
  const total = await Recipe.find({ favorites: userId }).countDocuments();

  if (!result) {
    throw new HttpError(404, "Not found");
  }
  res.status(200).json({
    code: 200,
    status: "success",
    data: {
      total,
      result,
    },
  });
};

module.exports = getAllFavorite;
