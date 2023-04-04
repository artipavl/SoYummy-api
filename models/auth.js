const Joi = require("joi");
const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const emailRegexp =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "db: Email is required"],
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "db: Password is required"],
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      default: "",
    },
    shoppingList: {
      type: [
        {
          recipeId: {
            type: Schema.Types.ObjectId,
            ref: "recipe",
            required: true,
          },
          ingredientId: {
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
    subscribed: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);
const User = model("User", userSchema);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});
const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

const updateUserSchema = Joi.object({
	name: Joi.string().optional(),
});
const schemas = {
	registerSchema,
	loginSchema,
	emailSchema,
	updateUserSchema,
};

module.exports = {
  User,
  schemas,
};
