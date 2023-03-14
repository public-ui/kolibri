export const argTypes = {
	_org: {
		name: 'Abkürzung des Ministeriums',
		control: {
			type: 'select',
		},
		options: ['BReg', 'BMF', 'BMI', 'AA', 'BMWi', 'BMJV', 'BMAS', 'BMVg', 'BMEL', 'BMFSFJ', 'BMG', 'BMVI', 'BMU', 'BMBF', 'BMZ'],
		type: {
			required: true,
		},
		defaultValue: 'BReg',
	},
};
