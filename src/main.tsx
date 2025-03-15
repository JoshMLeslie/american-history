import { isMobile } from 'is-mobile';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const handleOrientation = () => {
	document.body.classList.remove('portrait', 'landscape');
	const orient = screen.orientation.type.split('-')[0]; // ignore 'upside down'
	document.body.classList.add(orient);
};

if (isMobile()) {
	document.body.classList.add('mobile');
	handleOrientation();
	screen.orientation.onchange = handleOrientation;
}

createRoot(document.getElementById('root')!).render(<App />);
