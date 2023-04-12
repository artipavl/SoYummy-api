const {
  auth: { User },
} = require("../../models");
const { HttpError, sendEmail } = require("../../helpers");

const subscribedEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, "Not found user");
  }

  if (user.subscribed) {
    throw HttpError(400, "Already subscribed");
  }

  const subscribedEmail = {
    to: email,
    subject: "Subscribe to news from So_Yummy",
    html: `<h1>Hello, ${user.name}!</h1><p>You are now subscribed to so_yummy's updates and will be the first to receive the latest news and offers</p>`,
  };

  await sendEmail(subscribedEmail);

  await User.findByIdAndUpdate(user._id, {
    subscribed: true,
  });

  res.json({
    code: 200,
    status: "success",
    message: "subscribe to updates successfully",
  });
};

module.exports = subscribedEmail;
