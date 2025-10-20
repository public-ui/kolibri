import fs from 'fs';
import assert from 'node:assert';
import os from 'os';
import path from 'path';
import { RefactorPropertyErrorToMsg } from '../src/migrate/runner/tasks/common/RefactorPropertyErrorToMsg';

describe('RefactorPropertyErrorToMsg', () => {
	it('moves _error to _msg with error object', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const tsxPath = path.join(tmpDir, 'component.tsx');
		fs.writeFileSync(tsxPath, '<KolInputText _error="Oops"></KolInputText>');
		const htmlPath = path.join(tmpDir, 'sample.html');
		fs.writeFileSync(htmlPath, '<kol-input-text _error="Oops"></kol-input-text>');

		const task = RefactorPropertyErrorToMsg.getInstance('kol-input-text', '^1');
		task.run(tmpDir);

		const tsxContent = fs.readFileSync(tsxPath, 'utf8');
		const htmlContent = fs.readFileSync(htmlPath, 'utf8');
		assert.ok(tsxContent.includes("_msg={{ _type: 'error', _description: 'Oops' }}"));
		assert.ok(htmlContent.includes('_msg=\'{"_type":"error","_description":"Oops"}\''));
	});
});
