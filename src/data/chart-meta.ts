import { ChartMeta } from '../type/chart';

export enum ChartKeys {
	HOME = 'home',
	TMR = 'tmr',
	NPW = 'npw',
	PNI = 'pni',
}

export const chartMeta: ChartMeta = {
	home: {
		data: null,
		title: 'Select a chart to start',
		description: '',
		id: ChartKeys.HOME,
	},
	npw: {
		data: null,
		title: 'Net Personal Wealth',
		description:
			'Net Personal Wealth per year as a percentage per region per percentile.',
		id: ChartKeys.NPW,
	},
	pni: {
		data: null,
		title: 'Pretax National Income',
		description: `
		This shows how much of the total income went to the 1% and Bottom 50% of earners before taxes or government assistance were factored in, per country, per year.
		Imagine all the income earned in a country for a given year is put into one big pot, e.g. the USA in 2020.
		The bottom half of working adults (the 50% of people with the lowest incomes) combined, in 2020, took home about 10.52% of that total income from the pot.
		`,
		id: ChartKeys.PNI,
	},
	tmr: {
		data: null,
		title: 'Top Marginal Rate',
		description: 'A historical look at top marginal income tax rate',
		id: ChartKeys.TMR,
	},
};
