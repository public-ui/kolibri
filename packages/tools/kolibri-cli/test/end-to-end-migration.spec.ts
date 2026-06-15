import fs from 'fs';
import assert from 'node:assert';
import os from 'os';
import path from 'path';

import { TaskRunner } from '../src/migrate/runner/task-runner';
import { RemovePropertyNameTask } from '../src/migrate/runner/tasks/common/RemovePropertyNameTask';
import { RenamePropertyNameTask } from '../src/migrate/runner/tasks/common/RenamePropertyNameTask';
import { RenameTagNameTask } from '../src/migrate/runner/tasks/common/RenameTagNameTask';
import { setRemoveMode } from '../src/migrate/shares/reuse';

function createStubModules(baseDir: string) {
	const reactTypes = path.join(baseDir, 'node_modules', '@types', 'react');
	fs.mkdirSync(reactTypes, { recursive: true });
	fs.writeFileSync(path.join(reactTypes, 'index.d.ts'), 'export {};');
	const reactRuntime = path.join(baseDir, 'node_modules', 'react');
	fs.mkdirSync(reactRuntime, { recursive: true });
	fs.writeFileSync(path.join(reactRuntime, 'jsx-runtime.d.ts'), 'export {};');
	const publicUiReact = path.join(baseDir, 'node_modules', '@public-ui', 'react');
	fs.mkdirSync(publicUiReact, { recursive: true });
	fs.writeFileSync(path.join(publicUiReact, 'index.d.ts'), 'export class KolTable {}; export class KolTableStateful {};');
}

describe('end-to-end migration', () => {
	beforeEach(() => {
		(RenameTagNameTask as any).instances?.clear();
		(RenamePropertyNameTask as any).instances?.clear();
		(RemovePropertyNameTask as any).instances?.clear();
	});

	it('runs multiple tasks and compiles the project', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-e2e-'));
		const srcDir = path.join(tmpDir, 'src');
		fs.mkdirSync(srcDir);
		fs.writeFileSync(
			path.join(srcDir, 'index.tsx'),
			'import { KolTable } from \'@public-ui/react\';\nexport const App = () => <KolTable _old="foo" _remove="bar" />;\n',
		);
		fs.writeFileSync(path.join(tmpDir, 'index.html'), '<kol-table _old="foo" _remove="bar"></kol-table>');
		createStubModules(tmpDir);
		const tsconfigPath = path.join(tmpDir, 'tsconfig.json');
		fs.writeFileSync(tsconfigPath, '{}');

		const runner = new TaskRunner(tmpDir, '3.0.0', '1.0.0', { migrate: { tasks: {} } });
		setRemoveMode('delete');
		const tasks = [
			RenameTagNameTask.getInstance('kol-table', 'kol-table-stateful', '^1'),
			RenamePropertyNameTask.getInstance('kol-table-stateful', '_old', '_new', '^1'),
			RemovePropertyNameTask.getInstance('kol-table-stateful', '_remove', '^1'),
		];
		runner.registerTasks(tasks);
		runner.run();

		const tsxContent = fs.readFileSync(path.join(srcDir, 'index.tsx'), 'utf8');
		const htmlContent = fs.readFileSync(path.join(tmpDir, 'index.html'), 'utf8');
		console.log('debug-tsx', tsxContent);
		console.log('debug-html', htmlContent);
		assert.ok(tsxContent.includes('KolTableStateful'));
		assert.ok(tsxContent.includes('_new="foo"'));
		assert.ok(!tsxContent.includes('_remove'));
		assert.ok(htmlContent.includes('<kol-table-stateful'));
		assert.ok(htmlContent.includes('_new="foo"'));
		assert.ok(!htmlContent.includes('_remove'));

		setRemoveMode('prefix');
	});
});
