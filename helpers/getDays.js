const getDays = (createDay) => {
	const day = 1000 * 60 * 60 * 24;

	const countDay = Math.round((new Date() - createDay) / day);
	return countDay;
};

module.exports = getDays;
