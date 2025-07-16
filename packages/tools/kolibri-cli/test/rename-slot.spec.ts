import assert from 'node:assert';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { RenameSlotNameTask } from '../src/migrate/runner/tasks/common/RenameSlotNameTask';

describe('RenameSlotNameTask', () => {
        it('renames slot attribute in component files', () => {
                const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
                const tsxPath = path.join(tmpDir, 'component.tsx');
                fs.writeFileSync(tsxPath, '<KolCard slot="header"></KolCard>');
                const htmlPath = path.join(tmpDir, 'sample.html');
                fs.writeFileSync(htmlPath, '<kol-card slot="header"></kol-card>');

                const task = RenameSlotNameTask.getInstance('kol-card', 'header', 'header-right', '^1');
                task.run(tmpDir);

                const tsxContent = fs.readFileSync(tsxPath, 'utf8');
                const htmlContent = fs.readFileSync(htmlPath, 'utf8');
                assert.ok(tsxContent.includes('slot="header-right"'));
                assert.ok(htmlContent.includes('slot="header"'));
        });
});
