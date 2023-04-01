const {
  auth: { User },
} = require("../../models");
const { HttpError } = require("../../helpers");

const getCurrentUser = async (req, res, next) => {
  const { _id: userId } = req.user;
  const currentUser = await User.findById(userId, {
    _id: 1,
    name: 1,
    email: 1,
    avatarURL: 1,
    token: 1,
  });
  if (!currentUser) {
    throw HttpError(400, "User not found");
  }
  res.json({
    code: 200,
    status: "Success",
    data: { user: currentUser },
  });
};
module.exports = getCurrentUser;
