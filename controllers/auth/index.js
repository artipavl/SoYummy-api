const { ctrlWrapper } = require("../../helpers");
const registerUser = require("./registerUser");
const loginUser = require("./loginUser");
const getCurrentUser = require("./getCurrentUser");
const logoutUser = require("./logoutUser");
const getAchievement = require("./getAchievement");
const googleAuth = require("./googleAuth");
const updateUser = require("./updateController");

module.exports = {
  registerUser: ctrlWrapper(registerUser),
  loginUser: ctrlWrapper(loginUser),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  logoutUser: ctrlWrapper(logoutUser),
  getAchievement: ctrlWrapper(getAchievement),
  googleAuth: ctrlWrapper(googleAuth),
  updateUser: ctrlWrapper(updateUser),
};
