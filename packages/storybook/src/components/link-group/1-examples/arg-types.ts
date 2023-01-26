export const argTypes = {
	_heading: {
		name: 'Überschrift',
		control: {
			type: 'text',
		},
		defaultValue: 'Überschrift für Linkliste',
	},
	_links: {
		name: 'Links',
		control: {
			type: 'text',
		},
		defaultValue: JSON.stringify([
			{
				_label: 'Link nur Text',
				_href: '#/',
			},
			{
				_label: 'Link nur Text',
				_href: '#/',
			},
			{
				_label: 'Link nur Text',
				_href: '#/',
			},
		]),
	},
	_orientation: {
		name: 'Ausrichtung',
		control: {
			type: 'select',
		},
		options: ['vertical', 'horizontal'],
		type: {
			required: true,
		},
		defaultValue: 'vertical',
	},
	_listStyleType: {
		name: 'Listensymbol',
		control: {
			type: 'select',
		},
		options: ['disc', 'circle', 'square', 'none'],
		type: {
			required: true,
		},
		defaultValue: 'disc',
	},
};
