const Joi = require("joi");
const { Schema, model } = require("mongoose");

const handleMongooseError = require("../helpers/handleMongooseError");

const timeRegExp = /^\d+$/;

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Set title for recipe"],
    },
    category: {
      type: String,
      required: [true, "Set category for recipe"],
      enum: [
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
      ],
    },
    area: {
      type: String,
      required: [true, "Set area for recipe"],
    },
    instructions: {
      type: String,
      required: [true, "Set instructions for recipe"],
    },
    description: {
      type: String,
      required: [true, "Set description for recipe"],
    },
    thumb: {
      type: String,
      required: true,
    },
    preview: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      match: timeRegExp,
      required: true,
    },

    popularity: {
      type: Number,
      default: 0,
    },
    favorites: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "user",
        },
      ],
    },
    likes: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "user",
        },
      ],
    },
    youtube: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    ingredients: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "ingredient",
          required: true,
        },
      ],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

recipeSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  title: Joi.string().required(),
  category: Joi.string().required(),
  area: Joi.string().required(),
  instructions: Joi.string().required(),
  description: Joi.string().required(),
  thumb: Joi.string().required(),
  preview: Joi.string().required(),
  time: Joi.string().required().pattern(timeRegExp),
  youtube: Joi.string().required(),
  tags: Joi.array().items(Joi.string()),
  ingredients: Joi.array().items(Joi.string()).required(),
});

const schemas = { addSchema };

const recipe = model("recipes", recipeSchema);

module.exports = {
  schemas,
  recipe,
};
