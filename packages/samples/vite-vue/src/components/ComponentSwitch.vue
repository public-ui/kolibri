<template>
	<div class="grid grid-cols-[1fr_auto_1fr] gap-4">
		<KolButton
			class="mr-auto"
			_icon-only
			_icon="codicon codicon-arrow-left"
			_label="Vorherige Komponente"
			:_on="{ onClick: prevClick }"
		></KolButton>
		<KolSelect
			_hide-label
			:_list="componentStore.options"
			:_on="{ onChange: changeComponent }"
			:_value="[componentStore.currentTag]"
		></KolSelect>
		<KolButton
			class="ml-auto"
			_icon-only
			_icon="codicon codicon-arrow-right"
			_label="Nächste Komponente"
			:_on="{ onClick: nextClick }"
		></KolButton>
	</div>
</template>

<script lang="ts">
import { useComponentStore } from '@/stores/components';
import { KolButton, KolSelect } from '@public-ui/vue';

export default {
	components: { KolSelect, KolButton },
	data() {
		return {
			componentStore: useComponentStore(),
		};
	},
	methods: {
		changeComponent(_e: Event, value: string[]) {
			this.componentStore.currentTag = value[0];
		},
		nextClick(_e: Event) {
			this.componentStore.nextComponent();
		},
		prevClick(_e: Event) {
			this.componentStore.prevComponent();
		},
	},
};
</script>
