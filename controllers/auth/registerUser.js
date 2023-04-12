const {
  auth: { User },
} = require("../../models");
const { HttpError, sendEmail } = require("../../helpers");
const bcrypt = require("bcryptjs");

const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");

const { FRONTEND_URL } = process.env;

const registerUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const verificationCode = uuidv4();
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationCode,
  });

  if (!newUser) {
    throw HttpError(400, "Unable to save on database");
  }

  const verifyEmail = {
    to: email,
    subject: "Verification email",
    html: `<a target="_blank" href="${FRONTEND_URL}/verification/${verificationCode}">Click here to verification email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    code: 201,
    message: "success",
    data: { user: { name: newUser.name, email: newUser.email, avatarURL } },
  });
};

module.exports = registerUser;
