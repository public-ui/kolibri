import assert from 'node:assert';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { ScssAddSelectorTask } from '../src/migrate/runner/tasks/common/ScssAddSelectorTask';
import { ScssRemoveSelectorTask } from '../src/migrate/runner/tasks/common/ScssRemoveSelectorTask';
import { ScssRenameBlockTask } from '../src/migrate/runner/tasks/common/ScssRenameBlockTask';
import { ScssRenameElementTask } from '../src/migrate/runner/tasks/common/ScssRenameElementTask';
import { ScssRenameModifierTask } from '../src/migrate/runner/tasks/common/ScssRenameModifierTask';
import { ScssUpdateTokenTask } from '../src/migrate/runner/tasks/common/ScssUpdateTokenTask';

describe('SCSS migration tasks', () => {
	it('adds selectors when missing', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const scssPath = path.join(tmpDir, 'style.scss');
		fs.writeFileSync(scssPath, '.block { color: red; }');

		const task = ScssAddSelectorTask.getInstance('.new-block', 'color: blue;', '^1');
		task.run(tmpDir);

		const content = fs.readFileSync(scssPath, 'utf8');
		assert.ok(content.includes('.new-block'));
		assert.ok(content.includes('color: blue;'));
	});

	it('removes selectors', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const scssPath = path.join(tmpDir, 'style.scss');
		fs.writeFileSync(scssPath, '.old { color: red; }');

		const task = ScssRemoveSelectorTask.getInstance('.old', '^1');
		task.run(tmpDir);

		const content = fs.readFileSync(scssPath, 'utf8');
		assert.ok(content.includes('/* removed .old */'));
		assert.ok(!content.includes('.old {'));
	});

	it('renames block selectors', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const scssPath = path.join(tmpDir, 'style.scss');
		fs.writeFileSync(scssPath, '.old-block { color: red; }');

		const task = ScssRenameBlockTask.getInstance('old-block', 'new-block', '^1');
		task.run(tmpDir);

		const content = fs.readFileSync(scssPath, 'utf8');
		assert.ok(content.includes('.new-block'));
	});

	it('renames element selectors', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const scssPath = path.join(tmpDir, 'style.scss');
		fs.writeFileSync(scssPath, '.block__old { color: red; }');

		const task = ScssRenameElementTask.getInstance('block', 'old', 'new', '^1');
		task.run(tmpDir);

		const content = fs.readFileSync(scssPath, 'utf8');
		assert.ok(content.includes('.block__new'));
	});

	it('renames modifier selectors', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const scssPath = path.join(tmpDir, 'style.scss');
		fs.writeFileSync(scssPath, '.block--old { color: red; }');

		const task = ScssRenameModifierTask.getInstance('block', 'old', 'new', '^1');
		task.run(tmpDir);

		const content = fs.readFileSync(scssPath, 'utf8');
		assert.ok(content.includes('.block--new'));
	});

	it('updates tokens', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const scssPath = path.join(tmpDir, 'style.scss');
		fs.writeFileSync(scssPath, '$old-color: red; .btn { color: $old-color; }');

		const task = ScssUpdateTokenTask.getInstance('$old-color', '$new-color', '^1');
		task.run(tmpDir);

		const content = fs.readFileSync(scssPath, 'utf8');
		assert.ok(content.includes('$new-color'));
		assert.ok(!content.includes('$old-color'));
	});

	it('avoids replacing partial tokens', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const scssPath = path.join(tmpDir, 'style.scss');
		fs.writeFileSync(scssPath, '$old-color: red; $old-color-extra: blue;');

		const task = ScssUpdateTokenTask.getInstance('$old-color', '$new-color', '^1');
		task.run(tmpDir);

		const content = fs.readFileSync(scssPath, 'utf8');
		assert.ok(content.includes('$new-color: red;'));
		assert.ok(content.includes('$old-color-extra: blue;'));
	});
});
