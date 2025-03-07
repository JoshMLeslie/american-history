import { isMobile } from 'is-mobile';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

if (isMobile()) {
	document.body.classList.add('mobile');
}

createRoot(document.getElementById('root')!).render(<App />);
