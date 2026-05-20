import fs from 'fs';
import assert from 'node:assert';
import os from 'os';
import path from 'path';
import { MapLinkVariantStandaloneToInlineTask } from '../src/migrate/runner/tasks/v4/link';

describe('MapVariantStandaloneToInlineTask', () => {
	it('maps kol-input-password variant visibility-toggle to visibilityToggle=true flag in component files', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const tsxPath = path.join(tmpDir, 'component.tsx');
		fs.writeFileSync(tsxPath, '<KolInputPassword _label="Password" _variant="visibility-toggle" />');

		MapLinkVariantStandaloneToInlineTask.run(tmpDir);

		const content = fs.readFileSync(tsxPath, 'utf8');
		assert.ok(!content.includes('_variant'));
		assert.ok(content.includes('_visibilityToggle={true}'));
	});
	it('maps kol-input-password variant default to visibilityToggle=false flag in component files', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const tsxPath = path.join(tmpDir, 'component.tsx');
		fs.writeFileSync(tsxPath, '<KolInputPassword _label="Password" _variant="default" />');

		MapLinkVariantStandaloneToInlineTask.run(tmpDir);

		const content = fs.readFileSync(tsxPath, 'utf8');
		assert.ok(!content.includes('_variant'));
		assert.ok(content.includes('_visibilityToggle={false}'));
	});
});
