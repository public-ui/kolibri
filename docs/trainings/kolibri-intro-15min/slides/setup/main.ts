/**
 * Registriert KoliBri global im Deck - danach koennen alle Folien und
 * Komponenten <kol-*> verwenden, genau wie in einem npm-Projekt.
 *
 * Aufbau bewusst zweistufig: Der kritische Pfad registriert NUR das
 * DEFAULT-Theme - schlaegt der fehl, rendert keine Komponente. Alles andere
 * (KERN-Theme samt Schriften, Icon-Font) wird isoliert nachgezogen; ein
 * Fehler dort kostet niemals die gerenderten Komponenten. Der Watchdog am
 * Ende macht einen totalen Ausfall sichtbar statt als leere Folien.
 */
import { register } from '@public-ui/components';
import { defineCustomElements } from '@public-ui/components/loader';
import { DEFAULT } from '@public-ui/theme-default';
import { KERN_V2 } from '@public-ui/theme-kern';

/** Nach 8s ohne definierte Komponente einen erklaerbaren Banner zeigen. */
function watchdog(ursache) {
	setTimeout(() => {
		if (customElements.get('kol-button')) return; // Registrierung ist durch
		if (document.querySelector('.deck-bootguard')) return;
		const box = document.createElement('div');
		box.className = 'deck-bootguard';
		box.innerHTML =
			'<strong>KoliBri wurde nicht geladen.</strong> Seite neu laden – die Ursache steht in der Browser-Konsole.' +
			(ursache ? '<pre>' + String(ursache).replace(/</g, '&lt;').slice(0, 400) + '</pre>' : '');
		document.body.appendChild(box);
	}, 8000);
}

export default function setupMain() {
	watchdog();

	register([DEFAULT, KERN_V2], defineCustomElements)
		.then(async () => {
			// Nebensache 1: KERN-Theme fuer den Live-Umschalter (Folie Schritt 4).
			// Nebensache 2+3: dessen Schriften - die exports-map von
			// @public-ui/theme-kern gibt die Asset-Pfade nicht frei, deshalb
			// der Umweg ueber den node_modules-Pfad.
			const ergebnisse = await Promise.allSettled([
				// import('@public-ui/theme-kern').then(({ KERN_V2 }) => register(KERN_V2, defineCustomElements)),
				import('../node_modules/@public-ui/theme-kern/assets/fira-sans-v17-latin/style.css'),
				import('../node_modules/@public-ui/theme-kern/assets/material-symbols-subset/style.css'),
			]);
			const abgewiesen = ergebnisse.filter((r) => r.status === 'rejected');
			if (abgewiesen.length > 0) {
				// KERN-los leben ist verkraftbar (Toggle zeigt dann einen Hinweis),
				// aber die Ursache soll nicht spurlos verschwinden.
				console.warn(
					'KERN-Theme/Schriften nicht geladen:',
					abgewiesen.map((r) => r.reason),
				);
			}
		})
		.catch((error) => {
			// bewusst sichtbar: stilles Scheitern war der Stolperstein der Demo
			console.error('KoliBri konnte nicht registriert werden:', error);
			watchdog(error);
		});

	// Icon-Font fuer kol-icon (z. B. das X im Alert-Closer) - ebenfalls isoliert.
	import('../node_modules/@public-ui/components/assets/kolicons/style.css').catch((error) => console.warn('Kolicons-Font fehlt:', error));
}
