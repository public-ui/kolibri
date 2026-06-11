import assert from 'node:assert';
import { AbstractTask } from '../src/migrate/runner/abstract-task';
import { TaskRunner } from '../src/migrate/runner/task-runner';
import { TestVersion13 } from '../src/migrate/runner/tasks/test/test-version-1.3';
import { TestVersionZero } from '../src/migrate/runner/tasks/test/test-version-zero';

/**
 * Minimal applicable task used to build dependency graphs for the runner tests.
 * The version range `^0` keeps it applicable for the versions used below.
 */
class NoopTask extends AbstractTask {
	public constructor(identifier: string, dependencies: AbstractTask[] = []) {
		super(identifier, identifier, [], '^0', dependencies);
	}

	public run(): void {
		// no-op
	}
}

describe('TaskRunner', () => {
	it('runs applicable tasks and leaves others pending', () => {
		const runner = new TaskRunner('.', '1.3.0', '0.5.0', { migrate: { tasks: {} } });
		runner.registerTasks([TestVersionZero.getInstance(), TestVersion13.getInstance()]);
		runner.run();
		const status = runner.getStatus();
		assert.equal(status.total, 2);
		assert.equal(status.done, 2);
		assert.equal(status.pending, 0);
	});

	// Regression test for https://github.com/public-ui/kolibri/issues/10314
	// A task whose dependencies are also top-level Map entries is visited twice by
	// `Map.forEach`. Previously this overshot the internal `completedTasks` counter,
	// produced a negative empty bar length and crashed with
	// `RangeError: Invalid count value: -1` inside `String.repeat`.
	it('does not crash when tasks are revisited during progress reporting (#10314)', () => {
		const childA = new NoopTask('regression-child-a');
		const childB = new NoopTask('regression-child-b');
		const parent = new NoopTask('regression-parent', [childA, childB]);

		const runner = new TaskRunner('.', '1.3.0', '0.5.0', { migrate: { tasks: {} } });
		runner.registerTasks([parent]);

		assert.doesNotThrow(() => runner.run());

		const status = runner.getStatus();
		assert.equal(status.total, 3);
		assert.equal(status.done, 3);
		assert.equal(status.pending, 0);
	});

	// Regression test for https://github.com/public-ui/kolibri/issues/10314
	// A dependency excluded for the current version range becomes `'skipped'` and is not
	// registered in `this.tasks`. It must neither block the applicable dependent task from
	// running nor let `completedTasks` overshoot the (registered) total.
	it('does not overshoot completedTasks when dependencies are excluded (#10314)', () => {
		// Version range not satisfied by the CLI version below -> task is excluded.
		class ExcludedTask extends AbstractTask {
			public constructor(identifier: string) {
				super(identifier, identifier, [], '^2.0.0', []);
			}

			public run(): void {
				// no-op
			}
		}

		const excludedChild = new ExcludedTask('regression-excluded-child');
		const parent = new NoopTask('regression-excluded-parent', [excludedChild]);

		const runner = new TaskRunner('.', '1.3.0', '0.5.0', { migrate: { tasks: {} } });
		runner.registerTasks([parent]);

		assert.doesNotThrow(() => runner.run());

		const status = runner.getStatus();
		assert.equal(status.total, 1);
		assert.equal(status.done, 1);
		assert.equal(status.pending, 0);
	});
});
