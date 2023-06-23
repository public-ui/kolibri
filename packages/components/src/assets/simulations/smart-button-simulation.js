setTimeout(() => {
	const smartButtons = document.querySelectorAll('.smart-button');
	smartButtons.forEach((smartButton) => {
		smartButton._smartButton = {
			_label: 'Password einblenden',
			_icon: { left: { icon: 'icofont-eye' } },
			_hideLabel: true,
			_tooltipAlign: 'left',
			_on: {
				onClick: () => {
					smartButton._smartButton = {
						...smartButton._smartButton,
						_icon: {
							left: {
								icon: smartButton._smartButton._icon.left.icon === 'icofont-eye' ? 'icofont-eye-blocked' : 'icofont-eye',
							},
						},
						_label: smartButton._smartButton._icon.left.icon === 'icofont-eye' ? 'Password ausblenden' : 'Password einblenden',
					};
				},
			},
		};
	});
}, 2500);

document.querySelector('#input-text')._smartButton = {
	_customClass: 'bg-purple',
	_disabled: false,
	_icon: { left: { icon: 'codicon codicon-home' } },
	_id: 'text_smartbutton',
	_label: 'aria-label',
	_on: { onclick: console.log },
	_tooltipAlign: 'top',
	_variant: 'danger',
};
