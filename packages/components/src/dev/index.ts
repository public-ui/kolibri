import './theme-registration';

switch (location.pathname) {
	case '/dev/toaster.html':
		import('./toaster');
		break;
	case '/dev/input-error.html':
		import('./input-error');
		break;
	case '/dev/reprod-accordion-does-not-toggle-with-open.html':
		import('./reprod-accordion-does-not-toggle-with-open');
		break;
	case '/dev/details-synced-open-state.html':
		import('./details-synced-open-state');
		break;
	case '/dev/table-render-function.html':
		import('./table-render-function');
		break;
}
