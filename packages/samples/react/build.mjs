import { build } from 'vite';
import config from './vite.config.mjs';

const args = process.argv.slice(2);
const outDir = parseOutputDirFlag(args);

function parseOutputDirFlag(args) {
	let outDir;
	for (let i = 0; i < args.length; i++) {
		const arg = args[i];
		if (arg.startsWith('--output-path=')) {
			outDir = arg.split('=')[1].replace(/^"|"$/g, '');
		} else if (arg === '--output-path') {
			outDir = args[i + 1];
			i++;
		} else if (arg.startsWith('--outDir=')) {
			outDir = arg.split('=')[1];
		} else if (arg === '--outDir') {
			outDir = args[i + 1];
			i++;
		}
	}
	return outDir;
}

await build({
	...config,
	build: {
		...(config.build || {}),
		outDir: outDir || (config.build && config.build.outDir) || 'dist',
	},
});
