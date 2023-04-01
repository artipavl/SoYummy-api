const express = require("express");
const { email: controllers } = require("../../controllers");
const { validateBody } = require("../../middlewares");
const {
	auth: { schemas },
} = require("../../models");

const router = express.Router();

router.get("/verify/:verificationCode", controllers.verifyEmail);

router.post(
	"/verify",
	validateBody(schemas.emailSchema),
	controllers.resendVerifyEmail
);

router.post(
	"/subscribe",

	validateBody(schemas.emailSchema),
	controllers.subscribed
);
module.exports = router;
