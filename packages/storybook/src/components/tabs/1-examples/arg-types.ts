export const argTypes = {
	_ariaLabel: {
		name: 'Eindeutige Beschriftung der Tab-Navigation',
		control: {
			type: 'text',
		},
		defaultValue: 'Tab-Navigation',
	},
	_selected: {
		name: 'Ausgewähltes Tab',
		control: {
			type: 'number',
		},
		defaultValue: 0,
	},
	_tabs: {
		name: 'Schalter der Tab-Leiste',
		control: {
			type: 'text',
		},
		defaultValue: "[{'_label':'Tab 1'},{'_label':'Tab 2'},{'_label':'Tab 3'}]",
	},
	_tabsAlign: {
		name: 'Ausrichtung der Tab-Leiste',
		control: {
			type: 'select',
			options: ['top', 'right', 'bottom', 'left'],
		},
		defaultValue: 'top',
	},
};
