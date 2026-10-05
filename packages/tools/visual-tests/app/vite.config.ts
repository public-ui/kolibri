import UnoCSS from '@unocss/vite';
import react from '@vitejs/plugin-react-swc';
import { execSync } from 'node:child_process';
import path from 'path';
import process from 'process';
import { defineConfig } from 'vite';

function getGitCommitHash(): string | null {
	try {
		return execSync('git rev-parse --short HEAD 2>/dev/null').toString().trim();
	} catch {
		return null;
	}
}

export default defineConfig({
	root: __dirname,
	base: './',
	/* UnoCSS resolves its config relative to the process cwd (the package root), not the Vite root,
	   so the config file must be referenced explicitly – otherwise the project's custom rules are
	   silently dropped and the rendered layout differs from the snapshots. */
	plugins: [react(), UnoCSS({ configFile: path.resolve(__dirname, 'unocss.config.ts') })],
	resolve: {
		dedupe: ['react', 'react-dom'],
		alias: {
			/* Bundle the theme under test (THEME_MODULE) at build time. Falls back to an empty stub so
			   the app can still be built/served without a theme (e.g. local debugging). */
			'@kolibri-vt/theme': process.env.THEME_MODULE ? path.resolve(process.env.THEME_MODULE) : path.resolve(__dirname, 'src/empty-theme.ts'),
		},
	},
	define: {
		'process.env.THEME_MODULE': JSON.stringify(process.env.THEME_MODULE || ''),
		'process.env.THEME_EXPORT': JSON.stringify(process.env.THEME_EXPORT || ''),
		'process.env.THEME_CSS': JSON.stringify(process.env.THEME_CSS || ''),
		'process.env.ENABLE_I18N_OVERWRITING': JSON.stringify(process.env.ENABLE_I18N_OVERWRITING || ''),
		'process.env.ENABLE_TAG_NAME_TRANSFORMER': JSON.stringify(process.env.ENABLE_TAG_NAME_TRANSFORMER || ''),
		'process.env.ENABLE_THEME_PATCHING': JSON.stringify(process.env.ENABLE_THEME_PATCHING || ''),
		'process.env.BUILD_DATE': JSON.stringify(new Date().toISOString()),
		'process.env.COMMIT_HASH': JSON.stringify(getGitCommitHash()),
		'process.env.PLATFORM': JSON.stringify(process.platform),
	},
	build: {
		/*
		 * `light-dark()` must survive the build. Against an older CSS target the minifier rewrites it
		 * into a `prefers-color-scheme` media query with space toggles, and that replacement ignores
		 * the `color-scheme` property entirely. The KoliBri themes ship their CSS as a string that is
		 * adopted into the shadow roots at runtime, so it is never processed here and keeps honouring
		 * `color-scheme` — the page would then follow the operating system while the components in it
		 * follow the application's own setting. The target is the browser floor `light-dark()` needs.
		 */
		cssTarget: ['chrome123', 'edge123', 'firefox120', 'safari17.5'],
		emptyOutDir: true,
		sourcemap: true,
	},
	server: {
		allowedHosts: true,
		port: parseInt(process.env.KOLIBRI_VISUAL_TEST_PORT || '9191', 10),
		fs: {
			allow: [
				path.resolve(__dirname),
				...(process.env.THEME_MODULE ? [path.resolve(process.env.THEME_MODULE)] : []),
				...(process.env.THEME_CSS ? [path.resolve(process.env.THEME_CSS, '..')] : []),
			],
		},
	},
});
