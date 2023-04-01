const {
	auth: { User },
} = require("../../models");
const { HttpError, sendEmail } = require("../../helpers");
const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
	const { email } = req.body;
	const user = await User.findOne({ email });

	if (!user) {
		throw HttpError(400, "Missing required field email");
	}
	if (user.verify) {
		throw HttpError(400, "Email already verify");
	}
	const verifyEmail = {
		to: email,
		subject: "Verification email",
		html: `<a target="_blanc" href="${BASE_URL}/api/auth/verify/${user.verificationCode}">Click here to verification email</a>`,
	};
	await sendEmail(verifyEmail);
	res.json({
		code: 200,
		status: "success",
		message: "Verify email send success",
	});
};
module.exports = resendVerifyEmail;
