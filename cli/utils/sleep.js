/*
 * Return a promise that resolves after timeout
 */

module.exports = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};
