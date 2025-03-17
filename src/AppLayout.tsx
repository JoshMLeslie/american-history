import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import './App.scss';
import LifeExpectancyComponent from './charts/LifeExpectancyComponent.chart';
import NetPersonalWealthChart from './charts/NetPersonalWealth.chart';
import PretaxNationalIncomeChart from './charts/PretaxNationalIncome.chart';
import TopMarginalRateChart from './charts/TopMarginalRate.chart';
import { ChartKeys, chartMeta } from './data/chart-meta';

function AppLayout() {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();

	const [chartId, setChartId] = useState<ChartKeys>(ChartKeys.HOME);
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
		if (searchParams.has('chart')) {
			setChartId(searchParams.get('chart')! as ChartKeys);
		}
	}, [searchParams]);

	const handleChartId = (id: ChartKeys) => {
		setSearchParams({chart: id});
		setChartId(id);
	};

	const ChartSwitcher = useCallback(() => {
		switch (chartId) {
			case ChartKeys.HOME:
				return <div>Home</div>;
			case ChartKeys.TMR:
				return <TopMarginalRateChart />;
			case ChartKeys.NPW:
				return <NetPersonalWealthChart />;
			case ChartKeys.PNI:
				return <PretaxNationalIncomeChart />;
			case ChartKeys.LEVHE:
				return <LifeExpectancyComponent />;
			default:
				return <div>Error</div>;
		}
	}, [chartId]);

	return (
		<>
			<div id="mobile-portrait-warning" className="basic-centered">
				Please rotate your device to landscape mode to view
			</div>
			<div id="app-layout-content">
				<div id="chart-select-nav">
					<button
						className="button"
						onClick={() => handleChartId(ChartKeys.HOME)}
					>
						Home
					</button>
					<button
						className="button"
						onClick={() => handleChartId(ChartKeys.TMR)}
					>
						Top Marginal Rate
					</button>
					<button
						className="button"
						onClick={() => handleChartId(ChartKeys.NPW)}
					>
						Net Personal Wealth
					</button>
					<button
						className="button"
						onClick={() => handleChartId(ChartKeys.PNI)}
					>
						Pretax National Income
					</button>
					<button
						className="button"
						onClick={() => handleChartId(ChartKeys.LEVHE)}
					>
						Life Expectancy
					</button>
				</div>
				<div id="chart-super-container">
					<div id="selected-chart">{<ChartSwitcher />}</div>
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
			</div>
		</>
	);
}

export default AppLayout;
