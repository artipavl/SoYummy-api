const express = require("express");
const { auth: controllers } = require("../../controllers");
const { validateBody, authenticate, passport } = require("../../middlewares");
const {
  auth: { schemas },
} = require("../../models");

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  controllers.googleAuth
);

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  controllers.registerUser
);
router.post("/login", validateBody(schemas.loginSchema), controllers.loginUser);

router.get("/current", authenticate, controllers.getCurrentUser);

router.get("/current/achievement", authenticate, controllers.getAchievement);

router.post("/logout", authenticate, controllers.logoutUser);

module.exports = router;
