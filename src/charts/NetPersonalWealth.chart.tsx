import { useEffect, useReducer } from 'react';
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
import { President } from '../type/president';
import { fetchJSON } from '../util';
import { chartReducer, genLineHSLColor, loadChartData } from './chart.util';

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
	'South & South-East Asia-Top 1%',
	'South & South-East Asia-Bottom 50%',
	'West Asia-Top 1%',
	'West Asia-Bottom 50%',
];

const presidents = await fetchJSON('/data/presidents.json').then(
	(r: President[]) => {
		const startIndex = r.findIndex((prez) => {
			return new Date(prez.start).getFullYear() >= 1990;
		});
		// slice off out-of-bounds presidents, map date strings to years
		return r.slice(startIndex, -1).map((prez) => ({
			...prez,
			start: new Date(prez.start).getFullYear(),
			end: new Date(prez.end).getFullYear(),
		}));
	}
);

const NetPersonalWealthChart: React.FC = () => {
	const [selectedState, dispatch] = useReducer(chartReducer, {
		data: null,
		loading: false,
		error: null,
	});
	useEffect(() => {
		loadChartData(
			'/data/net-personal-wealth/net-personal-wealth.json',
			dispatch
		);
	}, []);

	if (!selectedState?.data) {
		return <></>;
	}
	const minDomain = Math.min(...selectedState.data.map((d) => d.year));
	const maxDomain = Math.max(...selectedState.data.map((d) => d.year));
	return (
		<ResponsiveContainer width="100%" height="100%">
			<ComposedChart width={800} height={400} data={presidents} barGap={0}>
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
					interval={0}
					tickCount={13}
				/>
				<Bar
					dataKey="start"
					shape={<PresidentBar minDomain={minDomain} maxDomain={maxDomain} />}
					yAxisId="1"
					xAxisId="2"
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
							data={selectedState.data as any[]}
						/>
					);
				})}
				<Tooltip
					formatter={(value) => parseFloat(`${value}`).toFixed(2) + '%'}
				/>
			</ComposedChart>
		</ResponsiveContainer>
	);
};
export default NetPersonalWealthChart;
