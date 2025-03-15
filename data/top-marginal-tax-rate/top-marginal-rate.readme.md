Top marginal rate data scraped from [wolterskluwer](https://www.wolterskluwer.com/en/expert-insights/whole-ball-of-tax-historical-income-tax-rates)
using the following function on the data table titled, "A historical look at top marginal income tax rate"

Yes it would've been faster to copy it out by hand, but here we are.

```js
const table = document.querySelector('tbody');
table.deleteRow(0); // remove header data

// basic array
const acc = [];
for (const row of table.rows) {
	acc.push(Array.from(row.children).map((rowData) => rowData.innerText));
}

/** array of mapped dict alike:
 * @type Array<{
 * 	 year: number;
 *   regularRate: number;
 *   surtaxRate: number;
 *   totalTopRate: number;
 * }>
 */
const acc = [];
for (const row of table.rows) {
	const year = row.children[0].innerText;
	const regularRate = +row.children[1].innerText.slice(0, -1);
	const surtaxRate = +row.children[2].innerText.slice(0, -1);
	const totalTopRate = +row.children[3].innerText.slice(0, -1);

	let newEntry = [];

	// if year is a single value, e.g. '1916'
	if (/^\d{4}$/.test(year)) {
		newEntry.push({
			year: +year,
			regularRate,
			surtaxRate,
			totalTopRate,
		});
	} else {
		// year is a range, e.g. '1913-1915'
		let [startYear, endYear] = year.split(/\D/);
		if (endYear.length === 2) {
			endYear = startYear.slice(0, 2) + endYear;
		}
		startYear = +startYear;
		endYear = +endYear;
		// inclusive of endYear
		while (startYear < endYear + 1) {
			newEntry.push({
				year: startYear,
				regularRate,
				surtaxRate,
				totalTopRate,
			});
			startYear++;
		}
	}
	acc.push(...newEntry);
}
```
