import { unlinkSync, writeFile } from 'fs';
import data from './csv-json_life-expectancy-vs-health-expenditure.json' with { type: 'json' };

/**
 * @typedef {{
 * Entity: string;
 * Code: string;
 * Year: number;
 * 'Life expectancy': number;
 * 'Population (historical)': number;
 * }} Data
 */

/**
 * @typedef {{
 * 	year: number;
 *  [entity: string]: number; // one entry for Life Expectancy, *-life-expectancy and one for Population, *-population
 * }} Formatted
 */

unlinkSync('./tmp.json', console.warn)

/** @type {Formatted} */
const formatted = Object.values(
	data.reduce((acc, datum) => {
		const {
			Entity: entity,
			Year: year,
			'Life expectancy': lifeExpectancy,
			'Population (historical)': population,
		} = datum;
		const labelLE = `${entity}_life-expectancy`;
		const labelPop = `${entity}_population`;
		const entityData = {
			[labelLE]: lifeExpectancy ? +(lifeExpectancy.toFixed(2)) : null,
			[labelPop]: population,
		};
		if (year < 0) {
			return acc;
		}
		if (acc[year]) {
			acc[year] = ({
				...acc[year],
				...entityData
		});
		} else {
			acc[year] = {
				year,
				...entityData
			};
		}
		return acc;
	}, {})
);

writeFile('./tmp.json', JSON.stringify(formatted), console.warn);
