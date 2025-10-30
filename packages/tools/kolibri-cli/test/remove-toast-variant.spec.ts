import fs from 'fs';
import assert from 'node:assert';
import os from 'os';
import path from 'path';
import { RemoveToastVariantTask } from '../src/migrate/runner/tasks/v4/toast';
import { setRemoveMode } from '../src/migrate/shares/reuse';

describe('RemoveToastVariantTask', () => {
	beforeEach(() => {
		setRemoveMode('delete');
	});

	afterEach(() => {
		setRemoveMode('prefix');
	});

	it('removes variant property from enqueue calls', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const tsPath = path.join(tmpDir, 'component.ts');
		fs.writeFileSync(
			tsPath,
			`
			toaster.enqueue({
				description: 'Test toast',
				label: 'Test Label',
				type: 'info',
				variant: 'card',
			});
		`,
		);

		const task = RemoveToastVariantTask.getInstance('^4');
		task.run(tmpDir);

		const content = fs.readFileSync(tsPath, 'utf8');
		assert.ok(!content.includes('variant:'));
		assert.ok(content.includes("type: 'info'"));
		assert.ok(content.includes("description: 'Test toast'"));
	});

	it('removes variant property from enqueue calls with other properties', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const tsxPath = path.join(tmpDir, 'component.tsx');
		fs.writeFileSync(
			tsxPath,
			`
			toaster.enqueue({
				description: 'Another test',
				label: 'Another Label',
				type: 'success',
				variant: 'card',
				onClose: () => console.log('closed'),
			});
		`,
		);

		const task = RemoveToastVariantTask.getInstance('^4');
		task.run(tmpDir);

		const content = fs.readFileSync(tsxPath, 'utf8');
		assert.ok(!content.includes('variant:'));
		assert.ok(content.includes("type: 'success'"));
		assert.ok(content.includes('onClose:'));
		assert.ok(content.includes("description: 'Another test'"));
	});

	it('removes variant property from toast objects', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const jsPath = path.join(tmpDir, 'component.js');
		fs.writeFileSync(
			jsPath,
			`
			const toastConfig = {
				description: 'Test description',
				label: 'Test Label',
				type: 'warning',
				variant: 'card',
			};
			toaster.enqueue(toastConfig);
		`,
		);

		const task = RemoveToastVariantTask.getInstance('^4');
		task.run(tmpDir);

		const content = fs.readFileSync(jsPath, 'utf8');
		assert.ok(!content.includes('variant:'));
		assert.ok(content.includes("type: 'warning'"));
		assert.ok(content.includes("description: 'Test description'"));
	});

	it('handles single property variant removal', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const tsPath = path.join(tmpDir, 'component.ts');
		fs.writeFileSync(
			tsPath,
			`
			toaster.enqueue({
				type: 'error',
				variant: 'card'
			});
		`,
		);

		const task = RemoveToastVariantTask.getInstance('^4');
		task.run(tmpDir);

		const content = fs.readFileSync(tsPath, 'utf8');
		assert.ok(!content.includes('variant:'));
		assert.ok(content.includes("type: 'error'"));
		// Should not have trailing comma issues
		assert.ok(!content.includes("type: 'error',}"));
	});

	it('does not modify objects without type or label (not toast objects)', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const tsPath = path.join(tmpDir, 'component.ts');
		fs.writeFileSync(
			tsPath,
			`
			const config = {
				variant: 'card',
				other: 'value'
			};
		`,
		);

		const task = RemoveToastVariantTask.getInstance('^4');
		task.run(tmpDir);

		const content = fs.readFileSync(tsPath, 'utf8');
		// Should not modify non-toast objects
		assert.ok(content.includes("variant: 'card'"));
		assert.ok(content.includes("other: 'value'"));
	});
});
