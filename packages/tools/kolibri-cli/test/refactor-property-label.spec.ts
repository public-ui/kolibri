import fs from 'fs';
import assert from 'node:assert';
import os from 'os';
import path from 'path';
import { RefactorPropertyLabelReplaceFalse } from '../src/migrate/runner/tasks/common/RefactorPropertyLabelReplaceFalse';

describe('RefactorPropertyLabelReplaceFalse', () => {
	it('replaces _label="false" with empty string', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const tsxPath = path.join(tmpDir, 'component.tsx');
		fs.writeFileSync(tsxPath, '<KolButton _label={false}></KolButton>');
		const htmlPath = path.join(tmpDir, 'sample.html');
		fs.writeFileSync(htmlPath, '<kol-button _label="false"></kol-button>');

		const task = RefactorPropertyLabelReplaceFalse.getInstance();
		task.run(tmpDir);

		const tsxContent = fs.readFileSync(tsxPath, 'utf8');
		const htmlContent = fs.readFileSync(htmlPath, 'utf8');
		assert.ok(tsxContent.includes('_label=""'));
		assert.ok(htmlContent.includes('_label=""'));
	});
});
