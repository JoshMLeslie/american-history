import { ChartCache } from '../type/chart';
import { fetchJSON } from '../util';

// NB the top-level key must match the 'id'
export default async () =>
	({
		tmr: {
			title: 'Top Marginal Rate',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborumLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
			id: 'tmr',
			data: fetchJSON('/data/top-marginal-tax-rate/top-marginal-rate.json'),
			chartConfig: {
				xDataKey: 'year',
				lineDataKey: 'totalTopRate'
			}
		},
		npw: {
			title: 'Net Personal Wealth',
			description: 'description for npw',
			id: 'npw',
			data: fetchJSON('/data/net-personal-wealth/net-personal-wealth.json'),
			chartConfig: {
				xDataKey: 'year',
				lineDataKey: 'value'
			}
		},
		three: {
			title: 'Three',
			description: 'description three',
			id: 'three',
			data: [],
			chartConfig: {
				xDataKey: '',
				lineDataKey: ''
			}
		},
		four: {
			title: 'Four',
			description: 'description four',
			id: 'four',
			data: [],
			chartConfig: {
				xDataKey: '',
				lineDataKey: ''
			}
		},
	} satisfies ChartCache);
