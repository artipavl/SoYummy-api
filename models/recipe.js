const Joi = require("joi");
const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

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
      default: "Worldwide",
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
      delete: "",
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
          id: {
            type: Schema.Types.ObjectId,
            ref: "ingredient",
            required: true,
          },
          measure: {
            type: String,
            required: true,
          },
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
  area: Joi.string().optional(),
  instructions: Joi.string().required(),
  description: Joi.string().required(),
  // thumb: Joi.string().optional(),
  // preview: Joi.string().optional(),
  time: Joi.string().required().pattern(timeRegExp),
  youtube: Joi.string(),
  tags: Joi.array().items(Joi.string()),
  ingredients: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().required(),
        measure: Joi.string().required(),
      })
    )
    .required(),
});

const schemas = { addSchema };

const Recipe = model("Recipe", recipeSchema);

module.exports = {
  schemas,
  Recipe,
};
