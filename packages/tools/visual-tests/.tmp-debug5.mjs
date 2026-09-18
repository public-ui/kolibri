import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });

await page.addInitScript(() => {
	window.__propSets = [];
	const orig = CSSStyleDeclaration.prototype.setProperty;
	CSSStyleDeclaration.prototype.setProperty = function (name, value, prio) {
		try {
			if (name === 'visibility') {
				window.__propSets.push({ wert: String(value), stack: new Error().stack?.split('\n').slice(1, 7).join(' | ').slice(0, 700) });
			}
		} catch {}
		return orig.call(this, name, value, prio);
	};
});

await page.goto('http://localhost:3030/4', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(4000);

const auswertung = await page.evaluate(() => window.__propSets ?? []);
console.log(JSON.stringify(auswertung, null, 1));
await browser.close();
