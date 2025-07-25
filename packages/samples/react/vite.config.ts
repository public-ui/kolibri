import { defineConfig } from 'vite';
import { execSync } from 'node:child_process';
import react from '@vitejs/plugin-react-swc';
import UnoCSS from '@unocss/vite';
import process from 'process';
import path from 'path';

function getGitCommitHash(): string | null {
	try {
		return execSync('git rev-parse --short HEAD 2>/dev/null').toString().trim();
	} catch {
		return null;
	}
}

export default defineConfig({
	plugins: [react(), UnoCSS()],
	define: {
		'process.env.THEME_MODULE': JSON.stringify(process.env.THEME_MODULE || ''),
		'process.env.THEME_EXPORT': JSON.stringify(process.env.THEME_EXPORT || ''),
		'process.env.ENABLE_I18N_OVERWRITING': JSON.stringify(process.env.ENABLE_I18N_OVERWRITING || ''),
		'process.env.ENABLE_TAG_NAME_TRANSFORMER': JSON.stringify(process.env.ENABLE_TAG_NAME_TRANSFORMER || ''),
		'process.env.ENABLE_THEME_PATCHING': JSON.stringify(process.env.ENABLE_THEME_PATCHING || ''),
		'process.env.BUILD_DATE': JSON.stringify(new Date().toISOString()),
		'process.env.COMMIT_HASH': JSON.stringify(getGitCommitHash()),
		'process.env.PLATFORM': JSON.stringify(process.platform),
	},
	build: {
		sourcemap: true,
	},
	server: {
		port: 9191,
		fs: {
			allow: [path.resolve(__dirname), ...(process.env.THEME_MODULE ? [path.resolve(process.env.THEME_MODULE)] : [])],
		},
	},
});
