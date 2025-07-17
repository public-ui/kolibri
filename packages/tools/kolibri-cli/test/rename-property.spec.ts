import assert from 'node:assert';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { RenamePropertyNameTask } from '../src/migrate/runner/tasks/common/RenamePropertyNameTask';


describe('RenamePropertyNameTask', () => {
        it('renames property in code files', () => {
                const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
                const tsxPath = path.join(tmpDir, 'component.tsx');
                fs.writeFileSync(tsxPath, '<KolButton _icon="close" />');
                const htmlPath = path.join(tmpDir, 'sample.html');
                fs.writeFileSync(htmlPath, '<kol-button _icon="close"></kol-button>');

                const task = RenamePropertyNameTask.getInstance('kol-button', '_icon', '_icons', '^1');
                task.run(tmpDir);

                const tsxContent = fs.readFileSync(tsxPath, 'utf8');
                const htmlContent = fs.readFileSync(htmlPath, 'utf8');
                assert.ok(tsxContent.includes('_icons'));
                assert.ok(htmlContent.includes('_icons'));
        });
});
