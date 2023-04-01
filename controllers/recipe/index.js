const { ctrlWrapper } = require("../../helpers");

const categoryList = require("./categoryList");

module.exports = {
  categoryList: ctrlWrapper(categoryList),
};
