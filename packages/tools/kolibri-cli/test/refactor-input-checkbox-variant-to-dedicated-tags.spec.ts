import fs from 'fs';
import assert from 'node:assert';
import os from 'os';
import path from 'path';
import { RenameCheckboxVariantToTagNameTask } from '../src/migrate/runner/tasks/v4/checkbox-variant';

describe('RenameCheckboxVariantToTagNameTask', () => {
	it('renames the switch variant to kol-input-switch in component files and drops the variant attribute', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const tsxPath = path.join(tmpDir, 'component.tsx');
		fs.writeFileSync(tsxPath, '<KolInputCheckbox _label="Label" _variant="switch" />');

		RenameCheckboxVariantToTagNameTask.getInstance('^4').run(tmpDir);

		const content = fs.readFileSync(tsxPath, 'utf8');
		assert.ok(content.includes('<KolInputSwitch _label="Label" />'));
		assert.ok(!content.includes('_variant'));
	});

	it('renames the button variant to kol-input-toggle-button in component files', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const tsxPath = path.join(tmpDir, 'component.tsx');
		fs.writeFileSync(tsxPath, '<KolInputCheckbox _label="Label" _variant="button" />');

		RenameCheckboxVariantToTagNameTask.getInstance('^4').run(tmpDir);

		const content = fs.readFileSync(tsxPath, 'utf8');
		assert.ok(content.includes('<KolInputToggleButton _label="Label" />'));
		assert.ok(!content.includes('_variant'));
	});

	it('renames the switch variant to kol-input-switch in markup files', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const htmlPath = path.join(tmpDir, 'component.html');
		fs.writeFileSync(htmlPath, '<kol-input-checkbox _label="Label" _variant="switch"></kol-input-checkbox>');

		RenameCheckboxVariantToTagNameTask.getInstance('^4').run(tmpDir);

		const content = fs.readFileSync(htmlPath, 'utf8');
		assert.ok(content.includes('<kol-input-switch _label="Label"></kol-input-switch>'));
		assert.ok(!content.includes('_variant'));
	});

	it('keeps the checkbox and its variant attribute for the default variant', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const htmlPath = path.join(tmpDir, 'component.html');
		fs.writeFileSync(htmlPath, '<kol-input-checkbox _label="Label" _variant="default"></kol-input-checkbox>');

		RenameCheckboxVariantToTagNameTask.getInstance('^4').run(tmpDir);

		const content = fs.readFileSync(htmlPath, 'utf8');
		assert.ok(content.includes('<kol-input-checkbox _label="Label" _variant="default"></kol-input-checkbox>'));
	});
});
