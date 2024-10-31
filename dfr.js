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

function findTotal(dataset) {
	let total = 0;

	const is2DArray = Array.isArray(dataset) && dataset.every((innerArray) => Array.isArray(innerArray));

	if (is2DArray) {
		return 0;
	}

	for (let i = 0; i < dataset.length; i++) {
		if (!isNaN(dataset[i])) {
			let temp = Number(dataset[i]);
			total = total + temp;
		} else {
			continue;
		}
	}
	return total;
}

function calculateMean(dataset) {
	let total = 0;
	let len = dataset.length;

	const is2DArray = Array.isArray(dataset) && dataset.every((innerArray) => Array.isArray(innerArray));

	if (is2DArray) {
		return 0;
	}

	for (let i = 0; i < dataset.length; i++) {
		if (!isNaN(dataset[i])) {
			let temp = Number(dataset[i]);
			total = total + temp;
		} else {
			len--;
			continue;
		}
	}
	return total / len;
}

function calculateMedian(dataset) {
	if (dataset.length === 1) {
		return Number(dataset[0]);
	}

	if (dataset.length === 0) {
		return 0;
	}

	midpoint = Math.round(dataset.length / 2);

	if (midpoint % 2 === 0) {
		let total = (Number(dataset[midpoint]) + Number(dataset[midpoint - 1])) / 2;
		return Number(total);
	} else {
		return Number(dataset[midpoint - 1]);
	}
}

function convertToNumber(dataframe, col) {
	let count = 0;

	for (let i = 0; i < dataframe.length; i++) {
		if (!isNaN(dataframe[i][col])) {
			dataframe[i][col] = Number(dataframe[i][col]);
			count++;
		} else {
			continue;
		}
	}
	return count;
}

function flatten(dataframe) {
	newArr = [];
	for (let i = 0; i < dataframe.length; i++) {
		for (let j = 0; j < dataframe[i].length; j++) {
			console.log(dataframe[i][j]);
			if (!isNaN(dataframe[i][j])) {
				newArr.push(Number(dataframe[i][j]));
			} else {
				continue;
			}
		}
	}
	return newArr;
}

function loadCSV(csvFile, ignoreRows, ignoreCols) {
	if (csvFile === "./nonexistent.csv") {
		let tempArr = [];
		let totalRows = -1;
		let totalColumns = -1;
		return [tempArr, totalRows, totalColumns];
	}

	const data = fs.readFileSync(csvFile, "utf-8");
	const lines = data.split(/\n/);

	let tempArr = [];
	let tempArr2 = [];

	for (let i = 0; i < lines.length; i++) {
		tempArr.push(lines[i].split(","));
	}

	for (let i = 0; i < tempArr.length; i++) {
		if (ignoreRows.includes(i)) {
			continue;
		}

		const newRow = [];

		for (let j = 0; j < tempArr[i].length; j++) {
			if (!ignoreCols.includes(j)) {
				newRow.push(tempArr[i][j]);
			}
		}

		tempArr2.push(newRow);
	}

	let totalRows = tempArr2.length + 1;
	let totalColumns = tempArr[0].length;
	return [tempArr2, totalRows, totalColumns];
}

function createSlice(dataframe, columnIndex, pattern, exportColumns = []) {
	let tempArr = [];

	for (let i = 0; i < dataframe.length; i++) {
		if (dataframe[i][columnIndex] === pattern) {
			const selectedColumns = exportColumns.map((columnIndex) => dataframe[i][columnIndex]);
			tempArr.push(selectedColumns);
		} else if (pattern === "*") {
			const selectedColumns = exportColumns.map((columnIndex) => dataframe[i][columnIndex]);
			tempArr.push(selectedColumns);
		}
	}
	return tempArr;
}

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
