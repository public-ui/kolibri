import assert from 'node:assert';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { RemoveToasterGetInstanceOptionsTask } from '../src/migrate/runner/tasks/v4/toaster';
import { setRemoveMode } from '../src/migrate/shares/reuse';

describe('RemoveToasterGetInstanceOptionsTask', () => {
	beforeEach(() => {
		setRemoveMode('delete');
	});

	afterEach(() => {
		setRemoveMode('prefix');
	});

	it('removes defaultVariant option from getInstance calls', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const tsPath = path.join(tmpDir, 'component.ts');
		fs.writeFileSync(
			tsPath,
			`
			const toaster = ToasterService.getInstance(document, {
				defaultVariant: 'card',
			});
		`,
		);

		const task = RemoveToasterGetInstanceOptionsTask.getInstance('^4');
		task.run(tmpDir);

		const content = fs.readFileSync(tsPath, 'utf8');
		assert.ok(!content.includes('defaultVariant'));
		assert.ok(content.includes('ToasterService.getInstance(document)'));
	});

	it('removes entire options object when only defaultVariant is present', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const tsxPath = path.join(tmpDir, 'component.tsx');
		fs.writeFileSync(
			tsxPath,
			`
			const toaster = ToasterService.getInstance(document, { defaultVariant: 'card' });
		`,
		);

		const task = RemoveToasterGetInstanceOptionsTask.getInstance('^4');
		task.run(tmpDir);

		const content = fs.readFileSync(tsxPath, 'utf8');
		assert.ok(!content.includes('defaultVariant'));
		assert.ok(!content.includes('{ }'));
		assert.ok(content.includes('ToasterService.getInstance(document)'));
	});

	it('preserves other options when removing defaultVariant', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const jsPath = path.join(tmpDir, 'component.js');
		fs.writeFileSync(
			jsPath,
			`
			const toaster = ToasterService.getInstance(document, {
				defaultVariant: 'card',
				someOtherOption: 'value',
				anotherOption: true,
			});
		`,
		);

		const task = RemoveToasterGetInstanceOptionsTask.getInstance('^4');
		task.run(tmpDir);

		const content = fs.readFileSync(jsPath, 'utf8');
		assert.ok(!content.includes('defaultVariant'));
		assert.ok(content.includes("someOtherOption: 'value'"));
		assert.ok(content.includes('anotherOption: true'));
		// Should still have the options object
		assert.ok(content.includes('ToasterService.getInstance(document, {'));
	});

	it('handles multiple getInstance calls in same file', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const tsPath = path.join(tmpDir, 'component.ts');
		fs.writeFileSync(
			tsPath,
			`
			const toaster1 = ToasterService.getInstance(document, {
				defaultVariant: 'card',
			});

			const toaster2 = ToasterService.getInstance(window.document, { defaultVariant: 'card' });

			const toaster3 = ToasterService.getInstance(document);
		`,
		);

		const task = RemoveToasterGetInstanceOptionsTask.getInstance('^4');
		task.run(tmpDir);

		const content = fs.readFileSync(tsPath, 'utf8');
		assert.ok(!content.includes('defaultVariant'));
		assert.ok(content.includes('ToasterService.getInstance(document)'));
		assert.ok(content.includes('ToasterService.getInstance(window.document)'));
		// Count occurrences of getInstance without options
		const matches = content.match(/ToasterService\.getInstance\([^,)]+\)/g);
		assert.strictEqual(matches?.length, 3);
	});

	it('handles defaultVariant at different positions in options object', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const tsPath = path.join(tmpDir, 'component.ts');
		fs.writeFileSync(
			tsPath,
			`
			const toaster1 = ToasterService.getInstance(document, {
				option1: 'value1',
				defaultVariant: 'card',
				option2: 'value2',
			});
		`,
		);

		const task = RemoveToasterGetInstanceOptionsTask.getInstance('^4');
		task.run(tmpDir);

		const content = fs.readFileSync(tsPath, 'utf8');
		assert.ok(!content.includes('defaultVariant'));
		assert.ok(content.includes("option1: 'value1'"));
		assert.ok(content.includes("option2: 'value2'"));
		// Should not have comma issues
		assert.ok(!content.includes("option1: 'value1',,"));
		assert.ok(!content.includes(",, option2: 'value2'"));
	});

	it('does not modify getInstance calls without defaultVariant', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const tsPath = path.join(tmpDir, 'component.ts');
		fs.writeFileSync(
			tsPath,
			`
			const toaster1 = ToasterService.getInstance(document);
			const toaster2 = ToasterService.getInstance(document, {
				someOtherOption: 'value',
			});
		`,
		);

		const task = RemoveToasterGetInstanceOptionsTask.getInstance('^4');
		task.run(tmpDir);

		const content = fs.readFileSync(tsPath, 'utf8');
		// Should remain unchanged
		assert.ok(content.includes('ToasterService.getInstance(document)'));
		assert.ok(content.includes("someOtherOption: 'value'"));
	});
});
