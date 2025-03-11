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
import { CHART_DEFAULT, chartReducer, loadChartData } from './chart.util';
import "./top-marginal-rate.css";

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
			<LineChart width={800} height={400} data={selectedState.data as any[]}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis
					allowDataOverflow
					dataKey="year"
					domain={[CHART_DEFAULT.left, CHART_DEFAULT.right]}
					type="number"
				/>
				<YAxis
					allowDataOverflow
					domain={([dataMin, dataMax]) => [
						Math.round(dataMin) - 2,
						Math.round(dataMax) + 2,
					]}
					type="number"
					yAxisId="1"
				/>
				<Line
					yAxisId="1"
					type="bumpX"
					dataKey={'totalTopRate'}
					stroke={'#646cff'}
					animationDuration={500}
				/>
				<Tooltip
					filterNull
					content={({active, payload, label}) =>
						active &&
						payload?.length && (
							<div className="top-marginal-rate-tooltip">
								<p className="label">{`${label} : ${payload[0].value}%`}</p>
							</div>
						)
					}
				/>
			</LineChart>
		</ResponsiveContainer>
	);
};
export default TopMarginalRateChart;
