describe(`Demo's`, () => {
	it('ecosia.org', (browser) => {
		browser.url('http://localhost:8080/').waitForElementVisible('body').axeInject().axeRun().end();
	});
});
