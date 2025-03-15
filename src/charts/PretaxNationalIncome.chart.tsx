import React, { useEffect } from 'react';
import {
	Bar,
	CartesianGrid,
	ComposedChart,
	Line,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import PresidentBar from '../PresidentBar';
import { LoadChartConfig } from '../type/chart';
import {
	CHART_CONFIG,
	genLineHSLColor,
	loadChartData,
	useChartReducer,
} from './chart.util';
import MultiLineTooltipComponent from './MultiLineTooltipComponent';

const COUNTRY_PERCENTILES = [
	'Eastern Europe-Top 1%',
	'Eastern Europe-Bottom 50%',
	'Western Europe-Top 1%',
	'Western Europe-Bottom 50%',
	'North America-Top 1%',
	'North America-Bottom 50%',
	'North Africa-Top 1%',
	'North Africa-Bottom 50%',
	'South Africa-Top 1%',
	'South Africa-Bottom 50%',
	'East Asia-Top 1%',
	'East Asia-Bottom 50%',
	'Russia & Central Asia-Top 1%',
	'Russia & Central Asia-Bottom 50%',
	'South & SE Asia-Top 1%',
	'South & SE Asia-Bottom 50%',
	'West Asia-Top 1%',
	'West Asia-Bottom 50%',
];

const CHART_DATA: LoadChartConfig = [
	{
		url:
			import.meta.env.BASE_URL +
			'/data/pretax-national-income/pretax-national-income.json',
		label: 'chart',
	},
	{
		url: import.meta.env.BASE_URL + '/data/presidents.json',
		label: 'presidents',
		startYear: 1940,
	},
];

const PretaxNationalIncomeChart: React.FC = () => {
	const [selectedState, dispatch] = useChartReducer();
	useEffect(() => {
		loadChartData(CHART_DATA, dispatch);
	}, []);

	if (!selectedState?.data?.chart && selectedState.error) {
		return <>{selectedState.error}</>;
	}

	if (!selectedState?.data || selectedState.loading) {
		return (
			<div className="basic-centered" style={{color: 'black'}}>
				Loading
			</div>
		);
	}

	const minDomain =
		Math.min(...selectedState.data.chart.map((d) => d.year)) - 1;
	const maxDomain =
		Math.max(...selectedState.data.chart.map((d) => d.year)) + 1;
	return (
		<ResponsiveContainer width="100%" height="100%">
			<ComposedChart data={selectedState.data.presidents} {...CHART_CONFIG}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis
					xAxisId="1"
					allowDataOverflow
					dataKey="year"
					domain={[minDomain, maxDomain]}
					type="number"
					interval={0}
					tickCount={13}
				/>
				<YAxis
					allowDataOverflow
					domain={['auto', 'auto']}
					type="number"
					yAxisId="1"
				/>
				<XAxis
					xAxisId="2"
					allowDataOverflow
					dataKey="start"
					domain={[minDomain, maxDomain]}
					type="number"
					orientation="top"
					tick={false}
				/>
				<Bar
					dataKey="start"
					shape={<PresidentBar minDomain={minDomain} maxDomain={maxDomain} />}
					yAxisId="1"
					xAxisId="2"
					tooltipType="none"
				/>
				{COUNTRY_PERCENTILES.map((country, i) => {
					// since country percentile data is adjacent, normalize the color per country
					const useColor = genLineHSLColor(i % 2 === 0 ? i : i - 1);
					return (
						<Line
							key={country}
							xAxisId="1"
							yAxisId="1"
							type="natural"
							dataKey={country}
							stroke={useColor}
							animationDuration={500}
							data={selectedState.data?.chart}
						/>
					);
				})}
				<Tooltip offset={20} content={MultiLineTooltipComponent as any} />
			</ComposedChart>
		</ResponsiveContainer>
	);
};
export default PretaxNationalIncomeChart;
