module.exports = {
	context: {
		include: [['html']],
		exclude: [['.advertising']],
	},
	options: {
		runOnly: {
			type: 'tag',
			values: ['wcag2a', 'wcag2aa'],
		},
		verbose: true,
		timeout: 2000,
	},
};
