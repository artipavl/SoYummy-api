const handleMangooseError = (error, data, next) => {
  const { name, code } = error;
  const status = (name === "MangoServerError" && code === 11000) ? 400 : 409;
  error.status = status;
  next();
};

module.exports = handleMangooseError;
