import fs from 'fs';
import assert from 'node:assert';
import os from 'os';
import path from 'path';

import { RenameKolFocusMethodsTask } from '../src/migrate/runner/tasks/v4/focus';

describe('RenameKolFocusMethodsTask', () => {
	let tmpDir: string;

	before(() => {
		tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
	});

	after(() => {
		if (fs.existsSync(tmpDir)) {
			fs.rmSync(tmpDir, { recursive: true, force: true });
		}
	});

	it('renames kolFocus usages to focus', () => {
		const tsPath = path.join(tmpDir, 'focus-usage.ts');
		fs.writeFileSync(
			tsPath,
			`async function focusButton(button: HTMLElement | undefined, navItem: HTMLElement | undefined) {
	button?.kolFocus();
	await navItem?.kolFocus?.();
	await navItem?.kolFocusLink?.();
}
`,
		);

		const task = RenameKolFocusMethodsTask.getInstance('^4');
		task.run(tmpDir);

		const content = fs.readFileSync(tsPath, 'utf8');
		assert.ok(content.includes('button?.focus();'));
		const focusOptionalMatches = content.match(/focus\?\.\(\);/g) ?? [];
		assert.strictEqual(focusOptionalMatches.length, 2);
		assert.ok(!content.includes('kolFocus'));
		assert.ok(!content.includes('kolFocusLink'));
	});

	it('skips files without kolFocus usages', () => {
		const tsPath = path.join(tmpDir, 'noop.ts');
		const originalContent = `export const noop = () => true;
`;
		fs.writeFileSync(tsPath, originalContent);

		const task = RenameKolFocusMethodsTask.getInstance('^4');
		task.run(tmpDir);

		const content = fs.readFileSync(tsPath, 'utf8');
		assert.strictEqual(content, originalContent);
	});
});
