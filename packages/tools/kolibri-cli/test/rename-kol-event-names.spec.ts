import fs from 'fs';
import assert from 'node:assert';
import os from 'os';
import path from 'path';

import { RenameKolEventNamesTask } from '../src/migrate/runner/tasks/v4/events';

describe('RenameKolEventNamesTask', () => {
	let tmpDir: string;

	before(() => {
		tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
	});

	after(() => {
		if (fs.existsSync(tmpDir)) {
			fs.rmSync(tmpDir, { recursive: true, force: true });
		}
	});

	describe('basic event name replacements', () => {
		it('renames kolClick to click', () => {
			const tsPath = path.join(tmpDir, 'event-click.ts');
			fs.writeFileSync(tsPath, `element.addEventListener('kolClick', handler);`);

			const task = RenameKolEventNamesTask.getInstance('^4');
			task.run(tmpDir);

			const content = fs.readFileSync(tsPath, 'utf8');
			assert.ok(content.includes("addEventListener('click', handler)"));
			assert.ok(!content.includes('kolClick'));
		});

		it('renames kolChange to change', () => {
			const tsPath = path.join(tmpDir, 'event-change.ts');
			fs.writeFileSync(
				tsPath,
				`element.addEventListener('kolChange', handler);
element.dispatchEvent(new CustomEvent('kolChange', { detail: value }));`,
			);

			const task = RenameKolEventNamesTask.getInstance('^4');
			task.run(tmpDir);

			const content = fs.readFileSync(tsPath, 'utf8');
			assert.ok(content.includes("addEventListener('change', handler)"));
			assert.ok(content.includes("CustomEvent('change', { detail: value })"));
			assert.ok(!content.includes('kolChange'));
		});

		it('renames multiple different event names in one file', () => {
			const tsPath = path.join(tmpDir, 'event-multiple.ts');
			fs.writeFileSync(
				tsPath,
				`element.addEventListener('kolClick', clickHandler);
element.addEventListener('kolFocus', focusHandler);
element.addEventListener('kolBlur', blurHandler);
element.addEventListener('kolSubmit', submitHandler);`,
			);

			const task = RenameKolEventNamesTask.getInstance('^4');
			task.run(tmpDir);

			const content = fs.readFileSync(tsPath, 'utf8');
			assert.ok(content.includes("addEventListener('click', clickHandler)"));
			assert.ok(content.includes("addEventListener('focus', focusHandler)"));
			assert.ok(content.includes("addEventListener('blur', blurHandler)"));
			assert.ok(content.includes("addEventListener('submit', submitHandler)"));
			assert.ok(!content.includes('kol'));
		});

		it('renames all 18 event types correctly', () => {
			const tsPath = path.join(tmpDir, 'event-all.ts');
			fs.writeFileSync(
				tsPath,
				`element.addEventListener('kolBlur', handler);
element.addEventListener('kolChange', handler);
element.addEventListener('kolChangeHeaderCells', handler);
element.addEventListener('kolChangePage', handler);
element.addEventListener('kolChangePageSize', handler);
element.addEventListener('kolClick', handler);
element.addEventListener('kolClose', handler);
element.addEventListener('kolCreate', handler);
element.addEventListener('kolFocus', handler);
element.addEventListener('kolInput', handler);
element.addEventListener('kolKeydown', handler);
element.addEventListener('kolMousedown', handler);
element.addEventListener('kolReset', handler);
element.addEventListener('kolSelect', handler);
element.addEventListener('kolSelectionChange', handler);
element.addEventListener('kolSort', handler);
element.addEventListener('kolSubmit', handler);
element.addEventListener('kolToggle', handler);`,
			);

			const task = RenameKolEventNamesTask.getInstance('^4');
			task.run(tmpDir);

			const content = fs.readFileSync(tsPath, 'utf8');
			assert.ok(content.includes("addEventListener('blur', handler)"));
			assert.ok(content.includes("addEventListener('change', handler)"));
			assert.ok(content.includes("addEventListener('changeheadercells', handler)"));
			assert.ok(content.includes("addEventListener('changepage', handler)"));
			assert.ok(content.includes("addEventListener('changepagesize', handler)"));
			assert.ok(content.includes("addEventListener('click', handler)"));
			assert.ok(content.includes("addEventListener('close', handler)"));
			assert.ok(content.includes("addEventListener('create', handler)"));
			assert.ok(content.includes("addEventListener('focus', handler)"));
			assert.ok(content.includes("addEventListener('input', handler)"));
			assert.ok(content.includes("addEventListener('keydown', handler)"));
			assert.ok(content.includes("addEventListener('mousedown', handler)"));
			assert.ok(content.includes("addEventListener('reset', handler)"));
			assert.ok(content.includes("addEventListener('select', handler)"));
			assert.ok(content.includes("addEventListener('selectionchange', handler)"));
			assert.ok(content.includes("addEventListener('sort', handler)"));
			assert.ok(content.includes("addEventListener('submit', handler)"));
			assert.ok(content.includes("addEventListener('toggle', handler)"));
			assert.ok(!content.includes('kol'));
		});
	});

	describe('overlapping event names (critical)', () => {
		it('handles kolChangeHeaderCells without partial replacement by kolChange', () => {
			const tsPath = path.join(tmpDir, 'event-change-header-cells.ts');
			fs.writeFileSync(
				tsPath,
				`element.addEventListener('kolChangeHeaderCells', handler);
element.dispatchEvent(new CustomEvent('kolChangeHeaderCells', { detail: cells }));`,
			);

			const task = RenameKolEventNamesTask.getInstance('^4');
			task.run(tmpDir);

			const content = fs.readFileSync(tsPath, 'utf8');
			assert.ok(content.includes("addEventListener('changeheadercells', handler)"));
			assert.ok(content.includes("CustomEvent('changeheadercells', { detail: cells })"));
			assert.ok(!content.includes('kolChangeHeaderCells'));
			assert.ok(!content.includes('kolChange'));
		});

		it('handles both kolChange and kolChangeHeaderCells in the same file correctly', () => {
			const tsPath = path.join(tmpDir, 'event-both-change.ts');
			fs.writeFileSync(
				tsPath,
				`element.addEventListener('kolChange', changeHandler);
element.addEventListener('kolChangeHeaderCells', headerCellsHandler);
element.dispatchEvent(new CustomEvent('kolChange', { detail: value }));
element.dispatchEvent(new CustomEvent('kolChangeHeaderCells', { detail: cells }));`,
			);

			const task = RenameKolEventNamesTask.getInstance('^4');
			task.run(tmpDir);

			const content = fs.readFileSync(tsPath, 'utf8');
			assert.ok(content.includes("addEventListener('change', changeHandler)"));
			assert.ok(content.includes("addEventListener('changeheadercells', headerCellsHandler)"));
			assert.ok(content.includes("CustomEvent('change', { detail: value })"));
			assert.ok(content.includes("CustomEvent('changeheadercells', { detail: cells })"));
			assert.ok(!content.includes('kolChange'));
			assert.ok(!content.includes('kolChangeHeaderCells'));
		});

		it('handles kolChangePage without partial replacement by kolChange', () => {
			const tsPath = path.join(tmpDir, 'event-change-page.ts');
			fs.writeFileSync(
				tsPath,
				`element.addEventListener('kolChangePage', pageHandler);
element.addEventListener('kolChange', changeHandler);`,
			);

			const task = RenameKolEventNamesTask.getInstance('^4');
			task.run(tmpDir);

			const content = fs.readFileSync(tsPath, 'utf8');
			assert.ok(content.includes("addEventListener('changepage', pageHandler)"));
			assert.ok(content.includes("addEventListener('change', changeHandler)"));
			assert.ok(!content.includes('kolChange'));
		});

		it('handles kolChangePageSize without partial replacement by kolChange', () => {
			const tsPath = path.join(tmpDir, 'event-change-page-size.ts');
			fs.writeFileSync(
				tsPath,
				`element.addEventListener('kolChangePageSize', pageSizeHandler);
element.addEventListener('kolChange', changeHandler);`,
			);

			const task = RenameKolEventNamesTask.getInstance('^4');
			task.run(tmpDir);

			const content = fs.readFileSync(tsPath, 'utf8');
			assert.ok(content.includes("addEventListener('changepagesize', pageSizeHandler)"));
			assert.ok(content.includes("addEventListener('change', changeHandler)"));
			assert.ok(!content.includes('kolChange'));
		});

		it('handles kolSelectionChange without partial replacement by kolSelect', () => {
			const tsPath = path.join(tmpDir, 'event-selection-change.ts');
			fs.writeFileSync(
				tsPath,
				`element.addEventListener('kolSelectionChange', selectionChangeHandler);
element.addEventListener('kolSelect', selectHandler);`,
			);

			const task = RenameKolEventNamesTask.getInstance('^4');
			task.run(tmpDir);

			const content = fs.readFileSync(tsPath, 'utf8');
			assert.ok(content.includes("addEventListener('selectionchange', selectionChangeHandler)"));
			assert.ok(content.includes("addEventListener('select', selectHandler)"));
			assert.ok(!content.includes('kolSelect'));
		});

		it('handles all overlapping events together', () => {
			const tsPath = path.join(tmpDir, 'event-all-overlapping.ts');
			fs.writeFileSync(
				tsPath,
				`element.addEventListener('kolChange', handler);
element.addEventListener('kolChangeHeaderCells', handler);
element.addEventListener('kolChangePage', handler);
element.addEventListener('kolChangePageSize', handler);
element.addEventListener('kolSelect', handler);
element.addEventListener('kolSelectionChange', handler);`,
			);

			const task = RenameKolEventNamesTask.getInstance('^4');
			task.run(tmpDir);

			const content = fs.readFileSync(tsPath, 'utf8');
			assert.ok(content.includes("addEventListener('change', handler)"));
			assert.ok(content.includes("addEventListener('changeheadercells', handler)"));
			assert.ok(content.includes("addEventListener('changepage', handler)"));
			assert.ok(content.includes("addEventListener('changepagesize', handler)"));
			assert.ok(content.includes("addEventListener('select', handler)"));
			assert.ok(content.includes("addEventListener('selectionchange', handler)"));
			assert.ok(!content.includes('kol'));
		});
	});

	describe('word boundary handling', () => {
		it('replaces event names in addEventListener calls', () => {
			const testDir = path.join(tmpDir, 'addEventListener-test');
			fs.mkdirSync(testDir, { recursive: true });
			const tsPath = path.join(testDir, 'event-listener.ts');
			fs.writeFileSync(
				tsPath,
				`element.addEventListener('kolClick', handleClick);
element.addEventListener('kolFocus', handleFocus);
element.dispatchEvent(new CustomEvent('kolChange', { detail: value }));`,
			);

			const task = RenameKolEventNamesTask.getInstance('^4');
			task.run(testDir);

			const content = fs.readFileSync(tsPath, 'utf8');
			assert.ok(content.includes("addEventListener('click', handleClick)"));
			assert.ok(content.includes("addEventListener('focus', handleFocus)"));
			assert.ok(content.includes("CustomEvent('change', { detail: value })"));
			assert.ok(!content.includes('kolClick'));
			assert.ok(!content.includes('kolFocus'));
			assert.ok(!content.includes('kolChange'));
		});

		it('replaces event names in dispatchEvent calls', () => {
			const testDir = path.join(tmpDir, 'dispatchEvent-test');
			fs.mkdirSync(testDir, { recursive: true });
			const tsPath = path.join(testDir, 'dispatch.ts');
			fs.writeFileSync(
				tsPath,
				`this.host.dispatchEvent(new CustomEvent('kolClose'));
this.element.dispatchEvent(new CustomEvent('kolSubmit', { detail: formData }));`,
			);

			const task = RenameKolEventNamesTask.getInstance('^4');
			task.run(testDir);

			const content = fs.readFileSync(tsPath, 'utf8');
			assert.ok(content.includes("CustomEvent('close')"));
			assert.ok(content.includes("CustomEvent('submit', { detail: formData })"));
			assert.ok(!content.includes('kolClose'));
			assert.ok(!content.includes('kolSubmit'));
		});

		it('does not replace partial matches without word boundaries', () => {
			const tsPath = path.join(tmpDir, 'event-no-boundary.ts');
			fs.writeFileSync(
				tsPath,
				`const mykolChange = 'something';
const kolChangeInMyCode = () => {};
// This should be replaced because it has word boundaries:
element.addEventListener('kolChange', handler);`,
			);

			const task = RenameKolEventNamesTask.getInstance('^4');
			task.run(tmpDir);

			const content = fs.readFileSync(tsPath, 'utf8');
			// Variables and identifiers should NOT be replaced, because they are not event names in strings.
			assert.ok(content.includes('mykolChange'));
			assert.ok(!content.includes('mychange'));
			assert.ok(content.includes('kolChangeInMyCode'));
			assert.ok(!content.includes('changeInMyCode'));
			// The event listener should definitely be replaced.
			assert.ok(content.includes("addEventListener('change', handler)"));
		});

		it('replaces event names at start of line', () => {
			const tsPath = path.join(tmpDir, 'event-start-line.ts');
			fs.writeFileSync(
				tsPath,
				`kolChange
addEventListener('kolClick', handler);`,
			);

			const task = RenameKolEventNamesTask.getInstance('^4');
			task.run(tmpDir);

			const content = fs.readFileSync(tsPath, 'utf8');
			assert.ok(content.includes('change'));
			assert.ok(content.includes("addEventListener('click', handler)"));
		});

		it('replaces event names at end of line', () => {
			const tsPath = path.join(tmpDir, 'event-end-line.ts');
			fs.writeFileSync(
				tsPath,
				`const eventName = kolChange
addEventListener(kolClick, handler);`,
			);

			const task = RenameKolEventNamesTask.getInstance('^4');
			task.run(tmpDir);

			const content = fs.readFileSync(tsPath, 'utf8');
			assert.ok(content.includes('= change'));
			assert.ok(content.includes('addEventListener(click, handler)'));
		});
	});

	describe('file type support', () => {
		it('processes TypeScript files', () => {
			const testDir = path.join(tmpDir, 'ts-test');
			fs.mkdirSync(testDir, { recursive: true });
			const tsPath = path.join(testDir, 'test.ts');
			fs.writeFileSync(tsPath, `element.addEventListener('kolClick', handler);`);

			const task = RenameKolEventNamesTask.getInstance('^4');
			task.run(testDir);

			const content = fs.readFileSync(tsPath, 'utf8');
			assert.ok(content.includes("addEventListener('click', handler)"));
		});

		it('processes TSX files', () => {
			const testDir = path.join(tmpDir, 'tsx-test');
			fs.mkdirSync(testDir, { recursive: true });
			const tsxPath = path.join(testDir, 'test.tsx');
			fs.writeFileSync(tsxPath, `element.addEventListener('kolClick', handler);`);

			const task = RenameKolEventNamesTask.getInstance('^4');
			task.run(testDir);

			const content = fs.readFileSync(tsxPath, 'utf8');
			assert.ok(content.includes("addEventListener('click', handler)"));
		});

		it('processes JavaScript files', () => {
			const testDir = path.join(tmpDir, 'js-test');
			fs.mkdirSync(testDir, { recursive: true });
			const jsPath = path.join(testDir, 'test.js');
			fs.writeFileSync(jsPath, `element.addEventListener('kolClick', handler);`);

			const task = RenameKolEventNamesTask.getInstance('^4');
			task.run(testDir);

			const content = fs.readFileSync(jsPath, 'utf8');
			assert.ok(content.includes("addEventListener('click', handler)"));
		});

		it('processes HTML files', () => {
			const testDir = path.join(tmpDir, 'html-files-test');
			fs.mkdirSync(testDir, { recursive: true });
			const htmlPath = path.join(testDir, 'test.html');
			fs.writeFileSync(htmlPath, `<script>element.addEventListener('kolClick', handler);</script>`);

			const task = RenameKolEventNamesTask.getInstance('^4');
			task.run(testDir);

			const content = fs.readFileSync(htmlPath, 'utf8');
			assert.ok(content.includes("addEventListener('click', handler)"));
		});
	});

	describe('edge cases', () => {
		it('skips files without event names', () => {
			const tsPath = path.join(tmpDir, 'noop.ts');
			const originalContent = `element.addEventListener('click', handler);
export const noop = () => true;`;
			fs.writeFileSync(tsPath, originalContent);

			const task = RenameKolEventNamesTask.getInstance('^4');
			task.run(tmpDir);

			const content = fs.readFileSync(tsPath, 'utf8');
			assert.strictEqual(content, originalContent);
		});

		it('handles empty files', () => {
			const tsPath = path.join(tmpDir, 'empty.ts');
			fs.writeFileSync(tsPath, '');

			const task = RenameKolEventNamesTask.getInstance('^4');
			task.run(tmpDir);

			const content = fs.readFileSync(tsPath, 'utf8');
			assert.strictEqual(content, '');
		});

		it('handles multiple occurrences of same event', () => {
			const tsPath = path.join(tmpDir, 'multiple-same.ts');
			fs.writeFileSync(
				tsPath,
				`element.addEventListener('kolChange', handler1);
other.addEventListener('kolChange', handler2);
third.addEventListener('kolChange', handler3);`,
			);

			const task = RenameKolEventNamesTask.getInstance('^4');
			task.run(tmpDir);

			const content = fs.readFileSync(tsPath, 'utf8');
			const changeCount = (content.match(/addEventListener\('change'/g) || []).length;
			assert.strictEqual(changeCount, 3);
			assert.ok(!content.includes('kolChange'));
		});
	});
});
