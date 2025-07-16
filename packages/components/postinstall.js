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
		'-  Star our repo & submit pull requests',
		'-  Give feedback via GitHub issues',
		'-  Documentation – https://public-ui.github.io',
		'-  Open Source – https://github.com/public-ui',
	].join('\n');

	const german = [
		'Hilf mit, KoliBri noch barrierefreier zu machen!',
		'',
		'-  Starte unser Repo & reiche Pull-Requests ein',
		'-  Gib Feedback über GitHub Issues',
		'-  Dokumentation – https://public-ui.github.io',
		'-  Open Source – https://github.com/public-ui',
	].join('\n');

	const message = isGerman ? german : english;

	console.log(title);
	console.log(boxen(message, { padding: 1, borderStyle: 'round' }));
};

if (require.main === module) {
	module.exports();
}
