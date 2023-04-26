<template>
	<default>
		<div class="grid gap-16 grid-cols-[1fr_3fr] ml-10">
			<div>
				<kol-kolibri class="w-75 m-auto" />
			</div>
			<div>
				<slot />
			</div></div
	></default>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import Default from '../theme/layouts/default.vue';

const components = defineComponent({ Default });
</script>
