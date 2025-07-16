import assert from 'node:assert';
import fs from 'fs';
import os from 'os';
import path from 'path';

const { createRequire } = require('module');

describe('RemoveTask', () => {
        it('executes rimraf command', async () => {
                const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
                const filePath = path.join(tmpDir, 'to-remove.txt');
                fs.writeFileSync(filePath, 'data');

                const require = createRequire(__filename);
                const childProc = require('child_process');
                const original = childProc.execSync;
                let executed = '';
                childProc.execSync = (cmd: string) => {
                        executed = cmd;
                        fs.rmSync(filePath, { force: true });
                        return Buffer.from('');
                };

                // @ts-ignore importing compiled file
                const { RemoveTask } = await import('../dist/migrate/runner/tasks/common/RemoveTask.js');
                const task = RemoveTask.getInstance(filePath, '^1');
                task.run();
                childProc.execSync = original;

                assert.ok(!fs.existsSync(filePath));
                assert.ok(executed.includes('rimraf'));
        });
});
