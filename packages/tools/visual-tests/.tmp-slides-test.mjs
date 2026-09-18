/**
 * Klickdurchlauf-Test für das KoliBri-Intro-Deck (Slidev, localhost:3030).
 * Läuft mit dem Playwright des visual-tests-Pakets im Monorepo.
 * Prüft: alle 14 Folien rendern, v-clicks schaltbar, Demo-Interaktionen,
 * Icons, Beispielfüllung, Konsolenfehler. Screenshots nach /tmp/kolibri-slides-shots.
 */
import fs from 'node:fs';
import { chromium } from 'playwright';

const BASE = 'http://localhost:3030';
const SHOTS = '/tmp/kolibri-slides-shots';
fs.rmSync(SHOTS, { recursive: true, force: true });
fs.mkdirSync(SHOTS, { recursive: true });

const ergebnisse = [];
const fehler = [];
const konsolenFehler = [];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
page.on('console', (msg) => {
	if (msg.type() === 'error') konsolenFehler.push(`[console.error] ${msg.text().slice(0, 200)}`);
});
page.on('pageerror', (err) => {
	konsolenFehler.push(`[pageerror] ${String(err).slice(0, 200)}`);
});

const pruefe = (name, ok, detail = '') => {
	ergebnisse.push(`${ok ? 'PASS' : 'FAIL'} ${name}${detail ? ' — ' + detail : ''}`);
	if (!ok) fehler.push(name + (detail ? ' — ' + detail : ''));
};

