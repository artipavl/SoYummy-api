const { recipe } = require("../../models");
const { HttpError } = require("../../helpers");

const categoryList = async (req, res) => {
  console.log("result: ");
  const result = await recipe.distinct("category");
  if (!result) {
    throw HttpError(500, "Server error");
  }

  res.json({
    status: "success",
    code: 200,
    data: { result },
  });
};
module.exports = categoryList;
