(() => {
	const TEXTAREAS = document.querySelectorAll('off-kol-textarea');
	let timeout;

	TEXTAREAS.forEach((textarea) => {
		window.textarea = textarea;
		textarea._value = '';
		textarea._on = {
			onChange: (event) => {
				clearTimeout(timeout);
				setTimeout(() => {
					clearTimeout(timeout);
					console.log(event, textarea);
					textarea._value = '';
				}, 1000);
			},
		};
	});
})();
