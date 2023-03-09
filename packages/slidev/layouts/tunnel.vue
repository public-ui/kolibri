<template>
	<default>
		<slot />
		<div ref="tunnel" class="absolute left-50 top-50 w-50 bg-transparent h-50 rounded-full border-black transparent">&#160;</div>
	</default>
</template>

<script setup lang="ts">
import { ref, onMounted, defineComponent, onUnmounted } from 'vue';
import Default from '../theme/layouts/center.vue';

defineComponent({ Default });
const tunnel = ref<HTMLDivElement | null>(null);

const moveTunnel = (event: MouseEvent) => {
	if (tunnel.value instanceof HTMLDivElement) {
		const rect = tunnel.value.getBoundingClientRect();
		tunnel.value.style.outlineColor = `rgba(0,0,0,0.85)`;
		tunnel.value.style.outlineStyle = `solid`;
		tunnel.value.style.outlineWidth = `9999px`;
		tunnel.value.style.boxShadow = 'inset 0px 0px 25px rgba(0,0,0,1), inset 0px 0px 15px rgba(0,0,0,1)';
		tunnel.value.style.left = `${event.clientX - rect.width * 1.5}px`;
		tunnel.value.style.top = `${event.clientY - rect.height}px`;
		tunnel.value.style.filter = 'blur';
	}
};
onMounted(() => {
	document.body.addEventListener('mousemove', moveTunnel);
	document.body.dispatchEvent(
		new MouseEvent('mousemove', {
			bubbles: true,
			cancelable: true,
			view: window,
			clientX: 500,
			clientY: 200,
		})
	);
});
onUnmounted(() => {
	document.body.removeEventListener('mousemove', moveTunnel);
});
</script>
