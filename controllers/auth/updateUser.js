const { HttpError } = require("../../helpers");
const {
  auth: { User },
} = require("../../models");

const updateUser = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { name } = req.body;
  let avatarURL;

  if (!name && !req.file) {
    throw HttpError(
      400,
      "Missing fields! You need to provide at least one field to proceed"
    );
  }

  if (req.file) {
    avatarURL = req.file.path;
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      name,
      avatarURL,
    },
    { new: true, projection: { name: 1, email: 1, avatarURL: 1, token: 1 } }
  );
  res.json({
    code: 200,
    status: "Success",
    data: { user: updatedUser },
  });
};
module.exports = updateUser;
