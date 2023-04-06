const {
  auth: { User },
} = require("../../models");
const jwt = require("jsonwebtoken");

const { SECRET_KEY, FRONTEND_URL } = process.env;

const googleAuth = async (req, res) => {
  const { _id: userId } = req.user;

  const payload = {
    id: userId,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await User.findByIdAndUpdate(userId, { token });

  res.redirect(`${FRONTEND_URL}?token${token}`);
};

module.exports = googleAuth;
