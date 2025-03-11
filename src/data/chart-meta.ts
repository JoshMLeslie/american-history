import { ChartMeta } from '../type/chart';

// NB the top-level key must match the 'id'
export enum ChartKeys {
	TMR = 'tmr',
	NPW = 'npw',
}

export const chartMeta: ChartMeta = {
		tmr: {
			title: 'Top Marginal Rate',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborumLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
			id: 'tmr',
		},
		npw: {
			title: 'Net Personal Wealth',
			description: 'description for npw',
			id: 'npw',
		},
		three: {
			title: 'Three',
			description: 'description three',
			id: 'three',
		},
		four: {
			title: 'Four',
			description: 'description four',
			id: 'four',
		},
	};
