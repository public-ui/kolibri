import fs from 'fs';
import assert from 'node:assert';
import os from 'os';
import path from 'path';
import { RenamePasswordVariantToVisibilityToggleTasks } from '../src/migrate/runner/tasks/v4/password-variant';

describe('RefactorInputPasswordVariantToVisibilityToggle', () => {
	it('maps kol-input-password variant visibility-toggle to visibilityToggle=true flag in component files', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const tsxPath = path.join(tmpDir, 'component.tsx');
		fs.writeFileSync(tsxPath, '<KolInputPassword _label="Password" _variant="visibility-toggle" />');

		RenamePasswordVariantToVisibilityToggleTasks.forEach((task) => task.run(tmpDir));

		const content = fs.readFileSync(tsxPath, 'utf8');
		assert.ok(content.includes('_visibilityToggle={true}'));
		assert.ok(!content.includes('_variant'));
	});

	it('maps kol-input-password variant visibility-toggle to custom-element true attribute in html files', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const htmlPath = path.join(tmpDir, 'component.html');
		fs.writeFileSync(htmlPath, '<kol-input-password _label="Password" _variant="visibility-toggle"></kol-input-password>');

		RenamePasswordVariantToVisibilityToggleTasks.forEach((task) => task.run(tmpDir));

		const content = fs.readFileSync(htmlPath, 'utf8');
		assert.ok(content.includes('_visibility-toggle="true"'));
		assert.ok(!content.includes('_variant'));
	});

	it('removes kol-input-password visibilityToggle prop when variant is default in component files', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const tsxPath = path.join(tmpDir, 'component.tsx');
		fs.writeFileSync(tsxPath, '<KolInputPassword _label="Password" _variant="default" />');

		RenamePasswordVariantToVisibilityToggleTasks.forEach((task) => task.run(tmpDir));

		const content = fs.readFileSync(tsxPath, 'utf8');
		assert.ok(!content.includes('_visibilityToggle'));
		assert.ok(!content.includes('_variant'));
	});

	it('removes mapped default visibility toggle in custom element files', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const htmlPath = path.join(tmpDir, 'component.html');
		fs.writeFileSync(htmlPath, '<kol-input-password _label="Password" _variant="default"></kol-input-password>');

		RenamePasswordVariantToVisibilityToggleTasks.forEach((task) => task.run(tmpDir));

		const content = fs.readFileSync(htmlPath, 'utf8');
		assert.ok(!content.includes('_visibility-toggle'));
		assert.ok(!content.includes('_variant'));
	});
});
