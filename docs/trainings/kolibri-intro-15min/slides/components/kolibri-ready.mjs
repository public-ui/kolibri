/**
 * Wartet, bis die KoliBri-Elemente wirklich definiert sind.
 *
 * Warum: setup/main.ts startet register() asynchron - die Vue-Komponenten
 * koennen frueher mounten. Wer dann sofort _on/_msg als Properties setzt,
 * verliert sie (erst die Definition baut die Accessors auf).
 * Die Demo-Seite umgeht das mit await register() - hier ist der Guard
 * das Pendant. Timeout, damit bei einem fehlgeschlagenen Register nichts
 * ewig leer haengt; die Ursache steht dann in der Konsole.
 */
const definiert = (tag) => customElements.whenDefined(tag);

export function whenKoliBri(timeoutMs = 15000) {
	const timeout = new Promise((resolve) => setTimeout(() => resolve(false), timeoutMs));
	const bereit = Promise.all([definiert('kol-button'), definiert('kol-input-text')]).then(() => true);
	return Promise.race([bereit, timeout]);
}
