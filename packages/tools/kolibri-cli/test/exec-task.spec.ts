import assert from 'node:assert';
import { ExecTask } from '../src/migrate/runner/tasks/common/ExecTask';

describe('ExecTask', () => {
    it('executes given command', () => {
        const cp = require('child_process');
        const original = cp.execSync;
        let called = '';
        (cp as any).execSync = (cmd: string) => {
            called = cmd;
            return Buffer.from('');
        };

        const task = ExecTask.getInstance('echo "works"', '^1');
        task.run();

        (cp as any).execSync = original;
        assert.strictEqual(called, 'echo "works"');
    });
});
