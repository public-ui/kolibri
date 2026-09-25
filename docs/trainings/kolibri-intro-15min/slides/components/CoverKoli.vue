<script setup>
import { onMounted, ref } from 'vue';
import { whenKoliBri } from './kolibri-ready.mjs';

const host = ref(null);

const MARKUP = `
<div class="cover-logo">
  <kol-kolibri _labeled></kol-kolibri>
</div>
<div class="cover-badges">
  <kol-badge _label="Wie HTML-Tags: validierte API"></kol-badge>
  <kol-badge _label="Barrierefrei ab Werk"></kol-badge>
  <kol-badge _label="React, Angular, Vue & mehr"></kol-badge>
  <kol-badge _label="Keine Datenübertragung · EUPL"></kol-badge>
</div>`;

onMounted(async () => {
	if (!(await whenKoliBri())) return;
	host.value.innerHTML = MARKUP;
});
</script>

<template>
	<div ref="host"></div>
</template>
