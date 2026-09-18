<script setup>
/**
 * Schritt 4a: Theme-Live-Umschaltung im Deck - ersetzt das fruehere iframe
 * der Demo-Seite. Beide Themes sind registriert (siehe setup/main.ts).
 *
 * Umschalter ist der GLOBALLE Theme-Name (window.A11yUi.Theme.name): In 4.4.0
 * uebersteuert die globale Angabe die Aufloesung ueber data-theme-Attribute
 * am Element. Die Komponenten adoptieren ihr Stylesheet beim Verbinden,
 * deshalb wird das Markup nach dem Umschalten neu injiziert (frischer Mount,
 * frisches Theme - ohne Reload).
 *
 * Hinweis: Waehrend KERN aktiv ist, bekommen auch neu verbundene Komponenten
 * ausserhalb dieser Demo das Theme. Bereits verbundene Folien-Demos behalten
 * ihre adoptierten Styles; zurueckschalten stellt den Ausgangszustand her.
 */
import { onMounted, ref } from 'vue';
import { whenKoliBri } from './kolibri-ready.mjs';

const host = ref(null);
const kern = ref(false);
const kernFehlt = ref(false);

const MARKUP = `
<div class="themedemo">
  <kol-input-text _label="Name" _required></kol-input-text>
  <div class="themedemo__row">
    <kol-button _label="Absenden" _variant="primary"></kol-button>
    <kol-button _label="Abbrechen" _variant="secondary"></kol-button>
  </div>
</div>`;

const setzen = () => {
	host.value.innerHTML = MARKUP;
	// Beispielwert vorbelegen (nach JEDEM Umschalten neu): gefuellte Felder
	// machen den Theme-Unterschied auf einen Blick sichtbar.
	host.value.querySelector('kol-input-text')._value = 'Max Muster';
};

const umschalten = () => {
	// Guard: Ohne registrierte kern-v2-Styles wuerde das Umschalten die Demo
	// leer rendern (Komponenten adoptieren ein Theme ohne Regeln). Lieber
	// ehrlich am Knopf melden.
	const themes = window.A11yUi?.THEMES;
	if (!kern.value && !(themes && themes.has('kern-v2'))) {
		kernFehlt.value = true;
		return;
	}
	kern.value = !kern.value;
	const globalTheme = window.A11yUi?.Theme;
	if (globalTheme) globalTheme.name = kern.value ? 'kern-v2' : 'default';
	setzen();
};

onMounted(async () => {
	if (!(await whenKoliBri())) return;
	setzen();
});
</script>

<template>
	<div class="themedemo-wrap">
		<div ref="host" class="themedemo-host"></div>
		<button type="button" class="tokendemo-toggle themedemo-toggle" :aria-pressed="kern ? 'true' : 'false'" @click="umschalten">
			{{ kernFehlt ? 'KERN-Theme nicht geladen – siehe Konsole' : kern ? 'Theme: KERN aktiv – zurückschalten' : 'Theme: KERN' }}
		</button>
	</div>
</template>

<style>
.themedemo-wrap {
	display: grid;
	gap: 0.3rem;
	/* KERN-Theme staucht die Leinwand nicht, aber seine groesseren Abstaende
	   lassen die Demo ueber den Folienrand laufen - leichter Zoom haelt beide
	   Zustaende in der Folie (Worst Case gemessen: 33px ohne, passt mit 0.88). */
	zoom: 0.88;
}

.themedemo {
	display: grid;
	gap: 0.4rem;
	font-size: 0.72em;
}

.themedemo__row {
	display: flex;
	gap: 0.5rem;
}
</style>
