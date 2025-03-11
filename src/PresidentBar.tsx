import { genLineHSLColor, PRESIDENT_TICK_GAP } from "./charts/chart.util";

const PresidentBar = (props: any) => {
	if (!props) {
		return;
	}
	const yearDiff = props.end - props.start;
	const fill = genLineHSLColor(props.index, true);
	const width = (yearDiff + 1) * PRESIDENT_TICK_GAP;
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
export default PresidentBar;