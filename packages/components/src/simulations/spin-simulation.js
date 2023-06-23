let button = document.querySelector('kol-button[_label="Aktion ausführen"]');

if (button) {
	button._on = {
		onClick: () => {
			button.setAttribute('_disabled', 'true');
			var spins = document.querySelectorAll('kol-spin');
			spins.forEach((spin) => {
				spin.removeAttribute('style');
				spin.setAttribute('_show', 'true');
			});
			let timeout = setTimeout(() => {
				clearTimeout(timeout);
				spins.forEach((spin) => {
					spin.removeAttribute('_show');
				});
				button.removeAttribute('_disabled');
			}, 7500);
		},
	};
}
