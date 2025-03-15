import { useEffect } from 'react';
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
import { CHART_CONFIG, loadChartData, PRESIDENT_TICK_GAP, useChartReducer } from './chart.util';
import './top-marginal-rate.css';

const CHART_DATA: LoadChartConfig = [
	{
		url:
			import.meta.env.BASE_URL +
			'/data/top-marginal-tax-rate/top-marginal-rate.json',
		label: 'chart',
	},
	{
		url: import.meta.env.BASE_URL + '/data/presidents.json',
		label: 'presidents',
		startYear: 1905,
	},
];

const TopMarginalRateChart: React.FC = () => {
	const [selectedState, dispatch] = useChartReducer();
	useEffect(() => {
		loadChartData(CHART_DATA, dispatch);
	}, []);

	if (!selectedState?.data) {
		return <></>;
	}
	const minDomain =
		Math.min(...selectedState.data.chart.map((d) => d.year)) - 1;
	const maxDomain =
		Math.max(...selectedState.data.chart.map((d) => d.year)) + 1;
	return (
		<ResponsiveContainer width="100%" height="100%">
			<ComposedChart
				data={selectedState.data.presidents}
				{...CHART_CONFIG}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis
					xAxisId="1"
					allowDataOverflow
					dataKey="year"
					domain={[minDomain, maxDomain]}
					type="number"
					tickCount={50}
					angle={45}
					tickMargin={10}
					minTickGap={PRESIDENT_TICK_GAP}
				/>
				<YAxis
					allowDataOverflow
					domain={['auto', 'auto']}
					type="number"
					yAxisId="1"
				/>
				{/* president bar START */}
				<XAxis
					xAxisId="2"
					allowDataOverflow
					dataKey="start"
					domain={[minDomain, maxDomain]}
					type="number"
					orientation="top"
					minTickGap={PRESIDENT_TICK_GAP}
					tick={false}
				/>
				<Bar
					dataKey="start"
					shape={<PresidentBar minDomain={minDomain} maxDomain={maxDomain} />}
					yAxisId="1"
					xAxisId="2"
				/>
				{/* president bar END */}
				<Line
					yAxisId="1"
					xAxisId="1"
					strokeWidth={2}
					type="bumpX"
					data={selectedState.data.chart}
					dataKey="totalTopRate"
					stroke={'#646cff'}
					animationDuration={500}
				/>
				<Tooltip
					filterNull
					content={({active, payload, label}) => {
						return (
							active &&
							payload?.length && (
								<div className="top-marginal-rate-tooltip">
									<p className="label">{`${label} : ${payload[0].value}%`}</p>
								</div>
							)
						);
					}}
				/>
			</ComposedChart>
		</ResponsiveContainer>
	);
};
export default TopMarginalRateChart;
