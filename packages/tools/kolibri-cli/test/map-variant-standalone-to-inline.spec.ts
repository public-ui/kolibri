import fs from 'fs';
import assert from 'node:assert';
import os from 'os';
import path from 'path';
import { MapButtonLinkVariantStandaloneToInlineTask, MapLinkVariantStandaloneToInlineTask } from '../src/migrate/runner/tasks/v4/link';

describe('MapVariantStandaloneToInlineTask', () => {
        it('maps kol-link standalone variant to inline flag in component files', () => {
                const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
                const tsxPath = path.join(tmpDir, 'component.tsx');
                fs.writeFileSync(tsxPath, '<KolLink _variant="standalone" />');

                MapLinkVariantStandaloneToInlineTask.run(tmpDir);

                const content = fs.readFileSync(tsxPath, 'utf8');
                assert.ok(!content.includes('_variant'));
                assert.ok(content.includes('_inline={false}'));
        });

        it('maps kol-button-link standalone variant to inline flag in custom element files', () => {
                const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
                const htmlPath = path.join(tmpDir, 'sample.html');
                fs.writeFileSync(htmlPath, '<kol-button-link _variant="standalone">Link</kol-button-link>');

                MapButtonLinkVariantStandaloneToInlineTask.run(tmpDir);

                const content = fs.readFileSync(htmlPath, 'utf8');
                assert.ok(!content.includes('_variant'));
                assert.ok(content.includes('_inline="false"'));
        });

        it('removes standalone variant when inline already exists', () => {
                const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
                const htmlPath = path.join(tmpDir, 'sample.html');
                fs.writeFileSync(htmlPath, '<kol-link _variant="standalone" _inline="true"></kol-link>');

                MapLinkVariantStandaloneToInlineTask.run(tmpDir);

                const content = fs.readFileSync(htmlPath, 'utf8');
                assert.ok(!content.includes('_variant'));
                assert.ok(content.includes('_inline="true"'));
        });

        it('ignores other variant values', () => {
                const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
                const tsxPath = path.join(tmpDir, 'component.tsx');
                fs.writeFileSync(tsxPath, '<KolLink _variant="primary" />');

                MapLinkVariantStandaloneToInlineTask.run(tmpDir);

                const content = fs.readFileSync(tsxPath, 'utf8');
                assert.ok(content.includes('_variant="primary"'));
                assert.ok(!content.includes('_inline'));
        });
});
