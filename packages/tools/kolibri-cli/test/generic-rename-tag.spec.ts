import assert from 'node:assert';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { GenericRenameTagNameTask } from '../src/migrate/runner/tasks/common/GenericRenameTagNameTask';

class TestRenameTagTask extends GenericRenameTagNameTask {
    constructor(oldTag: string, newTag: string) {
        super('test', 'desc', oldTag, newTag, '^1');
    }
}

describe('GenericRenameTagNameTask', () => {
    it('renames tags in component and custom element files', () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
        const tsxPath = path.join(tmpDir, 'component.tsx');
        fs.writeFileSync(tsxPath, '<KolAlert />');
        const htmlPath = path.join(tmpDir, 'sample.html');
        fs.writeFileSync(htmlPath, '<kol-alert></kol-alert>');

        const task = new TestRenameTagTask('kol-alert', 'kol-notice');
        task.run(tmpDir);

        const tsxContent = fs.readFileSync(tsxPath, 'utf8');
        const htmlContent = fs.readFileSync(htmlPath, 'utf8');
        assert.ok(tsxContent.includes('KolNotice'));
        assert.ok(htmlContent.includes('kol-notice'));
    });
});
