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
		description:
			"The charts presented show various data with a backdrop of US presidents, relative to the timeframe of the main chart's data",
		id: ChartKeys.HOME,
	},
	npw: {
		data: null,
		title: 'Net Personal Wealth',
		description:
			"This graph shows net personal wealth per year for the top 1% and bottom 50% of a given region's population, expressed as a percentage. This metric reflects the distribution of personal wealth accumulation within specific geographic areas and among different segments of the population. By analyzing wealth as a percentage, it becomes easier to compare the relative financial standing of individuals across various regions and income brackets. In other words, for a given group, it shows their wealth as a percent of the region's total.",
		id: ChartKeys.NPW,
	},
	pni: {
		data: null,
		title: 'Pretax National Income',
		description: `
		This shows how much of the total income went to the 1% and Bottom 50% of earners before taxes or government assistance were factored in, per country, per year.
		Imagine all the income earned in a country for a given year is put into one big pot, e.g. the USA in 2020.
		The bottom half of working adults (the 50% of people with the lowest incomes) combined, in 2020, took home about 10.52% of that total income from the pot vs 1% of the top earners took home 18.10%.
		`,
		id: ChartKeys.PNI,
	},
	tmr: {
		data: null,
		title: 'Top Marginal Rate',
		description:
			'A historical look at top marginal income tax rate. This value represents the maximum percent an individual would pay in taxes for that given year on their reported income.',
		id: ChartKeys.TMR,
	},
};
