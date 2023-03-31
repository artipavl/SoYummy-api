const { ctrlWrapper } = require("../../helpers");
const registerUser = require("./registerUser");
const loginUser = require("./loginUser");

module.exports = {
	registerUser: ctrlWrapper(registerUser),
	loginUser: ctrlWrapper(loginUser),
};
