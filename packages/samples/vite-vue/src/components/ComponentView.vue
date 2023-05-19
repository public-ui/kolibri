<template>
	<div>link the componentViews</div>
</template>

<script lang="ts">
import { useComponentStore } from '@/stores/components';
export default {
	data() {
		return {
			componentStore: useComponentStore(),
		};
	},
};
</script>
