import assert from 'node:assert';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { Command } from 'commander';
import generateScss from '../src/generate-scss';
import info from '../src/info';
import migrate from '../src/migrate';
import { getRemoveMode, setRemoveMode } from '../src/migrate/shares/reuse';
import { TaskRunner } from '../src/migrate/runner/task-runner';

describe('CLI interface', () => {
        it('runs generate-scss command', () => {
                const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
                const cwd = process.cwd();
                process.chdir(tmpDir);

                const typedBem = require('typed-bem/scss');
                const original = typedBem.generateBemScssFile;
                const calls: string[] = [];
                typedBem.generateBemScssFile = (_: unknown, name: string) => { calls.push(name); };

                const program = new Command();
                generateScss(program);
                program.parse(['node', 'cli', 'generate-scss']);

                typedBem.generateBemScssFile = original;
                process.chdir(cwd);

                assert.deepStrictEqual(calls, ['alert', 'icon']);
        });

        it('runs info command', () => {
                const program = new Command();
                info(program);
                let output = '';
                const original = console.log;
                console.log = (str: string) => { output += str; };
                program.parse(['node', 'cli', 'info']);
                console.log = original;
                assert.ok(output.includes('Operating System'));
        });

        it('runs migrate command with options', () => {
                const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
                fs.writeFileSync(
                        path.join(tmpDir, 'package.json'),
                        JSON.stringify({ dependencies: { '@public-ui/components': '0.0.0' }, devDependencies: { '@public-ui/kolibri-cli': '0.0.0' } }),
                );
                fs.writeFileSync(path.join(tmpDir, 'pnpm-lock.yaml'), '');
                const cwd = process.cwd();
                process.chdir(tmpDir);

                const childProc = require('child_process');
                const execOrig = childProc.exec;
                childProc.exec = (_: string, cb: (err: null, out: string) => void) => cb(null, '');

                let runCalled = false;
                const runOrig = TaskRunner.prototype.run;
                TaskRunner.prototype.run = function () {
                        runCalled = true;
                };
                const getStatusOrig = TaskRunner.prototype.getStatus;
                TaskRunner.prototype.getStatus = () => ({ total: 0, done: 0, pending: 0, nextVersion: '0.0.0', config: { migrate: { tasks: {} } } });
                const getPendingOrig = TaskRunner.prototype.getPendingMinVersion;
                TaskRunner.prototype.getPendingMinVersion = () => '0.0.0';

                const program = new Command();
                migrate(program);
                program.parse([
                        'node',
                        'cli',
                        'migrate',
                        '.',
                        '--ignore-uncommitted-changes',
                        '--overwrite-current-version',
                        '0.0.0',
                        '--overwrite-target-version',
                        '0.0.0',
                        '--remove-mode',
                        'delete',
                        '--test-tasks',
                ]);

                childProc.exec = execOrig;
                TaskRunner.prototype.run = runOrig;
                TaskRunner.prototype.getStatus = getStatusOrig;
                TaskRunner.prototype.getPendingMinVersion = getPendingOrig;
                process.chdir(cwd);

                assert.ok(runCalled);
                assert.equal(getRemoveMode(), 'delete');
                setRemoveMode('prefix');
        });
});
