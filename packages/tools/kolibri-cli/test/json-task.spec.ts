import assert from 'node:assert';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { JsonTask } from '../src/migrate/runner/tasks/common/JsonTask';

describe('JsonTask', () => {
        it('merges config into package.json', () => {
                const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
                const cwd = process.cwd();
                process.chdir(tmpDir);
                fs.writeFileSync('package.json', '{"name":"test"}');

                const task = JsonTask.getInstance('scripts', { test: 'mocha' }, '^1');
                task.run();

                process.chdir(cwd);
                const pkg = JSON.parse(fs.readFileSync(path.join(tmpDir, 'package.json'), 'utf8'));
                assert.equal(pkg.test, 'mocha');
        });
});
