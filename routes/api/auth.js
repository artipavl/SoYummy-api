const express = require("express");
const { auth: controllers } = require("../../controllers");
const { validateBody, authenticate } = require("../../middlewares");
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

router.get("/current", authenticate, controllers.getCurrentUser);

router.post("/logout", authenticate, controllers.logoutUser);

module.exports = router;
