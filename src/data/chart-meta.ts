import { ChartMeta } from '../type/chart';

// NB the top-level key must match the 'id'
export enum ChartKeys {
	HOME = 'home',
	TMR = 'tmr',
	NPW = 'npw',
}

export const chartMeta: ChartMeta = {
	home: {
		data: null,
		title: 'Select a chart to start',
		description: '',
		id: 'home',
	},
	tmr: {
		data: null,
		title: 'Top Marginal Rate',
		description: 'A historical look at top marginal income tax rate',
		id: 'tmr',
	},
	npw: {
		data: null,
		title: 'Net Personal Wealth',
		description:
			'Net Personal Wealth per year as a percentage per region per percentile.',
		id: 'npw',
	},
};
