export const argTypes = {
	_links: {
		name: 'Menüpunkte',
		type: {
			name: 'string',
			required: true,
		},
		defaultValue: JSON.stringify([
			{
				_label: 'Startseite',
				_href: 'startseite',
				_icon: 'icofont-home',
			},
			{
				_label: 'Über uns',
				_href: 'ueber-uns',
				_icon: 'icofont-compass',
			},
			{
				_label: 'Bereiche',
				_href: 'bereiche',
				_children: [
					{
						_label: 'KFZ-Angelegenheiten',
						_href: 'bereiche/kfz-angelegenheiten',
						_icon: 'icofont-woodpecker',
						_children: [
							{
								_label: 'Neuanmeldung',
								_href: 'bereiche/kfz-angelegenheiten/neuanmeldung',
							},
							{
								_label: 'Abmeldung',
								_href: 'bereiche/kfz-angelegenheiten/abmeldung',
							},
							{
								_label: 'Ummeldung',
								_href: 'bereiche/kfz-angelegenheiten/ummeldung',
							},
						],
					},
					{
						_label: 'Meldewesen',
						_href: 'meldewesen',
						_icon: 'icofont-woodpecker',
					},
				],
			},
			{
				_label: 'Kontakt',
				_href: 'kontakt',
				_icon: 'icofont-at',
			},
		]),
	},
	_compact: {
		name: 'Kompakte Darstellung',
		control: {
			type: 'select',
		},
		options: [true, false],
		type: {
			required: true,
		},
		defaultValue: 'false',
	},
	_hasCompactButton: {
		name: 'Link für kompakte Darstellung',
		control: {
			type: 'select',
		},
		options: [true, false],
		type: {
			required: true,
		},
		defaultValue: 'false',
	},
};
