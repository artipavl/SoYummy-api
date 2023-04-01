const { ctrlWrapper } = require("../../helpers");

const verifyEmail = require("./verifyEmail");
const resendVerifyEmail = require("./resendVerifyEmail");
const subscribed = require("./subscribe");
module.exports = {
	verifyEmail: ctrlWrapper(verifyEmail),
	resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
	subscribed: ctrlWrapper(subscribed),
};
