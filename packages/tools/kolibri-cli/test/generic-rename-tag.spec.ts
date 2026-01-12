import fs from 'fs';
import assert from 'node:assert';
import os from 'os';
import path from 'path';
import { GenericRenameTagNameTask } from '../src/migrate/runner/tasks/common/GenericRenameTagNameTask';

class TestRenameTagTask extends GenericRenameTagNameTask {
	constructor(oldTag: string, newTag: string) {
		super('test', 'desc', oldTag, newTag, '^1');
	}
}

describe('GenericRenameTagNameTask', () => {
	it('renames web component tags (lowercase)', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const htmlPath = path.join(tmpDir, 'sample.html');
		fs.writeFileSync(htmlPath, '<kol-alert></kol-alert>\n<kol-button></kol-button>');

		const task = new TestRenameTagTask('kol-alert', 'kol-notice');
		task.run(tmpDir);

		const htmlContent = fs.readFileSync(htmlPath, 'utf8');
		assert.ok(htmlContent.includes('kol-notice'));
		assert.ok(!htmlContent.includes('kol-alert'));
		assert.ok(htmlContent.includes('kol-button'));
	});

	it('renames react component tags (PascalCase) and imports for react, react-v19, and vue', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const packages = ['react', 'react-v19', 'vue'];

		packages.forEach((pkg) => {
			const tsxPath = path.join(tmpDir, `component-${pkg}.tsx`);
			fs.writeFileSync(
				tsxPath,
				[
					'import { KolAlert,',
					"\tKolButton } from '@public-ui/" + pkg + "';",
					'',
					'export const Example = () => (',
					'  <>',
					'    <KolAlert />',
					'    <KolAlert></KolAlert>',
					'    <KolButton />',
					'  </>',
					');',
				].join('\n'),
			);
		});

		const task = new TestRenameTagTask('kol-alert', 'kol-notice');
		task.run(tmpDir);

		packages.forEach((pkg) => {
			const tsxPath = path.join(tmpDir, `component-${pkg}.tsx`);
			const tsxContent = fs.readFileSync(tsxPath, 'utf8');
			assert.ok(tsxContent.includes('KolNotice'));
			assert.ok(!tsxContent.includes('KolAlert'));
			assert.ok(tsxContent.includes('KolButton'));
		});
	});
});
