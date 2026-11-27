import { register } from 'node:module';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

let registered = '';

/**
 * Imports a module of the Stencil collection output of `@public-ui/components`
 * (`dist/collection/<path>.js`), with `@stencil/core` replaced by the shim.
 */
export async function importCollectionModule(componentsRoot: string, path: string): Promise<Record<string, unknown>> {
	const collectionUrl = pathToFileURL(join(componentsRoot, 'dist', 'collection') + '/').href;
	if (registered !== collectionUrl) {
		register(new URL('./collection-hooks.js', import.meta.url), {
			data: { collectionUrl, shimUrl: new URL('./stencil-shim.js', import.meta.url).href },
		});
		registered = collectionUrl;
	}
	return (await import(new URL(`${path}.js`, collectionUrl).href)) as Record<string, unknown>;
}
