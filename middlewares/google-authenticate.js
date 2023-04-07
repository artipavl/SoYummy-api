const passport = require("passport");
const { Strategy } = require("passport-google-oauth2");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const {
  auth: { User },
} = require("../models");
const { sendEmail } = require("../helpers");

const { BASE_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

const googleParams = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${BASE_URL}/api/users/google/callback`,
  passReqToCallback: true,
};

const googleCallback = async (req, accecToken, refreshToken, profile, done) => {
  try {
    const { email, displayName, picture } = profile;
    const user = await User.findOne({ email });

    if (user) {
      return done(null, user);
    }

    const password = await bcrypt.hash(uuidv4(), 10);
    const avatarURL = picture;
    const verificationCode = uuidv4();

    const newUser = await User.create({
      email,
      password,
      name: displayName,
      avatarURL,
      verificationCode,
    });

    const verifyEmail = {
      to: email,
      subject: "Verification email",
      html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationCode}">Click here to verification email</a>`,
    };

    await sendEmail(verifyEmail);

    done(null, newUser);
  } catch (error) {
    done(error, false);
  }
};

const googleStrategy = new Strategy(googleParams, googleCallback);
passport.use("google", googleStrategy);

module.exports = passport;
