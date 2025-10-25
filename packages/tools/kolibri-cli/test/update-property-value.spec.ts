import assert from 'node:assert';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { UpdatePropertyValueTask } from '../src/migrate/runner/tasks/common/UpdatePropertyValueTask';

describe('UpdatePropertyValueTask', () => {
	it('updates property values in markup', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const tsxPath = path.join(tmpDir, 'component.tsx');
		fs.writeFileSync(tsxPath, '<KolButton _type="primary" />');
		const htmlPath = path.join(tmpDir, 'sample.html');
		fs.writeFileSync(htmlPath, '<kol-button _type="primary"></kol-button>');

		const task = UpdatePropertyValueTask.getInstance('kol-button', '_type', 'primary', 'secondary', '^1');
		task.run(tmpDir);

		const tsxContent = fs.readFileSync(tsxPath, 'utf8');
		const htmlContent = fs.readFileSync(htmlPath, 'utf8');
		assert.ok(tsxContent.includes('_type="secondary"') || tsxContent.includes("_type='secondary'"));
		assert.ok(htmlContent.includes('_type="secondary"'));
	});
});
