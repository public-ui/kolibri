import assert from 'node:assert';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { MarkRemovedSlotTask } from '../src/migrate/runner/tasks/common/MarkRemovedSlotTask';

describe('MarkRemovedSlotTask', () => {
	it('marks removed slot with attribute in components', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const tsxPath = path.join(tmpDir, 'component.tsx');
		fs.writeFileSync(tsxPath, '<KolCard slot="footer"></KolCard>');

		const task = MarkRemovedSlotTask.getInstance('kol-card', 'footer', '^1');
		task.run(tmpDir);

		const content = fs.readFileSync(tsxPath, 'utf8');
		assert.ok(content.includes('data-removed-slot="footer"'));
	});
});
