module.exports = async () => {
	if (process.env.CI === 'true') {
		return;
	}
	const { default: chalk } = await import('chalk');
	const { default: boxen } = await import('boxen');
	const figlet = require('figlet');

	const isGerman = (process.env.LANG || '').startsWith('de');
	const title = chalk.cyan(figlet.textSync('KoliBri', { font: 'Standard' }));

	const english = [
		'Help us make KoliBri even more accessible!',
		'',
		'\u{1F31F}  Star our repo & submit pull requests',
		'\u{1F5E8}\uFE0F  Give feedback via GitHub issues',
		'\u{1F91D}  Docs & publiccode: https://public-ui.github.io/docs',
		'\u{1F4B6}  Public Money? Public Code! https://publiccode.eu/',
	].join('\n');

	const german = [
		'Hilf mit, KoliBri noch barrierefreier zu machen!',
		'',
		'\u{1F31F}  Starte unser Repo & reiche Pull-Requests ein',
		'\u{1F5E8}\uFE0F  Gib Feedback über GitHub Issues',
		'\u{1F91D}  Dokumentation & Publiccode: https://public-ui.github.io/docs',
		'\u{1F4B6}  Public Money? Public Code! https://publiccode.eu/',
	].join('\n');

	const message = isGerman ? german : english;

	console.log(title);
	console.log(boxen(message, { padding: 1, borderStyle: 'round' }));
};

if (require.main === module) {
	module.exports();
}
