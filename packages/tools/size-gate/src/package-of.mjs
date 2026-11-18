const NODE_MODULES = 'node_modules/';

/**
 * Assigns a source path from a source map to the group that owns it.
 *
 * - `dependency`: a third-party package. The path is cut at the **last** `node_modules/`, so the pnpm
 *   store layout `.pnpm/<name>@<version>/node_modules/<name>/…` resolves to `<name>`.
 * - `runtime`: the Stencil runtime, which every lazy build carries.
 * - `css`: a style sheet compiled into a JavaScript string.
 * - `own`: source code of the measured package, grouped by its folder below `src/`
 *   (`components/<name>` for components).
 * - `other`: virtual modules of the bundler and everything that matches nothing above.
 */
export function ownerOf(source) {
	const path = String(source ?? '')
		.replace(/\\/g, '/')
		.replace(/\?.*$/, '');
	if (path === '') {
		return { group: '(unmapped)', kind: 'other', module: '(unmapped)' };
	}

	const index = path.lastIndexOf(NODE_MODULES);
	if (index >= 0) {
		const rest = path.slice(index + NODE_MODULES.length);
		const segments = rest.split('/');
		const name = segments[0].startsWith('@') ? `${segments[0]}/${segments[1]}` : segments[0];
		const kind = name === '@stencil/core' ? 'runtime' : 'dependency';
		return { group: name, kind, module: rest };
	}

	if (/(^|\/)@stencil\/core\//.test(path) || path.startsWith('@lazy-') || path.startsWith('@app-')) {
		return { group: '@stencil/core', kind: 'runtime', module: path.replace(/^(\.\.\/)+/, '') };
	}

	const own = /(?:^|\/)src\/(.+)$/.exec(path);
	if (own) {
		const module = `src/${own[1]}`;
		const segments = own[1].split('/');
		const group = segments[0] === 'components' && segments.length > 2 ? `components/${segments[1]}` : segments.length > 1 ? segments[0] : 'src';
		const kind = /\.(s?css)$/.test(module) ? 'css' : 'own';
		return { group, kind, module };
	}

	return { group: '(other)', kind: 'other', module: path.replace(/^(\.\.\/)+/, '') };
}
