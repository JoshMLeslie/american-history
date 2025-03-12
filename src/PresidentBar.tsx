import { useLayoutEffect, useRef, useState } from 'react';
import { PRESIDENT_TICK_GAP } from './charts/chart.util';
import { President } from './type/president';

interface PresidentProps extends Partial<Omit<President, 'start' | 'end'>> {
	minDomain: number; // aka minYear
	maxDomain: number; // aka maxYear
	index?: number;
	x?: number;
	y?: number;
	height?: number;
	width?: number;
	background?: {
		x: number;
		y: number;
		width: number;
		height: number;
	};
	tooltipPosition?: {
		x: number;
		y: number;
	};
	// rebound president props
	start?: number; // fullYear
	end?: number; // fullYear
}

const PresidentBar = (props: PresidentProps) => {
	const yearDiff = props.end! - props.start! + 1;
	const yearWidth = useRef(0);
	const fill = props.index! % 2 ? '#faf0f0' : 'slategray';
	const [width, setWidth] = useState((yearDiff + 1) * PRESIDENT_TICK_GAP);

	useLayoutEffect(() => {
		const a = document.querySelectorAll('.xAxis .recharts-cartesian-axis-tick');
		const firstTickX = (a[0].firstChild as SVGLineElement)?.x1.baseVal.value;
		const lastTickX = (a[a.length - 1].firstChild as SVGLineElement)?.x1.baseVal
			.value;
		const tickLength = lastTickX - firstTickX;
		yearWidth.current = tickLength / (props.maxDomain - props.minDomain);

		setWidth(yearWidth.current * yearDiff);
	}, [props]);

	if (!props) {
		return;
	}

	const useX = props.tooltipPosition!.x; // props.x, you'd think, but isn't calculated properly for some reason
	const useY = props.background!.y; // same with props.y
	const useHeight = props.background!.height; // ... and height ...

	return (
		<g>
			<rect
				data-president={props.name}
				data-start={props.start}
				data-end={props.end}
				x={useX}
				y={useY}
				width={width}
				height={useHeight}
				fill={fill}
				stroke="#555"
			/>
			<g transform={`translate(${useX + (width / 2 - 10)}, 50)`}>
				<text x={0} y={0} transform="rotate(90)" fontFamily="arial">
					{props.name} [{props.party!.map((p: string) => p[0]).join(',')}]{' '}
					{props.start} - {props.end}
				</text>
			</g>
		</g>
	);
};
export default PresidentBar;
