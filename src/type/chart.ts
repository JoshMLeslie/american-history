export type ChartCache = Record<SelectedChart['id'], SelectedChart>;

export interface SelectedChart {
	title: string;
	description: string;
	id: string;
	data: Promise<any[]> | any[];
	chartConfig: {
		xDataKey: string;
		lineDataKey: string;
	}
}
