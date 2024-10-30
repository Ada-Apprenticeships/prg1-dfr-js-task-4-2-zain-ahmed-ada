const fs = require("fs");

function fileExists(filename) {
	return fs.existsSync(filename);
}

function validNumber(value) {
	const regex = /^-?\d+(\.\d+)?$/;
	return regex.test(value);
}

function dataDimensions(dataframe) {
	if (dataframe === undefined || dataframe === "") {
		return [-1, -1];
	}

	result = Array.isArray(dataframe) && dataframe.every((item) => !Array.isArray(item));

	if (result) {
		let totalColumns = dataframe.length;
		return [totalColumns, -1];
	}

	let totalColumns = dataframe.length;
	let totalRows = 0;

	for (let i = 0; i < dataframe.length; i++) {
		totalRows += i;
	}

	return [totalRows, totalColumns];
}

function findTotal(dataset) {}

function calculateMean(dataset) {}

function calculateMedian(dataset) {}

function convertToNumber(dataframe, col) {}

function flatten(dataframe) {}

function loadCSV(csvFile, ignoreRows, ignoreCols) {}

function createSlice(dataframe, columnIndex, pattern, exportColumns = []) {}

module.exports = {
	fileExists,
	validNumber,
	dataDimensions,
	calculateMean,
	findTotal,
	convertToNumber,
	flatten,
	loadCSV,
	calculateMedian,
	createSlice,
};
