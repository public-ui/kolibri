/*
 * The official Vue output target generates a tag-transformer module with a transformer of its own,
 * registered through the custom elements build. The Vue adapter registers through the lazy loader,
 * so this script replaces that module with ./vue-component-lib/tag-transformer.ts: the proxies
 * resolve their tag on every render through the native `transformTag` of the root entry, which
 * `bootstrap({ transformTagName })` and the adapter's `setTagNameTransformer` both register with.
 */
import { copyFileSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const adapter = join(scriptDir, '../../adapters/vue/src');
const proxies = join(adapter, 'index.ts');
const GENERATED_IMPORT = "import { transformTag, getTagTransformer } from './tag-transformer.js';";

const source = readFileSync(proxies, 'utf8');
if (!source.includes(GENERATED_IMPORT)) {
	throw new Error(`vue-codemod: no generated tag transformer import found in ${proxies}`);
}
writeFileSync(
	proxies,
	`${source.replace(GENERATED_IMPORT, "import { transformTag } from './tag-transformer.js';")}\nexport { setTagNameTransformer } from './tag-transformer.js';\n`,
);
copyFileSync(join(scriptDir, 'vue-component-lib/tag-transformer.ts'), join(adapter, 'tag-transformer.ts'));
console.log(`vue-codemod: the proxies in ${proxies} resolve their tag through the native transformer`);
