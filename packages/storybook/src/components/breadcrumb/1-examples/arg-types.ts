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
				_href: '#/',
			},
			{
				_label: 'Unterseite der Startseite',
				_href: '#/unterseite',
			},
			{
				_label: 'Unterseite der Unterseite',
				_href: '#/unterseite/unterseite',
			},
		]),
	},
};
