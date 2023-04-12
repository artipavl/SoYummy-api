const {
  auth: { User },
} = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { HttpError } = require("../../helpers");
const { SECRET_KEY } = process.env;

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const payload = {
    id: user.id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    code: 200,
    status: "Success",
    data: {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatarURL: user.avatarURL,
        token,
        shoppingList: user.shoppingList,
      },
    },
  });
};

module.exports = loginUser;
