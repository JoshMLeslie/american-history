import {
	CHART_ACTION_TYPE,
	ChartAction,
	ChartComponentState,
} from '../type/chart';
import { fetchJSON } from '../util';

export const CHART_DEFAULT = {
	left: 'dataMin',
	right: 'dataMax+1',
	refAreaLeft: '',
	refAreaRight: '',
	top: 'auto',
	bottom: 'auto',
	animation: true,
};

export const chartReducer = (
	state: ChartComponentState,
	action: ChartAction
) => {
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

export const loadChartData = async (
	url: string,
	dispatch: React.Dispatch<ChartAction>
) => {
	try {
		dispatch({type: CHART_ACTION_TYPE.SUCCESS, payload: await fetchJSON(url)});
	} catch (error) {
		dispatch({type: CHART_ACTION_TYPE.ERROR, error: error as string});
		console.warn(error);
	}
};

/**
 * @param index converted to degrees, can cause repeats at high indices
 * @param [opacity] integer value, e.g. 50 => 50%
 * @returns 
 */
export const genLineHSLColor = (index: number, lighter?: boolean) => {
	if (lighter) {
		return `hsl(${(index * 137) % 360} 40 80)`;
	} else {
		return `hsl(${(index * 137) % 360} 70 50)`;
	}
};
