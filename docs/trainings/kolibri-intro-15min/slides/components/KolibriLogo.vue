<script setup>
/**
 * Das KoliBri-Logo (kol-kolibri rendert das SVG mit Schriftzug) als kleine
 * Wrapper-Komponente - nutzbar auf beliebigen Folien. Markup bewusst als
 * HTML-String injiziert wie bei den anderen Demos, damit die Vue-Vorlage
 * die Custom Elements nicht anfassen muss.
 */
import { onMounted, ref } from 'vue';
import { whenKoliBri } from './kolibri-ready.mjs';

const host = ref(null);

onMounted(async () => {
	if (!(await whenKoliBri())) return;
	host.value.innerHTML = '<kol-kolibri _labeled></kol-kolibri>';
});
</script>

<template>
	<div ref="host" class="ende-logo"></div>
</template>
