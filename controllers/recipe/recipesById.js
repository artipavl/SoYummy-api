const { mongoose } = require("mongoose");
const {
  recipe: { Recipe },
} = require("../../models");
const { HttpError } = require("../../helpers");

const recipesById = async (req, res) => {
  const { id } = req.params;

  const result = await Recipe.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "ingredients",
        localField: "ingredients.id",
        foreignField: "_id",
        as: "ingr_nfo",
      },
    },
    {
      $set: {
        ingredients: {
          $map: {
            input: "$ingredients",
            in: {
              $mergeObjects: [
                "$$this",
                {
                  $arrayElemAt: [
                    "$ingr_nfo",
                    {
                      $indexOfArray: ["$ingr_nfo._id", "$$this.id"],
                    },
                  ],
                },
              ],
            },
          },
        },
      },
    },
    {
      $unset: ["ingr_nfo", "ingredients.id"],
    },
  ]);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = recipesById;
