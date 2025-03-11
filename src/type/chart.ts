export enum CHART_ACTION_TYPE {
	START = 'START',
	SUCCESS = 'SUCCESS',
	ERROR = 'ERROR',
}

export type ChartMeta = Record<SelectedChart['id'], SelectedChart>;

export interface SelectedChart {
	title: string;
	description: string;
	id: string;
	data?: any[];
}

export interface ChartAction {
	type: CHART_ACTION_TYPE;
	payload?: null | SelectedChart['data'];
	error?: string;
}

export interface ChartComponentState {
	data?: null | SelectedChart['data'];
	loading: boolean;
	error?: null | string;
}
