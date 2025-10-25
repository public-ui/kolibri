import assert from 'node:assert';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { LabelExpertSlot } from '../src/migrate/runner/tasks/common/LabelExpertSlot';

describe('LabelExpertSlot', () => {
	it('moves inner text to _label property', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const htmlPath = path.join(tmpDir, 'sample.html');
		fs.writeFileSync(htmlPath, '<kol-input-text>My Label</kol-input-text>');

		const task = LabelExpertSlot.getInstance('kol-input-text', '_label', '^1');
		task.run(tmpDir);

		const content = fs.readFileSync(htmlPath, 'utf8');
		assert.ok(content.includes('_label="My Label"'));
	});
});
