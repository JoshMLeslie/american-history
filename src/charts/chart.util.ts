import { useReducer } from 'react';
import {
	CHART_ACTION_TYPE,
	ChartAction,
	ChartComponentState,
	LoadChartConfig,
	SelectedChart,
} from '../type/chart';
import { President, PresidentWithYear } from '../type/president';
import { fetchJSON } from '../util';

export const CHART_CONFIG = {
	width: 800,
	height: 400,
	barGap: 0,
	margin: {top: 0, left: -10, right: 20, bottom: 0},
};

export const CHART_CHILD_CONFIGS = {
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
): ChartComponentState => {
	switch (action.type) {
		case CHART_ACTION_TYPE.START:
			return {...state, loading: true, error: null};
		case CHART_ACTION_TYPE.SUCCESS:
			return {
				...state,
				loading: false,
				data: action.payload,
			};
		case CHART_ACTION_TYPE.ERROR:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		default:
			return state;
	}
};

export const useChartReducer = () =>
	useReducer(chartReducer, {
		data: null,
		loading: true,
		error: null,
	});

const filterPresidents = (
	presidents: President[],
	startYear: number
): PresidentWithYear[] => {
	const startIndex = presidents.findIndex(
		(prez) => new Date(prez.start).getFullYear() >= startYear
	);
	// slice off out-of-bounds presidents, map date strings to years
	return presidents.slice(startIndex, -1).map((prez) => ({
		...prez,
		start: new Date(prez.start).getFullYear(),
		end: new Date(prez.end).getFullYear(),
	}));
};

export const loadChartData = async (
	data: LoadChartConfig,
	dispatch: React.Dispatch<ChartAction>
) => {
	// dispatch({
	// 	type: CHART_ACTION_TYPE.START,
	// });
	const payload: SelectedChart['data'] = {
		presidents: [],
		chart: [],
	};
	const errors = [];
	for (const {url, label, startYear} of data) {
		try {
			const res = await fetchJSON(url);
			if (label === 'presidents' && startYear) {
				payload[label] = filterPresidents(res, startYear);
			} else {
				payload[label] = res;
			}
		} catch (error) {
			errors.push(error as string);
			console.warn(error);
		}
	}

	if (errors.length) {
		dispatch({
			type: CHART_ACTION_TYPE.ERROR,
			error: errors.join('\n '),
		});
	} else {
		dispatch({
			type: CHART_ACTION_TYPE.SUCCESS,
			payload,
		});
	}
};

/**
 * @param index converted to degrees, can cause repeats at high indices
 * @param [opacity] integer value, e.g. 50 => 50%
 * @returns
 */
export const genLineHSLColor = (index: number) => {
	const firstValue = (index * 13.7) % 360;
	return `hsl(${firstValue} 70 50)`;
};

export const PRESIDENT_TICK_GAP = 8;
