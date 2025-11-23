import assert from 'node:assert';
import { TaskRunner } from '../src/migrate/runner/task-runner';
import { TestVersion13 } from '../src/migrate/runner/tasks/test/test-version-1.3';
import { TestVersionZero } from '../src/migrate/runner/tasks/test/test-version-zero';

describe('TaskRunner', () => {
	it('runs applicable tasks and leaves others pending', () => {
		const runner = new TaskRunner('.', '1.3.0', '0.5.0', { migrate: { tasks: {} } });
		runner.registerTasks([TestVersionZero.getInstance(), TestVersion13.getInstance()]);
		runner.run();
		const status = runner.getStatus();
		assert.equal(status.total, 2);
		assert.equal(status.done, 1);
		assert.equal(status.pending, 1);
	});
});
