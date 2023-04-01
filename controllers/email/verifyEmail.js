const {
	auth: { User },
} = require("../../models");
const { HttpError } = require("../../helpers");

const verifyEmail = async (req, res) => {
	const { verificationCode } = req.params;
	const user = await User.findOne({ verificationCode });
	if (!user) {
		throw HttpError(401, "Email not found");
	}
	await User.findByIdAndUpdate(user._id, {
		verify: true,
		verificationCode: "",
	});
	res.json({
		code: 200,
		status: "success",
		message: "Verify success",
	});
};

module.exports = verifyEmail;
