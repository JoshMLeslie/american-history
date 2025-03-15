import { PresidentWithYear } from './president';

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
	data: null | {
		presidents: PresidentWithYear[];
		chart: any[];
	};
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

export type LoadChartConfig = Array<{
	url: string;
	label: keyof Exclude<SelectedChart['data'], null>; // explicitly not null as this is a hard-coded config
	startYear?: number; // the year of a president's starting term to search against, `X >= startYear`
}>;
