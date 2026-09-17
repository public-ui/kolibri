<script setup>
/**
 * Schritt 4b: Design-Tokens live ueberschreiben - ohne Neuladen.
 * Gegenueber der Demo-Seite sogar verbesserbar: die Tokens werden hier nicht
 * auf :root gesetzt, sondern auf einen Container - sie wirken trotzdem quer
 * durch den Shadow DOM, denn CSS-Custom-Properties erben hindurch.
 */
import { onMounted, ref } from 'vue';

const host = ref(null);
const an = ref(false);

const MARKUP = `
<div class="tokendemo">
  <kol-input-text _label="Name" _required></kol-input-text>
  <kol-input-email _label="E-Mail" _required></kol-input-email>
  <div class="tokendemo__row">
    <kol-button _label="Absenden" _variant="primary"></kol-button>
    <kol-button _label="Abbrechen" _variant="secondary"></kol-button>
  </div>
</div>`;

onMounted(() => {
	host.value.innerHTML = MARKUP;
});
</script>

<template>
	<div class="tokendemo-wrap">
		<div ref="host" class="tokendemo-host" :class="{ 'tokens-on': an }"></div>
		<button type="button" class="tokendemo-toggle" :aria-pressed="an ? 'true' : 'false'" @click="an = !an">
			{{ an ? 'Tokens aktiv – zweiter Klick macht es rückgängig' : 'Eigene Tokens' }}
		</button>
	</div>
</template>

<style>
.tokens-on {
	--kolibri-color-primary: #cc006e;
	--kolibri-border-radius: 14px;
	--kolibri-font-size: 18px;
}
</style>
