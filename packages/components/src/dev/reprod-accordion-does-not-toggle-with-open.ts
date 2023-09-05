setInterval(() => {
	const items = document.querySelectorAll('kol-accordion,kol-details');
	if (items) {
		items.forEach((item) => {
			const open = item.hasAttribute('_open');
			if (open) {
				item.removeAttribute('_open');
			} else {
				item.setAttribute('_open', '');
			}
		});
	}
}, 1000);

export default {}; // make file a module
