import { useState } from 'react';
import './App.scss';
import ChartComponent from './ChartComponent';
import cc from './data/chart-cache';
import { ChartCache, SelectedChart } from './type/chart';

const chartCache = await cc() as ChartCache;

function App() {
	const [selectedChart, setSelectedChart] = useState<null | SelectedChart>(null);
	const [showMoreBlurb, setShowMoreBlurb] = useState(false);
	const toggleBlurb = () => setShowMoreBlurb(!showMoreBlurb);

	const selectChart = (chartID: SelectedChart['id']) => () => {
		setSelectedChart(chartCache[chartID]);
	};

	return (
		<>
			<div id="chart-select-nav">
				{Object.values(chartCache).map((chartData) => (
					<button key={chartData.id} onClick={selectChart(chartData.id)}>
						{chartData.title}
					</button>
				))}
			</div>
			<div id="chart-super-container">
				<div id="selected-chart">
					<ChartComponent selectedChart={selectedChart} />
				</div>
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
					<p id="chart-blurb-content">{selectedChart?.description}</p>
				</div>
			</div>
		</>
	);
}

export default App;
