import { useCallback, useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import './App.scss';
import { ChartKeys, chartMeta } from './data/chart-meta';

function AppLayout() {
	const navigate = useNavigate();
	const location = useLocation();

	const [chartId, setChartId] = useState<string>('home');
	const [showMoreBlurb, setShowMoreBlurb] = useState(false);
	const toggleBlurb = () => setShowMoreBlurb((s) => !s);

	const handleEscBlurb = useCallback((e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			setShowMoreBlurb(false);
		}
	}, []);

	useEffect(() => {
		document.addEventListener('keydown', handleEscBlurb);
		return () => {
			document.removeEventListener('keydown', handleEscBlurb);
		};
	}, []);

	useEffect(() => {
		// handle redirect for limited rendering e.g. github pages
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

	return (
		<>
			<div id="chart-select-nav">
				<Link
					className="button"
					to="/"
					onClick={() => setChartId(ChartKeys.HOME)}
				>
					Home
				</Link>
				<Link
					className="button"
					to={`/chart/${ChartKeys.TMR}`}
					onClick={() => setChartId(ChartKeys.TMR)}
				>
					Top Marginal Rate
				</Link>
				<Link
					className="button"
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
						<button id="chart-blurb-more" onClick={toggleBlurb}>
							{showMoreBlurb ? 'Shrink' : 'Expand'}
						</button>
					</div>
					<p id="chart-blurb-content">{chartMeta[chartId]?.description}</p>
				</div>
			</div>
		</>
	);
}

export default AppLayout;
