export const argTypes = {
	_headline: {
		name: 'Titel',
		control: {
			type: 'text',
		},
		type: {
			required: true,
		},
		defaultValue: 'Ein Beispieltext',
	},
	_level: {
		name: 'Überschrift (h1 bis h6)',
		control: {
			type: 'select',
		},
		options: [1, 2, 3, 4, 5, 6],
		type: {
			required: true,
		},
		defaultValue: 1,
	},
	_hasFooter: {
		name: 'Fußbereich anzeigen',
		control: {
			type: 'boolean',
		},
		defaultValue: true,
	},
	content: {
		name: 'Card-Inhalt',
		control: {
			type: 'text',
		},
		defaultValue:
			'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.',
	},
	footer: {
		name: 'Fußbereich-Inhalt',
		control: {
			type: 'text',
		},
		defaultValue: 'Beliebiger Inhalt im Fußbereich der Card.',
	},
	header: {
		name: 'Headerbereich-Inhalt',
		control: {
			type: 'text',
		},
		defaultValue: 'Beliebiger Inhalt im Headerbereich der Card.',
	},
};
