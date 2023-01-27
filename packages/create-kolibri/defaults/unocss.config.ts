import { defineConfig } from '@unocss/webpack';
import { presetMini } from '@unocss/preset-mini';

// ts-prune-ignore-next
export default defineConfig({
	presets: [presetMini()],
});
