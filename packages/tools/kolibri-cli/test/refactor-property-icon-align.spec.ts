import fs from 'fs';
import assert from 'node:assert';
import os from 'os';
import path from 'path';
import { RefactorPropertyIconAlign } from '../src/migrate/runner/tasks/common/RefactorPropertyIconAlign';

describe('RefactorPropertyIconAlign', () => {
	it('merges _iconAlign into _icons', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const tsxPath = path.join(tmpDir, 'component.tsx');
		fs.writeFileSync(tsxPath, "<KolButton _icons='close' _iconAlign='right'></KolButton>");
		const htmlPath = path.join(tmpDir, 'sample.html');
		fs.writeFileSync(htmlPath, "<kol-button _icons='close' _icon-align='right'></kol-button>");

		const task = RefactorPropertyIconAlign.getInstance('kol-button');
		task.run(tmpDir);

		const tsxContent = fs.readFileSync(tsxPath, 'utf8');
		const htmlContent = fs.readFileSync(htmlPath, 'utf8');
		assert.ok(tsxContent.includes("_icons={{ 'right': 'close' }}"));
		assert.ok(!tsxContent.includes('_iconAlign'));
		assert.ok(htmlContent.includes("_icons=\"{ 'right': 'close' }\""));
		assert.ok(!htmlContent.includes('_icon-align'));
	});
});
