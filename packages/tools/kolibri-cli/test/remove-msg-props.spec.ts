import assert from 'node:assert';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { RemoveMsgPropsTask } from '../src/migrate/runner/tasks/common/RemoveMsgPropsTask';

describe('RemoveMsgPropsTask', () => {
	it('removes _label and _variant from _msg', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const tsxPath = path.join(tmpDir, 'component.tsx');
		fs.writeFileSync(tsxPath, `<KolInputText _msg={{ _type: 'error', _description: 'Oops', _label: 'Headline', _variant: 'custom' }}></KolInputText>`);
		const htmlPath = path.join(tmpDir, 'sample.html');
		fs.writeFileSync(htmlPath, `<kol-input-text _msg='{"_type":"error","_description":"Oops","_label":"Headline","_variant":"custom"}'></kol-input-text>`);

		const task = RemoveMsgPropsTask.getInstance('^4');
		task.run(tmpDir);

		const tsxContent = fs.readFileSync(tsxPath, 'utf8');
		const htmlContent = fs.readFileSync(htmlPath, 'utf8');
		assert.ok(!tsxContent.includes('_label'));
		assert.ok(!tsxContent.includes('_variant'));
		assert.match(tsxContent, /_msg=\{\{\s*_type:\s*'error',\s*_description:\s*'Oops'\s*\}\}/);
		assert.ok(!htmlContent.includes('_label'));
		assert.ok(!htmlContent.includes('_variant'));
		assert.match(htmlContent, /_msg='\{"_type":"error","_description":"Oops"\}'/);
	});
});
