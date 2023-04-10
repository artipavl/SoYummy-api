const validateBody = require("./validateBody");
const authenticate = require("./authenticate");
const isValidId = require("./isValidId");
const passport = require("./google-authenticate");
const uploadCloud = require("./cloudinarySender");

module.exports = {
  validateBody,
  authenticate,
  isValidId,
  passport,
  uploadCloud,
};
