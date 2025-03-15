import {
	BrowserRouter,
	Route,
	Routes
} from 'react-router';
import './App.scss';
import AppLayout from './AppLayout';
import NetPersonalWealthChart from './charts/NetPersonalWealth.chart';
import TopMarginalRateChart from './charts/TopMarginalRate.chart';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<AppLayout />}>
					<Route path="chart">
						<Route path="home" element={<div>Home</div>} />
						<Route path="tmr" element={<TopMarginalRateChart />} />
						<Route path="npw" element={<NetPersonalWealthChart />} />
						<Route path="*" element={<div>No chart found</div>} />
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
