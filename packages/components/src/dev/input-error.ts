const input = document.querySelector('kol-input-text');
if (input) {
	setInterval(() => {
		const error = input.hasAttribute('_error');
		if (error) {
			input.removeAttribute('_error');
		} else {
			input.setAttribute('_error', 'This is an error');
		}
	}, 1000);
}

export default {}; // make file a module
