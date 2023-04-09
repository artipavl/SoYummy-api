const express = require("express");
const { auth: controllers } = require("../../controllers");
const { validateBody, authenticate, passport } = require("../../middlewares");
const {
  auth: { schemas },
} = require("../../models");
const uploadCloud = require("../../middlewares/cloudinarySender");

const router = express.Router();

const cloudOptions = {
  fieldname: "avatar",
  destFolder: "avatars",
  transformation: {
    width: 100,
    height: 100,
    crop: "thumb",
    gravity: "auto",
    zoom: 0.75,
  },
};

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

router.patch(
  "/update-user",
  authenticate,
  uploadCloud(cloudOptions),
  validateBody(schemas.updateUserSchema),
  controllers.updateUser
);

module.exports = router;
