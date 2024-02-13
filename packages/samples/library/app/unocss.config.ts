import { defineConfig } from '@unocss/webpack';
import { presetUno } from '@unocss/preset-uno';

// ts-prune-ignore-next
export default defineConfig({
	presets: [presetUno()],
});
