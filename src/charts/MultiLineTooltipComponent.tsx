
const MultiLineTooltipRow = (datum: any) => (
	<div
		key={datum.name}
		className="label"
		style={{
			display: 'flex',
			flexDirection: 'column',
		}}
	>
		<div
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				gap: '8px',
			}}
		>
			<span style={{color: datum.color}}>{datum.name.split('-')[0]}</span>
			<span>{Number(datum.value).toFixed(2)}%</span>
		</div>
	</div>
);

const MultiLineTooltipComponent: React.FC<{
	active: boolean;
	payload: Record<string, any>;
	label: string;
}> = ({active, payload, label}) => {
	const sorted = Object.values(payload).sort(
		(a, b) => (b.value as number) - (a.value as number)
	);
	const elData = sorted.reduce<{top: any[]; bottom: any[]}>(
		(acc, datum) => {
			if (datum.name === 'start') {
				// not sure how this gets into the payload.
				return acc;
			}
			if (datum.name.includes('1%')) {
				acc.top.push(datum);
			} else {
				acc.bottom.push(datum);
			}
			return acc;
		},
		{
			top: [],
			bottom: [],
		}
	);
	return (
		active &&
		payload?.length && (
			<div className="top-marginal-rate-tooltip">
				<p>{label}</p>
				<p>Top 1%</p>
				{elData.top.map(MultiLineTooltipRow)}
				<hr style={{width: '100%'}} />
				<p>Bottom 50%</p>
				{elData.bottom.map(MultiLineTooltipRow)}
			</div>
		)
	);
};

export default MultiLineTooltipComponent;