import fs from 'fs';
import assert from 'node:assert';
import os from 'os';
import path from 'path';
import { RenameClearButtonPropTask, RenameClearButtonPropTasks } from '../src/migrate/runner/tasks/v4/clear-button';

describe('RenameClearButtonPropTask', () => {
	it('renames kebab-case attribute and inverts explicit boolean strings', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const htmlPath = path.join(tmpDir, 'sample.html');
		fs.writeFileSync(htmlPath, '<kol-combobox _hide-clear-button="true"></kol-combobox>');

		RenameClearButtonPropTask.getInstance('^4').run(tmpDir);

		const content = fs.readFileSync(htmlPath, 'utf8');
		assert.ok(!content.includes('_hide-clear-button'));
		assert.ok(content.includes('_has-clear-button="false"'));
	});

	it('renames single-select clear-button attribute and inverts explicit boolean strings', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const htmlPath = path.join(tmpDir, 'single-select.html');
		fs.writeFileSync(htmlPath, '<kol-single-select _hide-clear-button="false"></kol-single-select>');

		RenameClearButtonPropTasks.forEach((task) => task.run(tmpDir));

		const content = fs.readFileSync(htmlPath, 'utf8');
		assert.ok(!content.includes('_hide-clear-button'));
		assert.ok(content.includes('_has-clear-button="true"'));
	});

	it('renames camelCase prop and inverts JSX boolean props', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const tsxPath = path.join(tmpDir, 'sample.tsx');
		fs.writeFileSync(tsxPath, '<KolCombobox _hideClearButton={false} />');

		RenameClearButtonPropTask.getInstance('^4').run(tmpDir);

		const content = fs.readFileSync(tsxPath, 'utf8');
		assert.ok(!content.includes('_hideClearButton'));
		assert.ok(content.includes('_hasClearButton={true}'));
	});

	it('maps bare attributes to disabled clear buttons', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const tsxPath = path.join(tmpDir, 'implicit.tsx');
		fs.writeFileSync(tsxPath, '<KolCombobox _hideClearButton />');

		RenameClearButtonPropTask.getInstance('^4').run(tmpDir);

		const content = fs.readFileSync(tsxPath, 'utf8');
		assert.ok(content.includes('_hasClearButton={false}'));
	});
});
