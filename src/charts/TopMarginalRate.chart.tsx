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
import { fetchJSON } from '../util';
import {
	CHART_DEFAULT,
	chartReducer,
	genLineHSLColor,
	loadChartData,
} from './chart.util';
import './top-marginal-rate.css';

interface President {
	name: string;
	party: string[];
	start: string; // simple date
	end: string; // simple date
}

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

const TICK_GAP = 8;

const PresidentBar = (props: any) => {
	if (!props) {
		return;
	}
	const yearDiff = props.end - props.start;
	const fill = genLineHSLColor(props.index, true);
	const width = (yearDiff + 1) * TICK_GAP;
	return (
		<g>
			<rect
				data-president={props.name}
				data-start={props.start}
				data-end={props.end}
				x={props.x}
				y={0}
				width={width}
				height={props.height}
				fill={fill}
				stroke="#555"
			/>
			<g transform={`translate(${props.x + width / 2 - 6}, 50)`}>
				<text x={0} y={0} transform="rotate(90)" fontFamily="arial">
					{props.name} [{props.party.map((p: string) => p[0]).join(',')}]{' '}
					{props.start} - {props.end}
				</text>
			</g>
		</g>
	);
};

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
	return (
		<ResponsiveContainer width="100%" height="100%">
			<ComposedChart width={800} height={400} data={presidents}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis
					xAxisId="1"
					allowDataOverflow
					dataKey="year"
					domain={[CHART_DEFAULT.left, CHART_DEFAULT.right]}
					type="number"
					tickCount={50}
					angle={45}
					tickMargin={10}
					minTickGap={TICK_GAP}
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
					domain={[CHART_DEFAULT.left, CHART_DEFAULT.right]}
					type="number"
					orientation="top"
					minTickGap={TICK_GAP}
					tick={false}
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
						console.log(payload);
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
