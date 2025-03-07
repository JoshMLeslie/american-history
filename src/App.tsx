import { useState } from 'react';
import './App.scss';
import cc from './data/chart-map.json';

type ChartCache = Record<SelectedChart['id'], SelectedChart>;
const chartCache = cc as ChartCache;

interface SelectedChart {
	title: string;
	description: string;
	id: string;
	data: any[];
}

function App() {
	const [selectedChart, setSelectedChart] = useState<null | SelectedChart>();
	const [showMoreBlurb, setShowMoreBlurb] = useState(false);
	const toggleBlurb = () => setShowMoreBlurb(!showMoreBlurb);

	const selectChart = (chartID: SelectedChart['id']) => () => {
		setSelectedChart(chartCache[chartID]);
	};

	return (
		<>
			<div id="chart-select-nav">
				<button onClick={selectChart('one')}>Chart One</button>
				<button onClick={selectChart('two')}>Chart Two</button>
				<button onClick={selectChart('three')}>Chart Three</button>
				<button onClick={selectChart('four')}>Chart Four</button>
			</div>
			<div id="chart-super-container">
				<div id="selected-chart"></div>
				<div
					id="selected-chart-blurb"
					className={showMoreBlurb ? 'expand' : ''}
				>
					<div id="chart-blurb-actions">
						<h2>{selectedChart?.title}</h2>
						<button id="chart-blurb-more" onClick={toggleBlurb}>
							{showMoreBlurb ? 'Less' : 'More'}
						</button>
					</div>
					<div id="chart-blurb-content">{selectedChart?.description}</div>
				</div>
			</div>
		</>
	);
}

export default App;
