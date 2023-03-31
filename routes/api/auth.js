const express = require("express");
const { auth: controllers } = require("../../controllers");
const { validateBody } = require("../../middlewares");
const {
	auth: { schemas },
} = require("../../models");

const router = express.Router();

router.post(
	"/register",
	validateBody(schemas.registerSchema),
	controllers.registerUser
);
router.post("/login", validateBody(schemas.loginSchema), controllers.loginUser);

module.exports = router;
