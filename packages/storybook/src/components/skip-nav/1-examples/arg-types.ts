export const argTypes = {
	_ariaLabel: {
		name: 'Überschrift',
		control: {
			type: 'text',
		},
		type: {
			required: true,
		},
		defaultValue: 'Eine versteckte Navigation',
	},
	_links: {
		name: 'Links',
		control: {
			type: 'text',
		},
		type: {
			required: true,
		},
		defaultValue: "[{'_label':'Zum Logo','_selector':'kol-logo'}]",
	},
};
