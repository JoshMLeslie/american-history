import { useEffect, useState } from 'react';
import {
	CartesianGrid,
	Line,
	LineChart,
	ReferenceArea,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { SelectedChart } from './type/chart';

const initState = {
	data: [],
	left: 'dataMin',
	right: 'dataMax',
	refAreaLeft: '',
	refAreaRight: '',
	top: 'dataMax+1',
	bottom: 'dataMin-1',
	animation: true,
};

const ChartComponent: React.FC<{selectedChart: null | SelectedChart}> = ({
	selectedChart,
}) => {
	const [state, setState] = useState({...initState, data: selectedChart?.data});

	useEffect(() => {
		if (!selectedChart) {
			return;
		}
		setState({
			...state,
			data: selectedChart.data,
		});
	}, [selectedChart?.id]);

	const {
		data,
		left,
		right,
		refAreaLeft,
		refAreaRight,
		top,
		bottom,
	} = state;

	return (
		<ResponsiveContainer width="100%" height="100%">
			<LineChart
				width={800}
				height={400}
				data={data}
				onMouseDown={(e) =>
					setState((s) => ({...s, refAreaLeft: e.activeLabel!}))
				}
				onMouseMove={(e) =>
					state.refAreaLeft &&
					setState((s) => ({...s, refAreaRight: e.activeLabel!}))
				}
				// onMouseUp={zoom.bind(this)}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis
					allowDataOverflow
					dataKey="year"
					domain={[left, right]}
					type="number"
				/>
				<YAxis
					allowDataOverflow
					domain={[bottom, top]}
					type="number"
					yAxisId="1"
				/>
				<Line
					yAxisId="1"
					type="natural"
					dataKey="totalTopRate"
					stroke="#8884d8"
					animationDuration={300}
				/>
				<Tooltip />

				{refAreaLeft && refAreaRight ? (
					<ReferenceArea
						yAxisId="1"
						x1={refAreaLeft}
						x2={refAreaRight}
						strokeOpacity={0.3}
					/>
				) : null}
			</LineChart>
		</ResponsiveContainer>
	);
};
export default ChartComponent;
