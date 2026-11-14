import fs from 'fs';
import assert from 'node:assert';
import os from 'os';
import path from 'path';
import { TaskRunner } from '../src/migrate/runner/task-runner';
import { RenameTableStatelessHeaderCellsToHeaders } from '../src/migrate/runner/tasks/v5/table-stateless-headers';

/**
 * `kol-table-stateless` has no `_headerCells` property in v5. The v5 task renames it to `_headers`
 * for every project up to v5, including the v5 prereleases that still carried the property.
 */
describe('RenameTableStatelessHeaderCellsToHeaders', () => {
	beforeEach(() => {
		RenameTableStatelessHeaderCellsToHeaders.forEach((task) => task.setStatus('pending'));
	});

	['4.5.0', '5.1.0-rc.0'].forEach((projectVersion) => {
		it(`renames _headerCells to _headers when a ${projectVersion} project is migrated`, () => {
			const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
			const tsxPath = path.join(tmpDir, 'component.tsx');
			fs.writeFileSync(tsxPath, '<KolTableStateless _label="Table" _headerCells={headers} _data={data} />');
			const htmlPath = path.join(tmpDir, 'sample.html');
			fs.writeFileSync(htmlPath, '<kol-table-stateless _label="Table" _header-cells="{}" _data="[]"></kol-table-stateless>');

			const runner = new TaskRunner(tmpDir, '5.1.0', projectVersion, { migrate: { tasks: {} } });
			runner.registerTasks(RenameTableStatelessHeaderCellsToHeaders);
			runner.run();

			assert.equal(fs.readFileSync(tsxPath, 'utf8'), '<KolTableStateless _label="Table" _headers={headers} _data={data} />');
			assert.equal(fs.readFileSync(htmlPath, 'utf8'), '<kol-table-stateless _label="Table" _headers="{}" _data="[]"></kol-table-stateless>');
		});
	});
});
