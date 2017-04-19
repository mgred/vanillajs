import About from './about.controller';

let p = new Promise();

export const aboutConfig = {
	resolve : ['Hello World'],
	controller : About,
	template : 'about'
};
