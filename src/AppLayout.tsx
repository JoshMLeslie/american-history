import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import './App.scss';
import { ChartKeys, chartMeta } from './data/chart-meta';

function AppLayout() {
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const redirectPath = sessionStorage.getItem('redirectFromExternal');
		if (redirectPath) {
			sessionStorage.removeItem('redirectFromExternal');
			navigate(redirectPath, {replace: true});
		}
	}, [navigate]);

	useEffect(() => {
		// handle direct navigation
		if (location.pathname) {
			const locationParts = location.pathname.split('/').filter(Boolean);
			if (locationParts[0] === 'chart' && !!locationParts[1]) {
				setChartId(locationParts[1]);
			}
		}
	}, [location.pathname]);

	const [chartId, setChartId] = useState<string>('');
	const [showMoreBlurb, setShowMoreBlurb] = useState(false);
	const toggleBlurb = () => setShowMoreBlurb(!showMoreBlurb);

	return (
		<>
			<div id="chart-select-nav">
				<Link
					to={`/chart/${ChartKeys.TMR}`}
					onClick={() => setChartId(ChartKeys.TMR)}
				>
					Top Marginal Rate
				</Link>
				<Link
					to={`/chart/${ChartKeys.NPW}`}
					onClick={() => setChartId(ChartKeys.NPW)}
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
						<h2>{chartMeta[chartId]?.title}</h2>
						{chartMeta[chartId]?.description.length > 500 && (
							<button id="chart-blurb-more" onClick={toggleBlurb}>
								{showMoreBlurb ? 'Less' : 'More'}
							</button>
						)}
					</div>
					<p id="chart-blurb-content">{chartMeta[chartId]?.description}</p>
				</div>
			</div>
		</>
	);
}

export default AppLayout;
