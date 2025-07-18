import assert from 'node:assert';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { RenameTagNameTask } from '../src/migrate/runner/tasks/common/RenameTagNameTask';

describe('RenameTagNameTask', () => {
        it('renames tag names in code files', () => {
                const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
                const tsxPath = path.join(tmpDir, 'component.tsx');
                fs.writeFileSync(tsxPath, '<KolAlert />');
                const htmlPath = path.join(tmpDir, 'sample.html');
                fs.writeFileSync(htmlPath, '<kol-alert></kol-alert>');

                const task = RenameTagNameTask.getInstance('kol-alert', 'kol-notice', '^1');
                task.run(tmpDir);

                const tsxContent = fs.readFileSync(tsxPath, 'utf8');
                const htmlContent = fs.readFileSync(htmlPath, 'utf8');
                assert.ok(tsxContent.includes('KolNotice'));
                assert.ok(htmlContent.includes('kol-notice'));
        });
});
