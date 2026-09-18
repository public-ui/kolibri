<script setup>
/**
 * Schritt 1 als Live-Demo direkt in der Folie - 1:1 aus demo/step-1-first.html
 * uebernommen. Das Markup steht bewusst als HTML-String: der Browser parst
 * Custom Elements nativ, die Vue-Vorlage bleibt davon unberuehrt.
 */
import { onMounted, ref } from 'vue';
import { whenKoliBri } from './kolibri-ready.mjs';

/**
 * nurFeld: nur das E-Mail-Feld (Folie "Dasselbe in einem Tag" - ihr Markup
 * steht links auf der Folie, mehr gehoert dort nicht hin). Ohne Prop dazu:
 * die vier Button-Varianten mit Ausgabe - die erklaert erst die Folie
 * "Es prueft wirklich".
 */
const props = defineProps({ nurFeld: Boolean });

const host = ref(null);

const FELD = `
  <kol-input-email id="mail"
    _label="E-Mail" _required
    _hint="Wir nutzen die Adresse nur für die Terminbestätigung."></kol-input-email>`;

const MARKUP = props.nurFeld
	? `<div class="s1demo">${FELD}</div>`
	: `<div class="s1demo">
  ${FELD}
  <div class="s1demo__row">
    <kol-button _label="Absenden" _variant="primary" _icons="kolicon-house"></kol-button>
    <kol-button _label="Abbrechen" _variant="secondary"></kol-button>
    <kol-button _label="Löschen" _variant="danger"></kol-button>
    <kol-button _label="Mehr" _variant="ghost"></kol-button>
  </div>
  <p class="s1demo__out is-empty" id="out">Noch nichts passiert – tippt ins Feld oder klickt einen Button.</p>
</div>`;

onMounted(async () => {
	if (!(await whenKoliBri())) return; // Register fehlgeschlagen – Ursache steht in der Konsole
	const root = host.value;
	root.innerHTML = MARKUP;

	const out = root.querySelector('#out'); // fehlt im nurFeld-Modus
	const sagen = (html) => {
		if (!out) return;
		out.innerHTML = html;
		out.classList.remove('is-empty');
	};

	// --- Validierung: _msg und _touched sind Properties, keine Attribute ---
	const mail = root.querySelector('#mail');
	// Beispielwert vorbelegen: Die Demo startet gefuellt – fuer die Fehler-
	// Show einfach alles markieren und "abc" tippen.
	mail._value = 'max.muster@beispiel.de';
	const istGueltig = (wert) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(wert.trim());

	const pruefen = (wert, beimTippen) => {
		if (wert.trim() === '') {
			// Leeres Pflichtfeld erst nach dem Verlassen bemaengeln, nicht beim Tippen.
			if (beimTippen) return;
			mail._msg = { _type: 'error', _description: 'Bitte geben Sie eine E-Mail-Adresse an.' };
			mail._touched = true;
			sagen('Pflichtfeld leer → <code>aria-invalid="true"</code>');
			return;
		}
		if (istGueltig(wert)) {
			mail._msg = undefined;
			mail._touched = false;
			sagen('Gültig → Fehler entfernt, <code>aria-invalid</code> ist weg.');
		} else if (!beimTippen) {
			mail._msg = { _type: 'error', _description: 'Bitte geben Sie eine gültige E-Mail-Adresse an.' };
			mail._touched = true;
			sagen('Ungültig → <code>aria-invalid="true"</code>, Meldung per <code>aria-describedby</code> verknüpft.');
		}
	};

	mail._on = {
		onBlur: (_event, wert) => pruefen(String(wert ?? mail._value ?? ''), false),
		onInput: (_event, wert) => pruefen(String(wert ?? ''), true),
	};

	// --- Buttons: _on ist ein Objekt mit Callbacks ---
	root.querySelectorAll('kol-button').forEach((button) => {
		button._on = {
			onClick: () => sagen('Geklickt: <b>' + button._label + '</b> (Variante <code>' + (button._variant ?? 'ohne') + '</code>)'),
		};
	});
});
</script>

<template>
	<div ref="host" class="step1demo-host"></div>
</template>
