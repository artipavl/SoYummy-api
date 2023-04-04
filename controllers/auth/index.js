const { ctrlWrapper } = require("../../helpers");
const registerUser = require("./registerUser");
const loginUser = require("./loginUser");
const getCurrentUser = require("./getCurrentUser");
const logoutUser = require("./logoutUser");
const getAchievement = require("./getAchievement");

module.exports = {
	registerUser: ctrlWrapper(registerUser),
	loginUser: ctrlWrapper(loginUser),
	getCurrentUser: ctrlWrapper(getCurrentUser),
	logoutUser: ctrlWrapper(logoutUser),
	getAchievement: ctrlWrapper(getAchievement),
};
