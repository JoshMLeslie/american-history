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
import { CHART_DEFAULT, chartReducer, genLineHSLColor, loadChartData } from './chart.util';

const COUNTRY_PERCENTILES = [
	"Eastern Europe-Top 1%",
	"Eastern Europe-Bottom 50%",
	"Western Europe-Top 1%",
	"Western Europe-Bottom 50%",
	"North America-Top 1%",
	"North America-Bottom 50%",
	"North Africa-Top 1%",
	"North Africa-Bottom 50%",
	"South Africa-Top 1%",
	"South Africa-Bottom 50%",
	"East Asia-Top 1%",
	"East Asia-Bottom 50%",
	"Russia & Central Asia-Top 1%",
	"Russia & Central Asia-Bottom 50%",
	"South & South-East Asia-Top 1%",
	"South & South-East Asia-Bottom 50%",
	"West Asia-Top 1%",
	"West Asia-Bottom 50%",
]

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
					domain={([dataMin, dataMax]) => ([Math.round(dataMin) - 2, Math.round(dataMax) + 2])}
					type="number"
					yAxisId="1"
				/>
				{COUNTRY_PERCENTILES.map((country, i) => {
					// since country percentile data is adjacent, normalize the color per country
					const useColor = i % 2 === 0 ? genLineHSLColor(i) : genLineHSLColor(i-1);
					return (
						<Line
							key={country}
							yAxisId="1"
							type="natural"
							dataKey={country}
							stroke={useColor}
							animationDuration={500}
						/>
					);
				})}
				<Tooltip
					formatter={(value) => parseFloat(`${value}`).toFixed(2) + '%'}
				/>
			</LineChart>
		</ResponsiveContainer>
	);
};
export default NetPersonalWealthChart;
