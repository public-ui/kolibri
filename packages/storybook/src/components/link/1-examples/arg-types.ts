import { Icofont } from '../../icon-icofont/icofont';

const ICON_OPTIONS = [''].concat(Object.getOwnPropertyNames(Icofont));
export const argTypes = {
	_href: {
		name: 'Link',
		control: {
			type: 'text',
		},
		defaultValue: 'https://www.w3.org',
	},
	_icon: {
		name: 'Icon',
		control: {
			type: 'select',
		},
		options: ICON_OPTIONS,
		defaultValue: 'home',
	},
	_iconAlign: {
		name: 'Icon-Ausrichtung',
		control: {
			type: 'select',
		},
		options: ['left', 'right'],
		defaultValue: 'left',
	},
	_iconOnly: {
		name: 'Nur Icon',
		control: {
			type: 'boolean',
		},
		defaultValue: false,
	},
	_target: {
		name: 'Öffnungsverhalten',
		control: {
			type: 'select',
		},
		options: ['_self', '_blank'],
		defaultValue: '_self',
	},
	_fill: {
		name: 'Volle Breite',
		control: {
			type: 'boolean',
		},
		defaultValue: false,
	},
	_stealth: {
		name: 'Nur bei Focus sichtbar',
		control: {
			type: 'boolean',
		},
		defaultValue: false,
	},
	_underline: {
		name: 'Unterstrich anzeigen',
		control: {
			type: 'boolean',
		},
		defaultValue: true,
	},
	_useCase: {
		name: 'Verwendung als',
		control: {
			type: 'select',
		},
		options: ['text', 'image'],
		defaultValue: 'text',
	},
	_selector: {
		name: 'Sprungmarke Ziel',
		control: {
			type: 'text',
		},
		defaultValue: '',
	},
	content: {
		name: 'Linktext',
		control: {
			type: 'text',
		},
		defaultValue: 'Dies ist ein Link',
	},
};
