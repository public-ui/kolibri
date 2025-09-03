import assert from 'node:assert';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { ScssAddSelectorTask } from '../src/migrate/runner/tasks/common/ScssAddSelectorTask';
import { ScssRemoveSelectorTask } from '../src/migrate/runner/tasks/common/ScssRemoveSelectorTask';
import { ScssRenameBlockTask } from '../src/migrate/runner/tasks/common/ScssRenameBlockTask';
import { ScssRenameElementTask } from '../src/migrate/runner/tasks/common/ScssRenameElementTask';
import { ScssRenameModifierTask } from '../src/migrate/runner/tasks/common/ScssRenameModifierTask';
import { ScssUpdateTokenTask } from '../src/migrate/runner/tasks/common/ScssUpdateTokenTask';

describe('SCSS migration tasks', () => {
	it('adds selectors when missing', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const scssPath = path.join(tmpDir, 'style.scss');
		fs.writeFileSync(scssPath, '.block { color: red; }');

		const task = ScssAddSelectorTask.getInstance('.new-block', 'color: blue;', '^1');
		task.run(tmpDir);

		const content = fs.readFileSync(scssPath, 'utf8');
		assert.ok(content.includes('.new-block'));
		assert.ok(content.includes('color: blue;'));
	});

	it('removes selectors', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const scssPath = path.join(tmpDir, 'style.scss');
		fs.writeFileSync(scssPath, '.old { color: red; }');

		const task = ScssRemoveSelectorTask.getInstance('.old', '^1');
		task.run(tmpDir);

		const content = fs.readFileSync(scssPath, 'utf8');
		assert.ok(content.includes('/* removed .old */'));
		assert.ok(!content.includes('.old {'));
	});

	it('removes selectors with nested rules (media queries)', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const scssPath = path.join(tmpDir, 'style.scss');
		const complexCSS = `
.old {
	color: red;
	@media (min-width: 768px) {
		color: blue;
		font-size: 16px;
	}
	padding: 10px;
}
.keep { color: green; }`;
		fs.writeFileSync(scssPath, complexCSS);

		const task = ScssRemoveSelectorTask.getInstance('.old', '^1');
		task.run(tmpDir);

		const content = fs.readFileSync(scssPath, 'utf8');
		assert.ok(content.includes('/* removed .old */'));
		assert.ok(!content.includes('.old {'));
		assert.ok(content.includes('.keep { color: green; }'));
	});

	it('removes selectors with nested selectors', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const scssPath = path.join(tmpDir, 'style.scss');
		const nestedCSS = `
.old {
	color: red;
	.nested {
		background: blue;
		&:hover {
			background: darkblue;
		}
	}
	&::before {
		content: "";
	}
}
.keep { color: green; }`;
		fs.writeFileSync(scssPath, nestedCSS);

		const task = ScssRemoveSelectorTask.getInstance('.old', '^1');
		task.run(tmpDir);

		const content = fs.readFileSync(scssPath, 'utf8');
		assert.ok(content.includes('/* removed .old */'));
		assert.ok(!content.includes('.old {'));
		assert.ok(content.includes('.keep { color: green; }'));
	});

	it('removes selectors with comments and strings', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const scssPath = path.join(tmpDir, 'style.scss');
		const cssWithComments = `
.old {
	/* This is a comment with { braces } */
	color: red;
	content: "String with { braces }";
	// Single line comment with { braces }
	background: url("image{test}.png");
}
.keep { color: green; }`;
		fs.writeFileSync(scssPath, cssWithComments);

		const task = ScssRemoveSelectorTask.getInstance('.old', '^1');
		task.run(tmpDir);

		const content = fs.readFileSync(scssPath, 'utf8');
		assert.ok(content.includes('/* removed .old */'));
		assert.ok(!content.includes('.old {'));
		assert.ok(content.includes('.keep { color: green; }'));
	});

	it('removes multiple occurrences of the same selector', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const scssPath = path.join(tmpDir, 'style.scss');
		const multipleCSS = `
.old { color: red; }
.keep { color: green; }
.old {
	background: blue;
	@media (min-width: 768px) {
		background: darkblue;
	}
}`;
		fs.writeFileSync(scssPath, multipleCSS);

		const task = ScssRemoveSelectorTask.getInstance('.old', '^1');
		task.run(tmpDir);

		const content = fs.readFileSync(scssPath, 'utf8');
		assert.ok(content.includes('.keep { color: green; }'));
		// Both instances of .old should be removed
		assert.ok(!content.includes('.old {'));
		// Should have two removal comments
		const matches = content.match(/\/\* removed \.old \*\//g);
		assert.equal(matches?.length, 2);
	});

	it('renames block selectors', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const scssPath = path.join(tmpDir, 'style.scss');
		fs.writeFileSync(scssPath, '.old-block { color: red; }');

		const task = ScssRenameBlockTask.getInstance('old-block', 'new-block', '^1');
		task.run(tmpDir);

		const content = fs.readFileSync(scssPath, 'utf8');
		assert.ok(content.includes('.new-block'));
	});

	it('renames element selectors', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const scssPath = path.join(tmpDir, 'style.scss');
		fs.writeFileSync(scssPath, '.block__old { color: red; }');

		const task = ScssRenameElementTask.getInstance('block', 'old', 'new', '^1');
		task.run(tmpDir);

		const content = fs.readFileSync(scssPath, 'utf8');
		assert.ok(content.includes('.block__new'));
	});

	it('renames modifier selectors', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const scssPath = path.join(tmpDir, 'style.scss');
		fs.writeFileSync(scssPath, '.block--old { color: red; }');

		const task = ScssRenameModifierTask.getInstance('block', 'old', 'new', '^1');
		task.run(tmpDir);

		const content = fs.readFileSync(scssPath, 'utf8');
		assert.ok(content.includes('.block--new'));
	});

	it('updates tokens', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const scssPath = path.join(tmpDir, 'style.scss');
		fs.writeFileSync(scssPath, '$old-color: red; .btn { color: $old-color; }');

		const task = ScssUpdateTokenTask.getInstance('$old-color', '$new-color', '^1');
		task.run(tmpDir);

		const content = fs.readFileSync(scssPath, 'utf8');
		assert.ok(content.includes('$new-color'));
		assert.ok(!content.includes('$old-color'));
	});
});
