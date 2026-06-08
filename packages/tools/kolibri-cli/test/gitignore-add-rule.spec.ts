import fs from 'fs';
import assert from 'node:assert';
import os from 'os';
import path from 'path';
import { GitIgnoreAddRuleTask } from '../src/migrate/runner/tasks/common/GitIgnoreAddRuleTask';

describe('GitIgnoreAddRuleTask', () => {
	it('adds rule to .gitignore', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const cwd = process.cwd();
		process.chdir(tmpDir);

		const task = GitIgnoreAddRuleTask.getInstance('dist', '^1');
		task.run();

		process.chdir(cwd);
		const content = fs.readFileSync(path.join(tmpDir, '.gitignore'), 'utf8');
		assert.ok(content.includes('dist'));
	});

	it('does not duplicate rule when .gitignore uses LF line endings', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const cwd = process.cwd();
		process.chdir(tmpDir);
		fs.writeFileSync(path.join(tmpDir, '.gitignore'), 'node_modules\n.kolibri.config.json\n');

		const task = GitIgnoreAddRuleTask.getInstance('.kolibri.config.json', '^1');
		task.run();

		process.chdir(cwd);
		const content = fs.readFileSync(path.join(tmpDir, '.gitignore'), 'utf8');
		const occurrences = (content.match(/\.kolibri\.config\.json/g) ?? []).length;
		assert.strictEqual(occurrences, 1, 'rule must not be duplicated on LF files');
	});

	it('does not duplicate rule when .gitignore uses CRLF line endings (Windows)', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const cwd = process.cwd();
		process.chdir(tmpDir);
		// Simulate a Windows .gitignore with CRLF line endings where the rule already exists
		fs.writeFileSync(path.join(tmpDir, '.gitignore'), 'node_modules\r\n.kolibri.config.json\r\n');

		// getInstance returns a cached singleton; run() reads process.cwd() dynamically
		GitIgnoreAddRuleTask.getInstance('.kolibri.config.json', '*').run();

		process.chdir(cwd);
		const content = fs.readFileSync(path.join(tmpDir, '.gitignore'), 'utf8');
		const occurrences = (content.match(/\.kolibri\.config\.json/g) ?? []).length;
		assert.strictEqual(occurrences, 1, 'rule must not be duplicated on CRLF files');
	});
});
