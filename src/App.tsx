import { BrowserRouter, Route, Routes } from 'react-router';
import './App.scss';
import AppLayout from './AppLayout';

function App() {
	return (
		<BrowserRouter basename={import.meta.env.BASE_URL}>
			<Routes>
				<Route path="/" element={<AppLayout />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
