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
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborumLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
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
