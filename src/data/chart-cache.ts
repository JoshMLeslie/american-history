import { ChartCache, SelectedChart } from '../type/chart';

// NB the top-level key must match the 'id'
export default async () =>
	({
		tmr: {
			title: 'Top Marginal Rate',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborumLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
			id: 'tmr',
			data: (await fetch(
				'/data/top-marginal-tax-rate/top-marginal-rate.json'
			).then((r) => r.json())) as SelectedChart['data'],
		},
		two: {
			title: 'Two',
			description: 'description two',
			id: 'two',
			data: [],
		},
		three: {
			title: 'Three',
			description: 'description three',
			id: 'three',
			data: [],
		},
		four: {
			title: 'Four',
			description: 'description four',
			id: 'four',
			data: [],
		},
	} satisfies ChartCache);
