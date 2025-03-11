export type ChartMeta = Record<SelectedChart['id'], SelectedChart>;

export interface SelectedChart {
	title: string;
	description: string;
	id: string;
	data?: any[];
}
