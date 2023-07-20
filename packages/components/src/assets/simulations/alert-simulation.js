const on = {
	onClose: console.log,
};
const timeout = setTimeout(() => {
	document.querySelectorAll('kol-alert').forEach((alert) => {
		if (Math.random() > 0.5) {
			alert._on = on;
			alert.setAttribute('_has-closer', '');
		}
	});
}, 2500);
