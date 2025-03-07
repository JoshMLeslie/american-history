import { useState } from 'react';
import './App.scss';

function App() {
	const [showMoreBlurb, setShowMoreBlurb] = useState(false);
	const toggleBlurb = () => setShowMoreBlurb(!showMoreBlurb);

	return (
		<>
			<div id="chart-select-bar"></div>
			<div id="chart-super-container">
				<div id="selected-chart"></div>
				<div
					id="selected-chart-blurb"
					className={showMoreBlurb ? 'expand' : ''}
				>
					<button id="chart-blurb-more" onClick={toggleBlurb}>
						{showMoreBlurb ? 'Less' : 'More'}
					</button>
					<div id="chart-blurb-content"></div>
				</div>
			</div>
		</>
	);
}

export default App;
