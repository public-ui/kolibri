import assert from 'node:assert';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { RemovePropertyNameTask } from '../src/migrate/runner/tasks/common/RemovePropertyNameTask';
import { setRemoveMode } from '../src/migrate/shares/reuse';

describe('RemovePropertyNameTask', () => {
        it('prefixes removed property by default', () => {
                const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
                const tsxPath = path.join(tmpDir, 'component.tsx');
                fs.writeFileSync(tsxPath, '<KolButton _deprecated />');
                const htmlPath = path.join(tmpDir, 'sample.html');
                fs.writeFileSync(htmlPath, '<kol-button _deprecated></kol-button>');

                const task = RemovePropertyNameTask.getInstance('kol-button', '_deprecated', '^1');
                task.run(tmpDir);

                const tsxContent = fs.readFileSync(tsxPath, 'utf8');
                const htmlContent = fs.readFileSync(htmlPath, 'utf8');
                assert.ok(tsxContent.includes('data-removed-_deprecated'));
                assert.ok(htmlContent.includes('data-removed-_deprecated'));
        });

        it('deletes removed property when mode is delete', () => {
                const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
                const tsxPath = path.join(tmpDir, 'component.tsx');
                fs.writeFileSync(tsxPath, '<KolButton _deprecated="something" />');
                const htmlPath = path.join(tmpDir, 'sample.html');
                fs.writeFileSync(htmlPath, '<kol-button _deprecated="something"></kol-button>');

                setRemoveMode('delete');
                const task = RemovePropertyNameTask.getInstance('kol-button', '_deprecated', '^1');
                task.run(tmpDir);
                setRemoveMode('prefix');

                const tsxContent = fs.readFileSync(tsxPath, 'utf8');
                const htmlContent = fs.readFileSync(htmlPath, 'utf8');
                assert.ok(!tsxContent.includes('_deprecated'));
                assert.ok(!htmlContent.includes('_deprecated'));
        });
});
