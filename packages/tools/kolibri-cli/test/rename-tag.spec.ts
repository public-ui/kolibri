import fs from 'fs';
import assert from 'node:assert';
import os from 'os';
import path from 'path';
import { RenameTagNameTask } from '../src/migrate/runner/tasks/common/RenameTagNameTask';

describe('RenameTagNameTask', () => {
	it('renames tag names in code files', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const tsxPath = path.join(tmpDir, 'component.tsx');
		fs.writeFileSync(tsxPath, '<KolAlert />');
		const htmlPath = path.join(tmpDir, 'sample.html');
		fs.writeFileSync(htmlPath, '<kol-alert></kol-alert>');

		const task = RenameTagNameTask.getInstance('kol-alert', 'kol-notice', '^1');
		task.run(tmpDir);

		const tsxContent = fs.readFileSync(tsxPath, 'utf8');
		const htmlContent = fs.readFileSync(htmlPath, 'utf8');
		assert.ok(tsxContent.includes('KolNotice'));
		assert.ok(htmlContent.includes('kol-notice'));
	});

	describe('Import Renaming - ESM Named Imports', () => {
		it('renames named imports on single line', () => {
			const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
			const tsxPath = path.join(tmpDir, 'component.tsx');
			fs.writeFileSync(tsxPath, "import { KolButton } from '@public-ui/react-v19';\nexport const Component = () => <KolButton />;");

			const task = RenameTagNameTask.getInstance('kol-button', 'kol-button-new', '^1');
			task.run(tmpDir);

			const content = fs.readFileSync(tsxPath, 'utf8');
			assert.ok(content.includes('KolButtonNew'));
			assert.ok(!content.match(/import\s*{\s*KolButton\s*}/));
		});

		it('renames named imports with multiple imports', () => {
			const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
			const tsxPath = path.join(tmpDir, 'component.tsx');
			fs.writeFileSync(tsxPath, "import { KolButton, KolBadge, KolCard } from '@public-ui/react-v19';\nexport const Component = () => <KolButton />;");

			const task = RenameTagNameTask.getInstance('kol-button', 'kol-button-new', '^1');
			task.run(tmpDir);

			const content = fs.readFileSync(tsxPath, 'utf8');
			assert.ok(content.includes('KolButtonNew'));
			assert.ok(content.includes('KolBadge'));
			assert.ok(content.includes('KolCard'));
			assert.ok(!content.includes('import { KolButton,'));
		});

		it('renames named imports on multiple lines', () => {
			const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
			const tsxPath = path.join(tmpDir, 'component.tsx');
			fs.writeFileSync(
				tsxPath,
				`import {
	KolButton,
	KolBadge,
	KolCard
} from '@public-ui/react-v19';
export const Component = () => <KolButton />;`,
			);

			const task = RenameTagNameTask.getInstance('kol-button', 'kol-button-new', '^1');
			task.run(tmpDir);

			const content = fs.readFileSync(tsxPath, 'utf8');
			assert.ok(content.includes('KolButtonNew'));
			assert.ok(content.includes('KolBadge'));
			assert.ok(!content.includes('import {\n\tKolButton,'));
		});
	});

	describe('Import Renaming - ESM Default Imports', () => {
		it('renames default import', () => {
			const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
			const tsxPath = path.join(tmpDir, 'component.tsx');
			fs.writeFileSync(tsxPath, "import KolButton from '@public-ui/react-v19/button';\nexport const Component = () => <KolButton />;");

			const task = RenameTagNameTask.getInstance('kol-button', 'kol-button-new', '^1');
			task.run(tmpDir);

			const content = fs.readFileSync(tsxPath, 'utf8');
			assert.ok(content.includes('import KolButtonNew from'));
			assert.ok(content.includes('<KolButtonNew />'));
			assert.ok(!content.includes('import KolButton from'));
		});
	});

	describe('Import Renaming - TypeScript Type Imports', () => {
		it('renames type imports', () => {
			const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
			const tsxPath = path.join(tmpDir, 'component.tsx');
			fs.writeFileSync(tsxPath, "import type { KolButtonProps } from '@public-ui/react-v19';\nimport { KolButton } from '@public-ui/react-v19';");

			const task = RenameTagNameTask.getInstance('kol-button', 'kol-button-new', '^1');
			task.run(tmpDir);

			const content = fs.readFileSync(tsxPath, 'utf8');
			assert.ok(content.includes('import { KolButtonNew }'));
		});

		it('renames type imports with multiple types', () => {
			const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
			const tsxPath = path.join(tmpDir, 'component.tsx');
			fs.writeFileSync(
				tsxPath,
				`import type {
	KolButton,
	KolButtonProps
} from '@public-ui/react-v19';`,
			);

			const task = RenameTagNameTask.getInstance('kol-button', 'kol-button-new', '^1');
			task.run(tmpDir);

			const content = fs.readFileSync(tsxPath, 'utf8');
			assert.ok(content.includes('KolButtonNew'));
		});
	});

	describe('Import Renaming - CommonJS-style Requires in TSX', () => {
		it('renames CommonJS named require', () => {
			const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
			const tsxPath = path.join(tmpDir, 'component.tsx');
			fs.writeFileSync(tsxPath, "const { KolButton } = require('@public-ui/react-v19');\nmodule.exports = KolButton;");

			const task = RenameTagNameTask.getInstance('kol-button', 'kol-button-new', '^1');
			task.run(tmpDir);

			const content = fs.readFileSync(tsxPath, 'utf8');
			assert.ok(content.includes('KolButtonNew'));
		});

		it('renames CommonJS require with multiple imports', () => {
			const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
			const tsxPath = path.join(tmpDir, 'component.tsx');
			fs.writeFileSync(
				tsxPath,
				`const {
	KolButton,
	KolBadge
} = require('@public-ui/react-v19');`,
			);

			const task = RenameTagNameTask.getInstance('kol-button', 'kol-button-new', '^1');
			task.run(tmpDir);

			const content = fs.readFileSync(tsxPath, 'utf8');
			assert.ok(content.includes('KolButtonNew'));
			assert.ok(content.includes('KolBadge'));
		});

		it('renames CommonJS const and var declarations', () => {
			const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
			const tsxPath = path.join(tmpDir, 'component.tsx');
			fs.writeFileSync(tsxPath, "var { KolButton } = require('@public-ui/react-v19');\nlet { KolBadge } = require('@public-ui/react-v19');");

			const task = RenameTagNameTask.getInstance('kol-button', 'kol-button-new', '^1');
			task.run(tmpDir);

			const content = fs.readFileSync(tsxPath, 'utf8');
			assert.ok(content.includes('KolButtonNew'));
		});
	});

	describe('Complex Scenarios', () => {
		it('handles file with mixed imports and usage', () => {
			const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
			const tsxPath = path.join(tmpDir, 'component.tsx');
			fs.writeFileSync(
				tsxPath,
				`import type { KolButton } from '@public-ui/react-v19';
import { KolButton, KolBadge } from '@public-ui/react-v19';
const Button = require('@public-ui/react-v19').KolButton;

export const Component = () => (
	<div>
		<KolButton _label="Click" />
		<kol-button _label="HTML" />
	</div>
);`,
			);

			const task = RenameTagNameTask.getInstance('kol-button', 'kol-button-new', '^1');
			task.run(tmpDir);

			const content = fs.readFileSync(tsxPath, 'utf8');
			assert.ok(content.includes('KolButtonNew'));
			assert.ok(content.includes('kol-button-new'));
			assert.ok(content.includes('KolBadge'));
			// Verify old names don't exist
			assert.ok(!content.includes('{ KolButton,'));
		});

		it('does not rename similar component names', () => {
			const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
			const tsxPath = path.join(tmpDir, 'component.tsx');
			fs.writeFileSync(tsxPath, "import { KolButton, KolButtonGroup } from '@public-ui/react-v19';\nexport const Component = () => <KolButton />;");

			const task = RenameTagNameTask.getInstance('kol-button', 'kol-button-new', '^1');
			task.run(tmpDir);

			const content = fs.readFileSync(tsxPath, 'utf8');
			assert.ok(content.includes('KolButtonNew'));
			assert.ok(content.includes('KolButtonGroup')); // Should NOT be changed
			assert.ok(!content.includes('import { KolButton,'));
		});

		it('handles imports from different @public-ui packages', () => {
			const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
			const tsxPath = path.join(tmpDir, 'component.tsx');
			fs.writeFileSync(
				tsxPath,
				`import { KolButton } from '@public-ui/react-v19';
import { KolButton } from '@public-ui/vue';
import { KolButton } from '@public-ui/angular';`,
			);

			const task = RenameTagNameTask.getInstance('kol-button', 'kol-button-new', '^1');
			task.run(tmpDir);

			const content = fs.readFileSync(tsxPath, 'utf8');
			// All KolButton imports should be replaced with KolButtonNew
			assert.strictEqual((content.match(/KolButtonNew/g) || []).length, 3);
			assert.ok(!content.includes('import { KolButton }'));
		});
	});
});
