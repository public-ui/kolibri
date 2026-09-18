<script setup>
/**
 * Schritt 2 als Live-Demo im Deck: das Alt/Neu-Beispiel der Demo-Seite
 * (step-2-island.html) ohne iframe. Dasselbe feindliche CSS mit !important
 * zielt auf BEIDE Felder - das native kippt auf Georgia/Rot um, die
 * KoliBri-Komponente bleibt unberuehrt (Shadow DOM haelt das CSS draussen).
 */
import { onMounted, ref } from 'vue';
import { whenKoliBri } from './kolibri-ready.mjs';

const host = ref(null);

const MARKUP = `
<div class="insel">
  <div class="insel__alt">
    <h3>Altbestand (2015)</h3>
    <label for="alt-mail">E-Mail *</label>
    <input id="alt-mail" name="mail" type="email" required aria-required="true" value="max.muster@beispiel.de" />
  </div>
  <div class="insel__neu">
    <h3>KoliBri-Insel</h3>
    <kol-input-email id="insel-mail" _label="E-Mail" _required _hint="Wir nutzen die Adresse nur für die Terminbestätigung."></kol-input-email>
  </div>
</div>`;

onMounted(async () => {
	if (!(await whenKoliBri())) return;
	host.value.innerHTML = MARKUP;
	// Beispielwerte auf beiden Seiten - der Unterschied bleibt rein visuell,
	// niemand muss erst zwei Felder ausfuellen, um etwas zu sehen.
	host.value.querySelector('#insel-mail')._value = 'max.muster@beispiel.de';
});
</script>

<template>
	<div ref="host" class="insel-host"></div>
</template>

<style>
/* Bewusst FEINDLICHES Stylesheet wie im Altbestand (1:1 von
   demo/step-2-island.html): !important auf alle Felder und Buttons INNERHALB
   des Legacy-Blocks. Die KoliBri-Insel steht ausserhalb des Selektors - und
   selbst ein globaler input-Selektor wuerde das Feld im Shadow DOM nicht
   erreichen. (Vererbte Eigenschaften wie font-family fliessen allerdings
   durch, wenn der Host selbst gestylt wird - deshalb greift der Selektor
   hier bewusst nur in den Altbestands-Block.) */
.insel {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 0.4rem 1.2rem;
	align-items: start;
	font-size: 0.86em;
}

.insel h3 {
	font-size: 1rem;
	margin: 0 0 0.5rem;
}

.insel__alt {
	border: 1px dashed #7a8394;
	padding: 0.8rem;
	background: #fcfcfd;
}

.insel__alt label {
	display: block;
	font-weight: 600;
	margin-bottom: 0.25rem;
}

/* Das feindliche Legacy-CSS: nur im Altbestands-Block. */
.insel__alt input,
.insel__alt button,
.insel__alt label {
	font-family: Georgia, 'Times New Roman', serif !important;
	color: #7a0000 !important;
	letter-spacing: 0.06em !important;
}

.insel__alt * {
	line-height: 2.4 !important;
}

.insel__alt input {
	font-family: Georgia, 'Times New Roman', serif;
	font-size: inherit;
	padding: 0.45rem 0.55rem;
	border: 1px solid #7a8394;
	border-radius: 3px;
	width: 100%;
	box-sizing: border-box;
	color: #7a0000;
}

.insel__neu {
	padding: 0.8rem;
	border: 1px solid rgba(0, 71, 108, 0.25);
	border-radius: 12px;
	background: rgba(0, 71, 108, 0.05);
}
</style>
