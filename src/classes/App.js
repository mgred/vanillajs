export default class App {

	constructor(node, hash) {
		this.node = node;
		this.hash = hash;
		this.routes = [];
	}

	when(hash, config) {
		this.routes.push({hash, config});
		return this;
	}

	start() {
		for(let route of this.routes) {
			if(route.hash === this.hash) {
				const routeEl = document.querySelector('#' + route.config.template);
				this.node.insertAdjacentHTML('afterend', routeEl.innerHTML);
				return new route.config.controller(routeEl, ...route.config.resolve);
			}
		}
	}
}
