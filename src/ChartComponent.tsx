import { useEffect, useReducer } from 'react';
import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { SelectedChart } from './type/chart';

const CHART_DEFAULT = {
	left: 'dataMin',
	right: 'dataMax',
	refAreaLeft: '',
	refAreaRight: '',
	top: 'dataMax+1',
	bottom: 'dataMin-1',
	animation: true,
};

enum CHART_ACTION_TYPE {
	START = 'START',
	SUCCESS = 'SUCCESS',
	ERROR = 'ERROR',
}

interface ChartAction {
	type: CHART_ACTION_TYPE;
	payload?: null | SelectedChart['data'];
	error?: string;
}

interface ChartComponentState {
	data?: null | SelectedChart['data'];
	loading: boolean;
	error?: null | string;
}

const chartReducer = (state: ChartComponentState, action: ChartAction) => {
	switch (action.type) {
		case CHART_ACTION_TYPE.START:
			return {...state, loading: true, error: null};
		case CHART_ACTION_TYPE.SUCCESS:
			return {...state, loading: false, data: action.payload};
		case CHART_ACTION_TYPE.ERROR:
			return {...state, loading: false, error: action.error};
		default:
			return state;
	}
};

const ChartComponent: React.FC<{selectedChart: null | SelectedChart}> = ({
	selectedChart,
}) => {
	const [selectedState, dispatch] = useReducer(chartReducer, {
		data: [],
		loading: false,
		error: null,
	});
	useEffect(() => {
		if (!selectedChart) {
			return;
		}

		(async () => {
			dispatch({type: CHART_ACTION_TYPE.START});
			try {
				const {data} = selectedChart;
				const resolvedData = Array.isArray(data) ? data : await data;
				dispatch({type: CHART_ACTION_TYPE.SUCCESS, payload: resolvedData});
			} catch (error) {
				dispatch({type: CHART_ACTION_TYPE.ERROR, error: error as string});
				console.warn(error);
			}
		})();
	}, [selectedChart?.id]);

	if (!selectedChart) {
		return <></>
	}
	return (
		<ResponsiveContainer width="100%" height="100%">
			<LineChart width={800} height={400} data={selectedState.data as any[]}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis
					allowDataOverflow
					dataKey={selectedChart.chartConfig.xDataKey}
					domain={[CHART_DEFAULT.left, CHART_DEFAULT.right]}
					type="number"
				/>
				<YAxis
					allowDataOverflow
					domain={[CHART_DEFAULT.bottom, CHART_DEFAULT.top]}
					type="number"
					yAxisId="1"
				/>
				<Line
					yAxisId="1"
					type="natural"
					dataKey={selectedChart.chartConfig.lineDataKey}
					stroke="#8884d8"
					animationDuration={500}
				/>
				<Tooltip />
			</LineChart>
		</ResponsiveContainer>
	);
};
export default ChartComponent;
