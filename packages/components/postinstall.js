module.exports = () => {
	if (process.env.CI === 'true') {
		return;
	}

	const isGerman = (process.env.LANG || '').startsWith('de');
	const english = [
		'Help us make KoliBri even more accessible!',
		'- Star our repo & submit pull requests',
		'- Give feedback via GitHub issues',
		'- Documentation – https://public-ui.github.io',
		'- Open Source – https://github.com/public-ui',
	].join('\n');
	const german = [
		'Hilf mit, KoliBri noch barrierefreier zu machen!',
		'- Starte unser Repo & reiche Pull-Requests ein',
		'- Gib Feedback über GitHub Issues',
		'- Dokumentation – https://public-ui.github.io',
		'- Open Source – https://github.com/public-ui',
	].join('\n');

	console.log(isGerman ? german : english);
};

if (require.main === module) {
	module.exports();
}
