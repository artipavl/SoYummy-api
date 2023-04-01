const {
  auth: { User },
} = require("../../models");
const { HttpError } = require("../../helpers");

const logoutUser = async (req, res, next) => {
  const { _id: userId } = req.user;
  const token = "";
  const user = await User.findByIdAndUpdate(userId, { token });
  if (!user) {
    throw HttpError(401, "User not authorized");
  }
  res.json({
    code: 200,
    status: "Success",
  });
};
module.exports = logoutUser;
