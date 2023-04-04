const { ctrlWrapper } = require("../../helpers");
const updateUser = require("./updateController");

module.exports = {
  updateUser: ctrlWrapper(updateUser),
};
