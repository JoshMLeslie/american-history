import React, { useEffect } from 'react';
import {
	Bar,
	CartesianGrid,
	ComposedChart,
	Line,
	ResponsiveContainer,
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
import lifeExpectancyCountries from './life-expectancy.countries';

const CHART_DATA: LoadChartConfig = [
	{
		url:
			import.meta.env.BASE_URL +
			'/data/levhe/life-expectancy-vs-health-expenditure.json',
		label: 'chart',
	},
	{
		url: import.meta.env.BASE_URL + '/data/presidents.json',
		label: 'presidents',
		startYear: 1797,
	},
];

const LifeExpectancyComponent: React.FC = () => {
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

	const minDomain = 1800;
	const maxDomain = 2024;
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
				<YAxis
					allowDataOverflow
					domain={['auto', 'auto']}
					orientation='right'
					type="number"
					yAxisId="2"
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
				{lifeExpectancyCountries.map((country, i) => {
					// since country percentile data is adjacent, normalize the color per country
					const useColor = genLineHSLColor(i % 2 === 0 ? i : i - 1);
					const label =
						i % 2 === 0
							? country + '_life-expectancy'
							: country + '_population';
					return (
						<Line
							key={label}
							xAxisId="1"
							yAxisId={i % 2 ? 1 : 2}
							type="natural"
							dataKey={label}
							stroke={useColor}
							animationDuration={500}
							data={selectedState.data?.chart}
							connectNulls
						/>
					);
				})}
				{/* <Tooltip offset={20} content={MultiLineTooltipComponent as any} /> */}
			</ComposedChart>
		</ResponsiveContainer>
	);
};
export default LifeExpectancyComponent;
