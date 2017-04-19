import App from './classes/App.js';
import { aboutConfig } from './routes/about.config';

const hash = window.location.hash.slice(1);
const el = document.querySelector('main');

const app = new App(el, hash);

app
	.when('about', aboutConfig)
	.start();
