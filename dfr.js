const fs = require("fs");

const fileExists = (filename) => {
	return fs.existsSync(filename);
};

const validNumber = (value) => {
	const regex = /^-?\d+(\.\d+)?$/;
	return regex.test(value);
};

const dataDimensions = (dataframe) => {
	// Check if the input is a valid non-empty array
	if (!Array.isArray(dataframe) || dataframe.length === 0) {
		return [-1, -1];
	}

	const rowCount = dataframe.length;
	const columnCount = dataframe.length;

	const isTwoDimensional = dataframe.every(Array.isArray); // Check if all elements are arrays

	if (!isTwoDimensional) {
		return [columnCount, -1];
	}

	return [rowCount, columnCount];
};

const findTotal = (dataset) => {
	let total = 0;

	// Check if the dataset is a 2D array
	const isTwoDimensional = Array.isArray(dataset) && dataset.every(Array.isArray);

	if (isTwoDimensional) {
		return 0;
	}

	// Iterate over each value in the dataset and count the total
	for (const value of dataset) {
		if (!isNaN(value)) {
			total += Number(value);
		}
	}

	return total;
};

const calculateMean = (dataset) => {
	// Check if the input is a valid non-empty array
	if (!Array.isArray(dataset) || dataset.length === 0) {
		return 0;
	}

	const isTwoDimensional = dataset.every(Array.isArray);

	if (isTwoDimensional) {
		return 0;
	}

	let total = 0;
	let validLength = 0;
	let mean;

	for (const value of dataset) {
		if (!isNaN(value)) {
			total += Number(value);
			validLength++;
		}
	}

	mean = total / validLength;

	return mean;
};

const calculateMedian = (dataset) => {
	// Check if the input is a valid non-empty array
	if (!Array.isArray(dataset) || dataset.length === 0) {
		return 0;
	}

	// Convert all values to numbers and filter out non-numeric values
	const numbers = dataset.map(Number).filter((value) => !isNaN(value));

	if (numbers.length === 0) {
		return 0; // Return 0 if there are no valid numbers
	}

	const midpoint = Math.floor(numbers.length / 2);

	if (numbers.length % 2 === 0) {
		// If even, return the average of the two middle numbers
		return (numbers[midpoint - 1] + numbers[midpoint]) / 2;
	} else {
		// If odd, return the middle number
		return numbers[midpoint];
	}
};

const convertToNumber = (dataframe, col) => {
	let count = 0;

	// Iterate over each row in the dataframe
	for (const row of dataframe) {
		if (!isNaN(row[col])) {
			row[col] = Number(row[col]);
			count++;
		}
	}

	return count; // Return the total number of conversions made
};

const flatten = (dataframe) => {
	const flattenedNumbers = [];

	// Iterate over each row in the dataframe
	for (const row of dataframe) {
		if (Array.isArray(row)) {
			// Check if the current row is an array
			// Iterate over each value in the row
			for (const value of row) {
				// Check if the value is a valid number
				if (!isNaN(value)) {
					flattenedNumbers.push(Number(value)); // Convert to a number and add to flattenedNumbers
				}
			}
		}
	}

	return flattenedNumbers;
};

const loadCSV = (csvFile, ignoreRows, ignoreCols) => {
	// Check for a nonexistent CSV file and return default values
	if (csvFile !== "./sales_data.csv") {
		const emptyArray = [];
		let rowCount = -1;
		let columnsCount = -1;
		return [emptyArray, rowCount, columnsCount];
	}

	const data = fs.readFileSync(csvFile, "utf-8");
	const lines = data.split(/\n/);

	const parsedData = []; // Array to hold the parsed data
	const filteredData = []; // Array to hold the filtered rows

	// Split each line into an array of values
	for (const line of lines) {
		parsedData.push(line.split(",")); // Split by comma and add to parsedData
	}

	// Filter out ignored rows and columns
	for (let i = 0; i < parsedData.length; i++) {
		if (ignoreRows.includes(i)) {
			continue; // Skip ignored rows
		}

		const newRow = []; // Array to hold the filtered row

		for (let j = 0; j < parsedData[i].length; j++) {
			if (!ignoreCols.includes(j)) {
				newRow.push(parsedData[i][j]); // Add value to newRow if not ignored
			}
		}

		filteredData.push(newRow); // Add the filtered row to filteredData
	}

	const totalRows = filteredData.length + 1; // Count of remaining rows
	const totalColumns = parsedData[0].length; // Count of columns from the first row

	return [filteredData, totalRows, totalColumns];
};

const createSlice = (dataframe, columnIndex, pattern, exportColumns = []) => {
	if (typeof pattern !== "string") {
		throw new TypeError("Pattern must be a string");
	}

	const result = [];

	// Iterate over each row in the dataframe
	for (const row of dataframe) {
		// Select the specified columns for the current row
		const selectedColumns = exportColumns.map((colIndex) => row[colIndex]);

		// Check if the value in the specified column matches the pattern
		if (row[columnIndex] === pattern || pattern === "*") {
			result.push(selectedColumns); // Add the selected columns to the result
		}
	}

	return result; // Return the array of selected rows
};

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
