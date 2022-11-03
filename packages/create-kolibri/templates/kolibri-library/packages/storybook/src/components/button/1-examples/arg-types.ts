import { Icofont } from '../../icon-icofont/icofont';

const ICON_OPTIONS = [''].concat(Object.getOwnPropertyNames(Icofont));
export const argTypes = {
	_customClass: {
		name: 'Custom Class',
		control: {
			type: 'text',
		},
		type: {
			required: false,
		},
	},
	_disabled: {
		name: 'Deaktiviert',
		control: {
			type: 'boolean',
		},
	},
	_icon: {
		name: 'Icon',
		control: {
			type: 'text',
		},
		defaultValue: "{'top': {'icon':'icofont-arrow-up'}}",
	},
	_iconOnly: {
		name: 'Nur Icon',
		control: {
			type: 'boolean',
		},
	},
	/*_id: {
    name: 'ID',
    control: {
      type: 'text',
    },
  },*/
	_label: {
		name: 'Label',
		control: {
			type: 'text',
		},
		type: {
			required: true,
		},
	},
	_tooltipAlign: {
		name: 'Tooltip-Ausrichtung',
		control: {
			type: 'select',
		},
		options: ['top', 'right', 'bottom', 'left'],
	},
	_variant: {
		name: 'Variante',
		control: {
			type: 'select',
		},
		options: ['primary', 'secondary', 'normal', 'danger', 'ghost', 'custom'],
	},
};
