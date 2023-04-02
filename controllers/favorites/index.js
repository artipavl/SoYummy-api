const addFavorite = require("./addFavorite");
const getAllFavorite = require("./getAllFavorite");
const removeFavorite = require("./removeFavorite");
const { ctrlWrapper } = require("../../helpers");
module.exports = {
	addFavorite: ctrlWrapper(addFavorite),
	getAllFavorite: ctrlWrapper(getAllFavorite),
	removeFavorite: ctrlWrapper(removeFavorite),
};
