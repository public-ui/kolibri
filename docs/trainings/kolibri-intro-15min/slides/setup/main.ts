/**
 * Registriert KoliBri global im Deck - danach koennen alle Folien und
 * Komponenten <kol-*> verwenden, genau wie in einem npm-Projekt.
 */
import { register } from '@public-ui/components';
import { defineCustomElements } from '@public-ui/components/loader';
import { DEFAULT } from '@public-ui/theme-default';

export default function setupMain() {
	register(DEFAULT, defineCustomElements).catch((error) => {
		// bewusst sichtbar: stilles Scheitern war der Stolperstein der Demo
		console.error('KoliBri konnte nicht registriert werden:', error);
	});
}
