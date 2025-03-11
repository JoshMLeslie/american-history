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
import {
	chartReducer,
	loadChartData,
	PRESIDENT_TICK_GAP
} from './chart.util';
import './top-marginal-rate.css';

const presidents = await fetchJSON('/data/presidents.json').then(
	(r: President[]) => {
		const startIndex = r.findIndex((prez) => {
			return new Date(prez.start).getFullYear() >= 1913;
		});
		// slice off out-of-bounds presidents, map date strings to years
		return r.slice(startIndex, -1).map((prez) => ({
			...prez,
			start: new Date(prez.start).getFullYear(),
			end: new Date(prez.end).getFullYear(),
		}));
	}
);

const TopMarginalRateChart: React.FC = () => {
	const [selectedState, dispatch] = useReducer(chartReducer, {
		data: null,
		loading: false,
		error: null,
	});
	useEffect(() => {
		loadChartData(
			'/data/top-marginal-tax-rate/top-marginal-rate.json',
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
					// tick={false}
				/>
				<Bar dataKey="start" shape={<PresidentBar />} yAxisId="1" xAxisId="2" />
				{/* president bar END */}
				<Line
					yAxisId="1"
					xAxisId="1"
					strokeWidth={2}
					type="bumpX"
					data={selectedState.data as any[]}
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
