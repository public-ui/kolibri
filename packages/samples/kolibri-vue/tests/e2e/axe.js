const goHome = (browser) => {
	return browser.navigateTo('http://localhost:8080/').waitForElementVisible('body');
};
const checkAxe = (browser) => {
	return browser.axeInject().axeRun();
};

describe(`app`, function () {
	this.tags = ['app'];
	it('axe', function (browser) {
		const home = goHome(browser);
		checkAxe(home);
	});
	it('create', async function (browser) {
		await browser.navigateTo('http://localhost:8080/').waitForElementVisible('body');
		const kolNav = await browser.getShadowRoot('kol-nav');
		const link = await kolNav.find('a[href="#/form"]');
		await browser.click(link);
		const kolHeading = await browser.getShadowRoot('kol-heading');
		const h1 = await kolHeading.find('h1');
		await browser.assert.containsText(h1, 'Belegerfassung');
		await browser.assert.containsText('kol-heading', 'Belegerfassung');
	});
});