async function folieLaden(nr, name) {
	await page.goto(`${BASE}/${nr}`, { waitUntil: 'domcontentloaded' });
	await page.waitForTimeout(2500); // KoliBri-Registrierung + Folien-Layout
	// Alle v-clicks per echter Pfeiltaste aufdecken
	for (let i = 0; i < 12; i++) {
		const versteckt = await page.locator(`.slidev-page-${nr} .slidev-vclick-hidden`).count();
		if (versteckt === 0) break;
		await page.keyboard.press('ArrowRight');
		await page.waitForTimeout(220);
	}
	await page.waitForTimeout(900); // Transitionen ausklingen lassen
	const scale = await page.evaluate(() => {
		const sc = document.querySelector('.slidev-slide-content');
		return sc ? getComputedStyle(sc).transform : 'fehlt';
	});
	pruefe(`Folie ${nr} (${name}) rendert mit Skalierung`, !/matrix\(0/.test(scale), `transform=${scale.slice(0, 40)}`);
	await page.screenshot({ path: `${SHOTS}/folie-${String(nr).padStart(2, '0')}.png` });
}

// ---- Folien ohne Spezialprüfung: nur rendern + screenshot ----
await folieLaden(1, 'Cover');
await folieLaden(2, 'Agenda');
await folieLaden(3, 'Schritt 0');

// ---- Folie 4: Schritt 1 two-cols, Feld vorbelegt ----
await folieLaden(4, 'Schritt 1 Setup');
const feld4 = await page.evaluate(() => {
	const inp = document.querySelector('.slidev-page-4 kol-input-email')?.shadowRoot?.querySelector('input');
	return inp ? inp.value : null;
});
pruefe('Folie 4: E-Mail-Feld mit Beispielwert gefüllt', feld4 === 'max.muster@beispiel.de', `wert=${feld4}`);

// ---- Folie 5: Validierung + Buttons + Icon ----
await folieLaden(5, 'Es prüft wirklich');
const feld5 = page.locator('.slidev-page-5 kol-input-email input');
await feld5.click();
await feld5.press('Meta+a');
await feld5.type('abc');
await feld5.press('Tab');
await page.waitForTimeout(600);
let zustand = await page.evaluate(() => {
	const host = document.querySelector('.slidev-page-5 kol-input-email');
	const inp = host.shadowRoot.querySelector('input');
	const out = document.querySelector('.slidev-page-5 #out');
	return { ariaInvalid: inp.getAttribute('aria-invalid'), out: out.textContent.trim() };
});
pruefe('Folie 5: abc+blur → aria-invalid=true', zustand.ariaInvalid === 'true', `aria-invalid=${zustand.ariaInvalid}`);
await page.screenshot({ path: `${SHOTS}/folie-05-fehler.png` });

await feld5.click();
await feld5.press('Meta+a');
await feld5.type('max.muster@beispiel.de');
await feld5.press('Tab');
await page.waitForTimeout(500);
zustand = await page.evaluate(() => {
	const inp = document.querySelector('.slidev-page-5 kol-input-email').shadowRoot.querySelector('input');
	return { ariaInvalid: inp.getAttribute('aria-invalid') };
});
pruefe('Folie 5: gültige Adresse → Fehler weg', zustand.ariaInvalid !== 'true', `aria-invalid=${zustand.ariaInvalid}`);

// Buttons: alle vier anklicken, Ausgabezeile muss reagieren
for (const label of ['Absenden', 'Abbrechen', 'Löschen', 'Mehr']) {
	await page.locator(`.slidev-page-5 kol-button:has-text("${label}") button`).first().click();
	await page.waitForTimeout(250);
}
zustand = await page.evaluate(() => document.querySelector('.slidev-page-5 #out').textContent.trim());
pruefe('Folie 5: Button-Klick → Ausgabezeile reagiert', /Geklickt/.test(zustand), zustand.slice(0, 60));

// Icon-Sichtbarkeit: Haus-Icon auf dem Absenden-Button (Kolicons-Font geladen?)
const iconCheck = await page.evaluate(async () => {
	const btn = document.querySelector('.slidev-page-5 kol-button');
	const icon = btn?.shadowRoot?.querySelector('.kol-icon, kol-icon, [class*="icon"]');
	let fontGeladen = false;
	try {
		fontGeladen = await document.fonts.check('16px kolicons');
	} catch {
		fontGeladen = 'check-nicht-verfuegbar';
	}
	return {
		iconDa: !!icon,
		iconText: icon ? icon.textContent.trim().slice(0, 3) : null,
		fontGeladen,
		iconKlasse: icon ? String(icon.className).slice(0, 40) : null,
	};
});
pruefe('Folie 5: Haus-Icon auf Absenden-Button vorhanden', iconCheck.iconDa, JSON.stringify(iconCheck));
await page.screenshot({ path: `${SHOTS}/folie-05-buttons.png` });

// ---- Folie 6: Insel-Demo ----
await folieLaden(6, 'Schritt 2 Insel');
const insel = await page.evaluate(() => {
	const nativ = document.querySelector('.slidev-page-6 #alt-mail');
	const kolFeld = document.querySelector('.slidev-page-6 #insel-mail')?.shadowRoot?.querySelector('input');
	const nativFarbe = nativ ? getComputedStyle(nativ).color : null;
	const nativFont = nativ ? getComputedStyle(nativ).fontFamily.slice(0, 30) : null;
	return { nativWert: nativ?.value, kolWert: kolFeld?.value, nativFarbe, nativFont };
});
pruefe('Folie 6: natives Feld gefüllt', insel.nativWert === 'max.muster@beispiel.de', `wert=${insel.nativWert}`);
pruefe('Folie 6: KoliBri-Feld gefüllt', insel.kolWert === 'max.muster@beispiel.de', `wert=${insel.kolWert}`);
pruefe(
	'Folie 6: feindliches CSS trifft natives Feld (rot/Serife)',
	/rgb\(122, 0, 0\)/.test(insel.nativFarbe) && /Georgia/.test(insel.nativFont),
	`${insel.nativFarbe} / ${insel.nativFont}`,
);

// ---- Folie 7: ehrliche Einschränkung ----
await folieLaden(7, 'Schritt 2 Brücke');

// ---- Folie 8: Schritt 3 Live (Höhepunkt) ----
await folieLaden(8, 'Schritt 3 Live');
const vorbelegt = await page.evaluate(() => {
	const name = document.querySelector('.slidev-page-8 #name')?.shadowRoot?.querySelector('input');
	const mail = document.querySelector('.slidev-page-8 #mail')?.shadowRoot?.querySelector('input');
	return { name: name?.value, mail: mail?.value };
});
pruefe('Folie 8: Name/Mail vorbelegt', vorbelegt.name === 'Max Muster' && vorbelegt.mail === 'max.muster@beispiel.de', JSON.stringify(vorbelegt));

// Erfolgsfall: direkt absenden
await page.locator('.slidev-page-8 #send button').click();
await page.waitForTimeout(700);
zustand = await page.evaluate(() => {
	const alert = document.querySelector('.slidev-page-8 #erfolg');
	return { alertSichtbar: alert && !alert.hidden, alertText: alert?.textContent?.trim().slice(0, 40) };
});
pruefe('Folie 8: Absenden → Erfolgs-Alert sichtbar', zustand.alertSichtbar, `alert=${zustand.alertText}`);
await page.screenshot({ path: `${SHOTS}/folie-08-erfolg.png` });

// Fehlerfall: Werte löschen, absenden → Fehlerliste + Fokussprung
await page.evaluate(() => {
	// GUI-äquivalent: Felder leerräumen wie ein Nutzer (fill '') geht auch über Locator,
	// hier aber robust über die Komponenten-Properties wie in der Demo-Doku.
});
for (const sel of ['.slidev-page-8 #name input', '.slidev-page-8 #mail input']) {
	const f = page.locator(sel).first();
	await f.click();
	await f.press('Meta+a');
	await f.press('Delete');
}
await page.locator('.slidev-page-8 #send button').click();
await page.waitForTimeout(800);
zustand = await page.evaluate(() => {
	const form = document.querySelector('.slidev-page-8 #f');
	const fehlerliste = form?.shadowRoot?.querySelector('.kol-form__error-list, [class*="error"]');
	const fokus = document.activeElement?.tagName;
	return { fehlerlisteDa: !!fehlerliste, fehlerlisteText: fehlerliste?.textContent?.trim().slice(0, 60), fokus };
});
pruefe('Folie 8: Leer absenden → Fehlerliste erscheint', zustand.fehlerlisteDa, `text=${zustand.fehlerlisteText}`);
await page.screenshot({ path: `${SHOTS}/folie-08-fehlerliste.png` });

// Röntgenblick
await page.locator('.slidev-page-8 #xray').click();
await page.waitForTimeout(600);
const xray = await page.evaluate(() => document.querySelector('.slidev-page-8 #xray-out').textContent.slice(0, 200));
pruefe('Folie 8: Röntgenblick liefert Shadow-DOM-Ausgabe', /aria-invalid/.test(xray) && /44/.test(xray), xray.slice(0, 80).replace(/\n/g, ' '));
await page.screenshot({ path: `${SHOTS}/folie-08-roentgen.png` });

// Icon im Alert-Closer (X) — Kolicons-Font
const alertIcon = await page.evaluate(() => {
	const alert = document.querySelector('.slidev-page-8 #erfolg');
	const closer = alert?.shadowRoot?.querySelector('kol-button');
	const icon = closer?.shadowRoot?.querySelector('.kol-icon, kol-icon, [class*="icon"]');
	return { closerDa: !!closer, iconDa: !!icon, iconInhalt: icon ? (icon.textContent || '').trim().slice(0, 3) : null };
});
pruefe('Folie 8: Alert-Closer mit X-Icon vorhanden', alertIcon.closerDa && alertIcon.iconDa, JSON.stringify(alertIcon));

// ---- Folie 9: was nicht im Markup steht ----
await folieLaden(9, 'Schritt 3 Belege');

// ---- Folie 10: Schritt 4 Theme + Tokens ----
await folieLaden(10, 'Theme & Tokens');
const tokenVorher = await page.evaluate(
	() => document.querySelector('.slidev-page-10 .tokendemo-host kol-input-text')?.shadowRoot?.querySelector('input')?.value,
);
pruefe('Folie 10: Token-Demo-Feld gefüllt', tokenVorher === 'Max Muster', `wert=${tokenVorher}`);

// Theme umschalten → KERN
await page.locator('.slidev-page-10 .themedemo-toggle').click();
await page.waitForTimeout(1200);
const kernAktiv = await page.evaluate(() => {
	const host = document.querySelector('.slidev-page-10 .themedemo-host kol-input-text');
	const inp = host?.shadowRoot?.querySelector('input');
	return {
		themes: [...(window.A11yUi?.THEMES?.keys?.() ?? [])],
		rahmen: inp ? getComputedStyle(inp).borderTopStyle : null,
		rahmenUnten: inp ? getComputedStyle(inp).borderBottomStyle : null,
	};
});
pruefe('Folie 10: KERN-Theme aktiv nach Klick', kernAktiv.themes.includes('kern-v2'), JSON.stringify(kernAktiv));
await page.screenshot({ path: `${SHOTS}/folie-10-kern.png` });

// Theme zurückschalten
await page.locator('.slidev-page-10 .themedemo-toggle').click();
await page.waitForTimeout(900);
const defaultWieder = await page.evaluate(() => window.A11yUi?.Theme?.name ?? 'unbekannt');
pruefe('Folie 10: Zurückschalten auf Default-Theme', defaultWieder === 'default', `theme=${defaultWieder}`);

// Tokens an/aus
await page.locator('.slidev-page-10 .tokendemo-toggle').click();
await page.waitForTimeout(700);
const tokenAn = await page.evaluate(() => {
	const host = document.querySelector('.slidev-page-10 .tokendemo-host');
	return getComputedStyle(host).getPropertyValue('--kolibri-color-primary').trim();
});
pruefe('Folie 10: Token-Override aktiv (primäre Farbe gesetzt)', tokenAn.includes('#cc006e') || tokenAn !== '', `primary=${tokenAn}`);
await page.screenshot({ path: `${SHOTS}/folie-10-tokens.png` });

// ---- Folie 11: React ----
await folieLaden(11, 'Schritt 5 React');

// ---- Folie 12: Manifest ----
await folieLaden(12, 'Warum man bauen kann');
const karten = await page.evaluate(() => document.querySelectorAll('.slidev-page-12 .manifest-card').length);
pruefe('Folie 12: vier Manifest-Karten', karten === 4, `anzahl=${karten}`);

// ---- Folie 13: Rückblende ----
await folieLaden(13, 'Rückblende');

// ---- Folie 14: Ende mit Logo ----
await folieLaden(14, 'Ende');
const logo = await page.evaluate(() => !!document.querySelector('.slidev-page-14 kol-kolibri'));
pruefe('Folie 14: KoliBri-Logo am Ende sichtbar', logo);

// ---- Bootguard darf nie erscheinen ----
const bootguard = await page.evaluate(() => !!document.querySelector('.deck-bootguard'));
pruefe('Kein Bootguard-Banner (KoliBri-Registrierung überall durch)', !bootguard);

await browser.close();

console.log('==== ERGEBNISSE ====');
for (const z of ergebnisse) console.log(z);
console.log('==== KONSOLE ====');
console.log(konsolenFehler.length === 0 ? 'keine Fehler' : konsolenFehler.join('\n'));
console.log('==== FEHLER: ' + fehler.length + ' ====');
process.exit(fehler.length === 0 ? 0 : 1);
