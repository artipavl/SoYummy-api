const getUserRecipeCount = (resipesList, id) => {
	return resipesList.reduce(
		(obj, item) => {
			if (String(item.owner) === String(id)) {
				obj.owner += 1;
			}
			if (item.favorites.includes(id)) {
				obj.favorites += 1;
			}

			return obj;
		},
		{ owner: 0, favorites: 0 }
	);
};
module.exports = getUserRecipeCount;
