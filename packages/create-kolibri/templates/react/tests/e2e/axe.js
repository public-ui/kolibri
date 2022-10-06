module.exports = {
	'@tags': ['accessibility'],
	'ensure site is accessible': function (browser) {
		browser
			.url('http://localhost:8080')
			.assert.title('Verwaltung Bibliotheken')
			.assert.containsText('h1', 'Bibliotheksverwaltung')
			.axeInject()
			.axeRun('body', {
				rules: { 'color-contrast': { enabled: false } },
			})
			.end();
	},
};
