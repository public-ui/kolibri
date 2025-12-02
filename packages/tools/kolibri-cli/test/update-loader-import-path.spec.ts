import fs from 'fs';
import assert from 'node:assert';
import os from 'os';
import path from 'path';
import { UpdateLoaderImportPathTask } from '../src/migrate/runner/tasks/v4/loader';

describe('UpdateLoaderImportPathTask', () => {
	let tmpDir: string;

	before(() => {
		tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
	});

	after(() => {
		if (fs.existsSync(tmpDir)) {
			fs.rmSync(tmpDir, { recursive: true, force: true });
		}
	});

	it('updates loader import path in TypeScript file', () => {
		const tsPath = path.join(tmpDir, 'main.ts');
		fs.writeFileSync(
			tsPath,
			`import { defineCustomElements } from '@public-ui/components/dist/loader';

defineCustomElements();
`,
		);

		const task = UpdateLoaderImportPathTask.getInstance('^4');
		task.run(tmpDir);

		const content = fs.readFileSync(tsPath, 'utf8');
		assert.ok(content.includes("import { defineCustomElements } from '@public-ui/components/loader';"));
		assert.ok(!content.includes('/dist/loader'));
	});

	it('updates loader import path in JavaScript file', () => {
		const jsPath = path.join(tmpDir, 'main.js');
		fs.writeFileSync(
			jsPath,
			`const { defineCustomElements } = require('@public-ui/components/dist/loader');

defineCustomElements();
`,
		);

		const task = UpdateLoaderImportPathTask.getInstance('^4');
		task.run(tmpDir);

		const content = fs.readFileSync(jsPath, 'utf8');
		assert.ok(content.includes("require('@public-ui/components/loader')"));
		assert.ok(!content.includes('/dist/loader'));
	});

	it('updates loader import path in TSX file', () => {
		const tsxPath = path.join(tmpDir, 'App.tsx');
		fs.writeFileSync(
			tsxPath,
			`import { defineCustomElements } from '@public-ui/components/dist/loader';
import { DEFAULT } from '@public-ui/themes';

export const App = () => {
	return <div>Hello</div>;
};

defineCustomElements();
`,
		);

		const task = UpdateLoaderImportPathTask.getInstance('^4');
		task.run(tmpDir);

		const content = fs.readFileSync(tsxPath, 'utf8');
		assert.ok(content.includes("import { defineCustomElements } from '@public-ui/components/loader';"));
		assert.ok(!content.includes('/dist/loader'));
		// Other imports should remain unchanged
		assert.ok(content.includes("import { DEFAULT } from '@public-ui/themes';"));
	});

	it('updates loader import path in JSX file', () => {
		const jsxPath = path.join(tmpDir, 'App.jsx');
		fs.writeFileSync(
			jsxPath,
			`import { defineCustomElements } from '@public-ui/components/dist/loader';

export const App = () => <div>Hello</div>;
`,
		);

		const task = UpdateLoaderImportPathTask.getInstance('^4');
		task.run(tmpDir);

		const content = fs.readFileSync(jsxPath, 'utf8');
		assert.ok(content.includes("import { defineCustomElements } from '@public-ui/components/loader';"));
		assert.ok(!content.includes('/dist/loader'));
	});

	it('updates loader import path in Vue file', () => {
		const vuePath = path.join(tmpDir, 'App.vue');
		fs.writeFileSync(
			vuePath,
			`<script setup lang="ts">
import { defineCustomElements } from '@public-ui/components/dist/loader';
import { DEFAULT } from '@public-ui/themes';

defineCustomElements();
</script>

<template>
	<div>Hello</div>
</template>
`,
		);

		const task = UpdateLoaderImportPathTask.getInstance('^4');
		task.run(tmpDir);

		const content = fs.readFileSync(vuePath, 'utf8');
		assert.ok(content.includes("import { defineCustomElements } from '@public-ui/components/loader';"));
		assert.ok(!content.includes('/dist/loader'));
	});

	it('handles multiple loader imports in same file', () => {
		const tsPath = path.join(tmpDir, 'multi-import.ts');
		fs.writeFileSync(
			tsPath,
			`import { defineCustomElements } from '@public-ui/components/dist/loader';
// Alternative import style
const loader = require('@public-ui/components/dist/loader');

defineCustomElements();
`,
		);

		const task = UpdateLoaderImportPathTask.getInstance('^4');
		task.run(tmpDir);

		const content = fs.readFileSync(tsPath, 'utf8');
		assert.ok(content.includes("import { defineCustomElements } from '@public-ui/components/loader';"));
		assert.ok(content.includes("require('@public-ui/components/loader')"));
		assert.ok(!content.includes('/dist/loader'));
	});

	it('does not modify files without loader import', () => {
		const tsPath = path.join(tmpDir, 'component.ts');
		const originalContent = `import { KolButton } from '@public-ui/components';

export const MyComponent = () => <KolButton>Click me</KolButton>;
`;
		fs.writeFileSync(tsPath, originalContent);

		const task = UpdateLoaderImportPathTask.getInstance('^4');
		task.run(tmpDir);

		const content = fs.readFileSync(tsPath, 'utf8');
		assert.strictEqual(content, originalContent);
	});

	it('does not modify files already using new import path', () => {
		const tsPath = path.join(tmpDir, 'already-migrated.ts');
		const originalContent = `import { defineCustomElements } from '@public-ui/components/loader';

defineCustomElements();
`;
		fs.writeFileSync(tsPath, originalContent);

		const task = UpdateLoaderImportPathTask.getInstance('^4');
		task.run(tmpDir);

		const content = fs.readFileSync(tsPath, 'utf8');
		assert.strictEqual(content, originalContent);
	});

	it('processes files in subdirectories', () => {
		const subDir = path.join(tmpDir, 'src', 'bootstrap');
		fs.mkdirSync(subDir, { recursive: true });
		const tsPath = path.join(subDir, 'init.ts');
		fs.writeFileSync(
			tsPath,
			`import { defineCustomElements } from '@public-ui/components/dist/loader';

defineCustomElements();
`,
		);

		const task = UpdateLoaderImportPathTask.getInstance('^4');
		task.run(tmpDir);

		const content = fs.readFileSync(tsPath, 'utf8');
		assert.ok(content.includes("import { defineCustomElements } from '@public-ui/components/loader';"));
		assert.ok(!content.includes('/dist/loader'));
	});

	it('updates loader import path in dynamic imports', () => {
		const tsPath = path.join(tmpDir, 'dynamic-import.ts');
		fs.writeFileSync(tsPath, `const loader = import('@public-ui/components/dist/loader');`);

		const task = UpdateLoaderImportPathTask.getInstance('^4');
		task.run(tmpDir);

		const content = fs.readFileSync(tsPath, 'utf8');
		assert.ok(content.includes("import('@public-ui/components/loader')"));
		assert.ok(!content.includes('/dist/loader'));
	});
});
