import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router';
import './App.scss';
import { ChartKeys, chartMeta } from './data/chart-meta';

function AppLayout() {
	const navigate = useNavigate();

	useEffect(() => {
		const redirectPath = sessionStorage.getItem('redirectFromExternal');
		if (redirectPath) {
			sessionStorage.removeItem('redirectFromExternal');
			navigate(redirectPath, {replace: true});
		}
	}, [navigate]);

	const [selectedChart, setSelectedChart] = useState<string>('');
	const [showMoreBlurb, setShowMoreBlurb] = useState(false);
	const toggleBlurb = () => setShowMoreBlurb(!showMoreBlurb);

	return (
		<>
			<div id="chart-select-nav">
				<Link
					to={`/chart/${ChartKeys.TMR}`}
					onClick={() => setSelectedChart(ChartKeys.TMR)}
				>
					Top Marginal Rate
				</Link>
				<Link
					to={`/chart/${ChartKeys.NPW}`}
					onClick={() => setSelectedChart(ChartKeys.NPW)}
				>
					Net Personal Wealth
				</Link>
			</div>
			<div id="chart-super-container">
				<div id="selected-chart">
					<Outlet />
				</div>
				<div
					id="selected-chart-blurb"
					className={showMoreBlurb ? 'expand' : ''}
				>
					<div id="chart-blurb-actions">
						<h2>{chartMeta[selectedChart]?.title}</h2>
						<button id="chart-blurb-more" onClick={toggleBlurb}>
							{showMoreBlurb ? 'Less' : 'More'}
						</button>
					</div>
					<p id="chart-blurb-content">
						{chartMeta[selectedChart]?.description}
					</p>
				</div>
			</div>
		</>
	);
}

export default AppLayout;
