import './theme-registration';

switch (location.pathname) {
	case '/dev/toaster.html':
		import('./toaster');
		break;
	case '/dev/reprod-accordion-does-not-toggle-with-open.html':
		import('./reprod-accordion-does-not-toggle-with-open');
		break;
	case '/dev/details-synced-open-state.html':
		import('./details-synced-open-state');
		break;
}
