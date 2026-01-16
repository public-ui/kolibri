module.exports = {
	content: ['./src/**/*.tsx', './src/**/*.ts', './src/**/*.html'],
	theme: {
		extend: {
			borderRadius: {
				'kolibri-md': '0.375rem',
				'kolibri-sm': '0.25rem',
			},
			colors: {
				'kolibri-primary': '#1b6cfb',
				'kolibri-primary-contrast': '#ffffff',
				'kolibri-surface': '#ffffff',
				'kolibri-text': '#111827',
			},
			fontFamily: {
				kolibri: ['"Inter"', 'Verdana', 'Arial', 'sans-serif'],
			},
		},
	},
	plugins: [
		function tokensPlugin({ addBase, theme }) {
			addBase({
				':root': {
					'--kolibri-color-primary': theme('colors.kolibri-primary'),
					'--kolibri-color-primary-contrast': theme('colors.kolibri-primary-contrast'),
					'--kolibri-color-surface': theme('colors.kolibri-surface'),
					'--kolibri-color-text': theme('colors.kolibri-text'),
					'--kolibri-font-family': theme('fontFamily.kolibri').join(', '),
					'--kolibri-radius-md': theme('borderRadius.kolibri-md'),
					'--kolibri-radius-sm': theme('borderRadius.kolibri-sm'),
				},
			});
		},
	],
};
