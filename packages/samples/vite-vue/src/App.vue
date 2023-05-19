<template>
	<div class="container">
		<Head />
		<ComponentSwitch />
		<ComponentView />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Head from './components/Head.vue';
import ComponentSwitch from './components/ComponentSwitch.vue';
import ComponentView from './components/ComponentView.vue';

export default defineComponent({
	components: { ComponentSwitch, ComponentView, Head },
});
</script>
