import { register } from 'register-service-worker';

// https://github.com/yyx990803/register-service-worker#readme
register(`sw.js`, {
	ready() {
		console.log('App is being served from cache by a service worker.\n' + 'For more details, visit https://goo.gl/AFskqB');
	},
	registered() {
		console.log('Service worker has been registered.');
	},
	cached() {
		console.log('Content has been cached for offline use.');
	},
	updatefound() {
		console.log('New content is downloading.');
	},
	updated() {
		console.log('New content is available; please refresh.');
	},
	offline() {
		console.log('No internet connection found. App is running in offline mode.');
	},
	error(error: Error) {
		console.warn('Error during service worker registration:', error);
	},
});
