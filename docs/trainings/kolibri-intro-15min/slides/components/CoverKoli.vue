<script setup>
import { onMounted, ref } from 'vue';
import { whenKoliBri } from './kolibri-ready.mjs';

const host = ref(null);

const MARKUP = `
<div class="cover-badges">
  <kol-badge _label="Web Components"></kol-badge>
  <kol-badge _label="automatisiert gegen WCAG 2.1 AA getestet"></kol-badge>
  <kol-badge _label="läuft offline"></kol-badge>
</div>`;

onMounted(async () => {
	if (!(await whenKoliBri())) return;
	host.value.innerHTML = MARKUP;
});
</script>

<template>
	<div ref="host"></div>
</template>
