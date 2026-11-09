import fs from 'node:fs';
import path from 'node:path';

import { extractApiTypeMembers } from './contract';

const functionalComponentsDir = path.join(__dirname, '..', '..', 'internal', 'functional-components');

/**
 * Pins the members of every `*Api` type (the `ApiFromConfig` extras: callbacks, methods, refs,
 * emitters, listeners). The props config and the `*Api` type define the API of a component in
 * full (ARC42 § "Public API Contract"), so renaming, removing or retyping a member — a callback
 * or ref included — is an API change. A red snapshot means the API definition changed: get owner
 * approval, review the change consciously and refresh the snapshot for the affected component.
 */
const apiFolders = fs
	.readdirSync(functionalComponentsDir, { withFileTypes: true })
	.filter((entry) => entry.isDirectory() && fs.existsSync(path.join(functionalComponentsDir, entry.name, 'api.tsx')))
	.map((entry) => entry.name)
	.sort();

describe.each(apiFolders)('%s', (folder) => {
	it('pins the members of the *Api type (callbacks, methods, refs, emitters, listeners)', () => {
		expect(extractApiTypeMembers(fs.readFileSync(path.join(functionalComponentsDir, folder, 'api.tsx'), 'utf8'))).toMatchSnapshot();
	});
});
