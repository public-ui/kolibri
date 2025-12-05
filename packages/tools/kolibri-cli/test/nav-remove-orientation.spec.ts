import assert from 'node:assert';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { NavRemovePropertyOrientationTask } from '../src/migrate/runner/tasks/v4/nav';
import { setRemoveMode } from '../src/migrate/shares/reuse';

describe('NavRemovePropertyOrientationTask', () => {
        beforeEach(() => {
                setRemoveMode('delete');
        });

        afterEach(() => {
                setRemoveMode('prefix');
        });

        it('removes _orientation from component and custom element markup', () => {
                const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
                const tsxPath = path.join(tmpDir, 'component.tsx');
                const htmlPath = path.join(tmpDir, 'sample.html');
                fs.writeFileSync(tsxPath, '<KolNav _orientation="horizontal"></KolNav>');
                fs.writeFileSync(htmlPath, '<kol-nav _orientation="horizontal"></kol-nav>');

                NavRemovePropertyOrientationTask.run(tmpDir);

                const tsxContent = fs.readFileSync(tsxPath, 'utf8');
                const htmlContent = fs.readFileSync(htmlPath, 'utf8');
                assert.ok(!tsxContent.includes('_orientation'));
                assert.ok(!htmlContent.includes('_orientation'));
        });
});
