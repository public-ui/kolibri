import { defineStore } from 'pinia';
import customElementJSON from '@public-ui/components/custom-elements.json';

function componentStoreInit() {
	const result = {} as Record<string, (typeof customElementJSON.tags)[0]>;
	customElementJSON.tags.forEach((tag) => {
		if (!tag.name.includes('-wc')) result[tag.name] = tag;
	});
	return result;
}

export const useComponentStore = defineStore('components', {
	state() {
		return {
			currentTag: '',
			components: componentStoreInit(),
		};
	},
	getters: {
		current(state) {
			return state.components[state.currentComponentTag];
		},
		options(state) {
			return Object.values(state.components).map((c) => ({ label: c.name, value: c.name }));
		},
	},
	actions: {
		hopComponent(forward: boolean) {
			const keys = Object.keys(this.components);
			const currentIndex = keys.indexOf(this.$state.currentTag);
			let futureIndex = (currentIndex + (forward ? 1 : -1)) % keys.length;
			if (futureIndex < 0) futureIndex = keys.length + futureIndex;
			this.$state.currentTag = keys[futureIndex];
		},
		nextComponent() {
			this.hopComponent(true);
		},
		prevComponent() {
			this.hopComponent(false);
		},
	},
});
