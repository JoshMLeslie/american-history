import { isMobile as testMobile } from 'is-mobile';
import './App.css';

function App() {
	const mobileTest = testMobile();

	return (
		<div id="app-container">
			<div
				className={mobileTest ? 'mobile' : 'desktop'}
				id="chart-select-bar"
			></div>
			<div id="chart-super-container">
				<div id="selected-chart"></div>
				<div id="selected-chart-blurb"></div>
			</div>
		</div>
	);
}

export default App;
