export const argTypes = {
	/*buttons: {
    name: 'Buttons',
    control: {
      type: 'text',
    },
    defaultValue: "<KolButton _label='Button 1'></KolButton><KolButton _label='Button 2'></KolButton>",
  },*/
	_nestled: {
		name: 'Nestled',
		options: ['keine', 'top', 'bottom', 'left', 'right'],
		control: {
			type: 'select',
		},
		defaultValue: '',
	},
};
