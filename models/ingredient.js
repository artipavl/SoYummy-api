const { Schema, model } = require('mongoose');
const { handleMongooseError } = require("../helpers");

const ingredientSchema = new Schema(
  {
    ttl: {
      type: String,
      require: [true],
      minlength: 3,
    },
    decs: {
      type: String,
      require: [true],
    },
    t: {
      type: String,
      require: [true],
    },

    thb: {
      type: String,
      require: [true],
    },
  },
  { versionKey: false, timeStamps: true }
);

ingredientSchema.post("save", handleMongooseError);

const ingredient = model("ingredients", ingredientSchema);

module.exports = { ingredient ,}