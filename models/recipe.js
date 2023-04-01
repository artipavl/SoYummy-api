const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Set name for recipe"],
    },
    category: {
      type: String,
    },
    area: {
        type: String,
      },
    popularity: {
      type: Number,
    },
  },
  { versionKey: false, timestamps: true }
);

recipeSchema.post("save",  handleMongooseError);

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;