module.exports = async () => {
	if (process.env.CI === 'true') {
		return;
	}
	const { default: chalk } = await import('chalk');
	const { default: boxen } = await import('boxen');
	const figlet = require('figlet');

	const title = chalk.cyan(figlet.textSync('KoliBri', { font: 'Standard' }));
	const message = [
		'Hilf mit, KoliBri noch barrierefreier zu machen!',
		'',
		'\u{1F31F}  Starte unser Repo & reiche Pull-Requests ein',
		'\u{1F5E8}\uFE0F  Gib Feedback über GitHub Issues',
		'\u{1F91D}  Dokumentation & Manifest: https://public-ui.github.io/docs',
	].join('\n');

	console.log(title);
	console.log(boxen(message, { padding: 1, borderStyle: 'round' }));
};

if (require.main === module) {
	module.exports();
}
