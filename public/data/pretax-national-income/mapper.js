import fs from 'fs';
import data from './from-csv_pretax-national-income.json' with { type: 'json' };

const result = {};
data.forEach((entry) => {
	let {Country, 'Percentile Label': percentileLabel, Year, Value} = entry;

	// Skip entries with null values
	if (Value === null) return;

	// Ensure the year entry exists
	if (!result[Year]) {
		result[Year] = {year: Year};
	}

	// Create the key in the desired format
	if (Country === 'South & South-East Asia') {
		Country = 'South & SE Asia'
	}
	const key = `${Country}-${percentileLabel}`;
	result[Year][key] = Number(Value * 100).toFixed(2);
});

// Convert the result object to an array
fs.writeFile('./tmp.json', JSON.stringify(Object.values(result)), console.log);
