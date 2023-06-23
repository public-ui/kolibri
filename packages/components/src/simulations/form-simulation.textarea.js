const textAreas = document.querySelectorAll('off-kol-textarea');
let timeout;

if (textAreas) {
	textAreas.forEach((textarea) => {
		window.textarea = textarea;
		textarea._value = '';
		textarea._on = {
			onChange: (event) => {
				clearTimeout(timeout);
				setTimeout(() => {
					console.log(event, textarea);
					textarea._value = '';
				}, 1000);
			},
		};
	});
}
