import fs from 'fs';
import assert from 'node:assert';
import os from 'os';
import path from 'path';
import { GenericRenameSlotNameTask } from '../src/migrate/runner/tasks/common/GenericRenameSlotNameTask';

class TestRenameSlotTask extends GenericRenameSlotNameTask {
	constructor(tmpTag: string, oldName: string, newName: string) {
		super('test', 'desc', tmpTag, oldName, newName, 'slot', '^1');
	}
}

describe('GenericRenameSlotNameTask', () => {
	it('updates slot names in components', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const tsxPath = path.join(tmpDir, 'component.tsx');
		fs.writeFileSync(tsxPath, '<KolCard slot="header"></KolCard>');

		const task = new TestRenameSlotTask('kol-card', 'header', 'main');
		task.run(tmpDir);

		const content = fs.readFileSync(tsxPath, 'utf8');
		assert.ok(content.includes('slot="main"'));
	});
});
