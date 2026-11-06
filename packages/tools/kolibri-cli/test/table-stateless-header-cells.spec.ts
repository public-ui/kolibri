import fs from 'fs';
import assert from 'node:assert';
import os from 'os';
import path from 'path';
import { TaskRunner } from '../src/migrate/runner/task-runner';
import { RenameTableStatelessHeaderCellsToHeaders } from '../src/migrate/runner/tasks/v4/table-stateless-headers';

/**
 * `kol-table-stateless` has no `_headerCells` property in v5. The v4 task renames it to `_headers`
 * and covers every migration of a v4 project to v5.
 */
describe('RenameTableStatelessHeaderCellsToHeaders', () => {
	it('renames _headerCells to _headers when a v4 project is migrated to v5', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const tsxPath = path.join(tmpDir, 'component.tsx');
		fs.writeFileSync(tsxPath, '<KolTableStateless _label="Table" _headerCells={headers} _data={data} />');
		const htmlPath = path.join(tmpDir, 'sample.html');
		fs.writeFileSync(htmlPath, '<kol-table-stateless _label="Table" _header-cells="{}" _data="[]"></kol-table-stateless>');

		const runner = new TaskRunner(tmpDir, '5.0.0', '4.1.0', { migrate: { tasks: {} } });
		runner.registerTasks(RenameTableStatelessHeaderCellsToHeaders);
		runner.run();

		assert.equal(fs.readFileSync(tsxPath, 'utf8'), '<KolTableStateless _label="Table" _headers={headers} _data={data} />');
		assert.equal(fs.readFileSync(htmlPath, 'utf8'), '<kol-table-stateless _label="Table" _headers="{}" _data="[]"></kol-table-stateless>');
	});
});
