const express = require("express");
const { auth: controllers } = require("../../controllers");
const {
  validateBody,
  authenticate,
  passport,
  uploadCloud,
} = require("../../middlewares");
const {
  auth: { schemas },
} = require("../../models");

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

router
  .get(
    "/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
  )

  .get(
    "/google/callback",
    passport.authenticate("google", { session: false }),
    controllers.googleAuth
  )

  .post(
    "/register",
    validateBody(schemas.registerSchema),
    controllers.registerUser
  )
  .post("/login", validateBody(schemas.loginSchema), controllers.loginUser)

  .get("/current", authenticate, controllers.getCurrentUser)

  .get("/current/achievement", authenticate, controllers.getAchievement)

  .post("/logout", authenticate, controllers.logoutUser)

  .patch(
    "/update-user",
    authenticate,
    uploadCloud(cloudOptions),
    validateBody(schemas.updateUserSchema),
    controllers.updateUser
  );

module.exports = router;
