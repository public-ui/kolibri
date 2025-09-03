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
	let tempDirectories: string[] = [];

	afterEach(() => {
		// Clean up temporary directories created during tests
		tempDirectories.forEach((tmpDir) => {
			if (fs.existsSync(tmpDir)) {
				fs.rmSync(tmpDir, { recursive: true, force: true });
			}
		});
		tempDirectories = [];
	});

	// Helper function to create and track temporary directories
	const createTempDir = (): string => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		tempDirectories.push(tmpDir);
		return tmpDir;
	};

	it('adds selectors when missing', () => {
		const tmpDir = createTempDir();
		const scssPath = path.join(tmpDir, 'style.scss');
		fs.writeFileSync(scssPath, '.block { color: red; }');

		const task = ScssAddSelectorTask.getInstance('.new-block', 'color: blue;', '^1');
		task.run(tmpDir);

		const content = fs.readFileSync(scssPath, 'utf8');
		assert.ok(content.includes('.new-block'));
		assert.ok(content.includes('color: blue;'));
	});

	it('adds selectors with consistent formatting for tab-indented files', () => {
		const tmpDir = createTempDir();
		const scssPath = path.join(tmpDir, 'style.scss');
		// File using tabs with newlines around braces
		const tabIndentedCSS = `.existing {\n\tcolor: red;\n\tpadding: 10px;\n}\n`;
		fs.writeFileSync(scssPath, tabIndentedCSS);

		const task = ScssAddSelectorTask.getInstance('.new-block', 'background: blue;\nmargin: 5px;', '^1');
		task.run(tmpDir);

		const content = fs.readFileSync(scssPath, 'utf8');
		assert.ok(content.includes('.new-block'));
		assert.ok(content.includes('background: blue;'));
		assert.ok(content.includes('margin: 5px;'));
		// Should maintain the same formatting style (newlines around braces)
		assert.ok(content.includes('.new-block {\n\tbackground: blue;\n\tmargin: 5px;\n}'));
	});

	it('adds selectors with consistent formatting for space-indented files', () => {
		const tmpDir = createTempDir();
		const scssPath = path.join(tmpDir, 'style.scss');
		// File using 2 spaces with newlines around braces
		const spaceIndentedCSS = `.existing {\n  color: red;\n  padding: 10px;\n}\n`;
		fs.writeFileSync(scssPath, spaceIndentedCSS);

		const task = ScssAddSelectorTask.getInstance('.new-block', 'background: blue;\nmargin: 5px;', '^1');
		task.run(tmpDir);

		const content = fs.readFileSync(scssPath, 'utf8');
		assert.ok(content.includes('.new-block'));
		assert.ok(content.includes('  background: blue;'));
		assert.ok(content.includes('  margin: 5px;'));
		// Should maintain the same formatting style (2-space indentation)
		assert.ok(content.includes('.new-block {\n  background: blue;\n  margin: 5px;\n}'));
	});

	it('adds selectors to empty files with default formatting', () => {
		const tmpDir = createTempDir();
		const scssPath = path.join(tmpDir, 'style.scss');
		fs.writeFileSync(scssPath, '');

		const task = ScssAddSelectorTask.getInstance('.new-block', 'color: blue;', '^1');
		task.run(tmpDir);

		const content = fs.readFileSync(scssPath, 'utf8');
		assert.ok(content.includes('.new-block'));
		assert.ok(content.includes('color: blue;'));
		// Should use default formatting with spaces
		assert.ok(content.includes('.new-block {\n  color: blue;\n}'));
	});

	it('does not duplicate existing selectors', () => {
		const tmpDir = createTempDir();
		const scssPath = path.join(tmpDir, 'style.scss');
		fs.writeFileSync(scssPath, '.existing-block { color: red; }');

		const task = ScssAddSelectorTask.getInstance('.existing-block', 'background: blue;', '^1');
		task.run(tmpDir);

		const content = fs.readFileSync(scssPath, 'utf8');
		// Should not have added another .existing-block selector
		const matches = content.match(/\.existing-block/g);
		assert.equal(matches?.length, 1);
	});

	it('removes selectors', () => {
		const tmpDir = createTempDir();
		const scssPath = path.join(tmpDir, 'style.scss');
		fs.writeFileSync(scssPath, '.old { color: red; }');

		const task = ScssRemoveSelectorTask.getInstance('.old', '^1');
		task.run(tmpDir);

		const content = fs.readFileSync(scssPath, 'utf8');
		assert.ok(content.includes('/* removed .old */'));
		assert.ok(!content.includes('.old {'));
	});

	it('removes selectors with nested rules (media queries)', () => {
		const tmpDir = createTempDir();
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
		const tmpDir = createTempDir();
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
		const tmpDir = createTempDir();
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
		const tmpDir = createTempDir();
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

	it('removes individual selectors from comma-separated lists', () => {
		const tmpDir = createTempDir();
		const scssPath = path.join(tmpDir, 'style.scss');
		const css = `.old, .keep {
  color: red;
  background: blue;
}

.another .old {
  margin: 10px;
}

.old {
  padding: 5px;
}`;
		fs.writeFileSync(scssPath, css);

		const task = ScssRemoveSelectorTask.getInstance('.old', '^1');
		task.run(tmpDir);

		const content = fs.readFileSync(scssPath, 'utf8');

		// The .keep should remain in the comma-separated list
		assert.ok(content.includes('.keep {'));
		assert.ok(content.includes('color: red;'));
		assert.ok(content.includes('background: blue;'));

		// The standalone .old selectors should be removed
		assert.ok(content.includes('/* removed .old */'));

		// Should not contain .old selectors anymore
		assert.ok(!content.includes('.old {'));
		assert.ok(!content.includes('.old,'));
	});

	it('removes middle selector from comma-separated list', () => {
		const tmpDir = createTempDir();
		const scssPath = path.join(tmpDir, 'style.scss');
		const css = `.first, .second, .third {
  color: blue;
}`;
		fs.writeFileSync(scssPath, css);

		const task = ScssRemoveSelectorTask.getInstance('.second', '^1');
		task.run(tmpDir);

		const content = fs.readFileSync(scssPath, 'utf8');

		// The first and third should remain
		assert.ok(content.includes('.first, .third {'));
		assert.ok(content.includes('color: blue;'));

		// Should not contain .second anymore
		assert.ok(!content.includes('.second'));
	});

	it('renames block selectors', () => {
		const tmpDir = createTempDir();
		const scssPath = path.join(tmpDir, 'style.scss');
		fs.writeFileSync(scssPath, '.old-block { color: red; }');

		const task = ScssRenameBlockTask.getInstance('old-block', 'new-block', '^1');
		task.run(tmpDir);

		const content = fs.readFileSync(scssPath, 'utf8');
		assert.ok(content.includes('.new-block'));
	});

	it('renames element selectors', () => {
		const tmpDir = createTempDir();
		const scssPath = path.join(tmpDir, 'style.scss');
		fs.writeFileSync(scssPath, '.block__old { color: red; }');

		const task = ScssRenameElementTask.getInstance('block', 'old', 'new', '^1');
		task.run(tmpDir);

		const content = fs.readFileSync(scssPath, 'utf8');
		assert.ok(content.includes('.block__new'));
	});

	it('renames modifier selectors', () => {
		const tmpDir = createTempDir();
		const scssPath = path.join(tmpDir, 'style.scss');
		fs.writeFileSync(scssPath, '.block--old { color: red; }');

		const task = ScssRenameModifierTask.getInstance('block', 'old', 'new', '^1');
		task.run(tmpDir);

		const content = fs.readFileSync(scssPath, 'utf8');
		assert.ok(content.includes('.block--new'));
	});

	it('updates tokens', () => {
		const tmpDir = createTempDir();
		const scssPath = path.join(tmpDir, 'style.scss');
		fs.writeFileSync(scssPath, '$old-color: red; .btn { color: $old-color; }');

		const task = ScssUpdateTokenTask.getInstance('$old-color', '$new-color', '^1');
		task.run(tmpDir);

		const content = fs.readFileSync(scssPath, 'utf8');
		assert.ok(content.includes('$new-color'));
		assert.ok(!content.includes('$old-color'));
	});
});
