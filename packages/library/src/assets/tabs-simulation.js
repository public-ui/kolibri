setTimeout(() => {
	const callback = (name) => {
		return (event, index) => {
			console.log(name, event, index);
		};
	};
	let tabs = document.querySelector('#tabs-with-events');
	if (tabs) {
		tabs._on = {
			onCreate: {
				label: 'Neu Text anpassbar',
				callback: callback('onCreate'),
			},
			onSelect: callback('onSelect'),
		};
		tabs._tabs = [
			{ _label: 'Tab 1', _icon: 'home' },
			{ _label: 'Tab 2', _cta: 'primary' },
			{ _label: 'Tab 3', _disabled: true },
			{
				_label: 'Tab 4',
				_on: {
					onClose: callback('onClose'),
				},
			},
			{
				_label: 'Tab 5',
				_on: {
					onClose: true,
				},
			},
			{ _label: 'Tab 6' },
			{ _label: 'Tab 7' },
			{ _label: 'Tab 8' },
		];
	}
	tabs = document.querySelector('#tabs-with-create');
	tabs._on = {
		onCreate: callback('onCreate'),
	};
}, 2500);
