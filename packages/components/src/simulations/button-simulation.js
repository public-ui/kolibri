var buttons = document.querySelectorAll('kol-button.not-used');
buttons.forEach((button) => {
	button._on = {
		onClick: () => {
			alert(`Button "${button._label}" wurde geklickt.`);
		},
	};
});
