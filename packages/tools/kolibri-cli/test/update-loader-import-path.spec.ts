import fs from 'fs';
import assert from 'node:assert';
import os from 'os';
import path from 'path';
import { UpdateLoaderImportPathTask } from '../src/migrate/runner/tasks/v4/loader';

describe('UpdateLoaderImportPathTask', () => {
	it('updates loader import path in TypeScript file', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const tsPath = path.join(tmpDir, 'main.ts');
		fs.writeFileSync(
			tsPath,
			`import { register } from '@public-ui/components/dist/loader';

register([DEFAULT], []);
`,
		);

		const task = UpdateLoaderImportPathTask.getInstance('^4');
		task.run(tmpDir);

		const content = fs.readFileSync(tsPath, 'utf8');
		assert.ok(content.includes("import { register } from '@public-ui/components/loader';"));
		assert.ok(!content.includes('/dist/loader'));
	});

	it('updates loader import path in JavaScript file', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const jsPath = path.join(tmpDir, 'main.js');
		fs.writeFileSync(
			jsPath,
			`const { register } = require('@public-ui/components/dist/loader');

register([DEFAULT], []);
`,
		);

		const task = UpdateLoaderImportPathTask.getInstance('^4');
		task.run(tmpDir);

		const content = fs.readFileSync(jsPath, 'utf8');
		assert.ok(content.includes("require('@public-ui/components/loader')"));
		assert.ok(!content.includes('/dist/loader'));
	});

	it('updates loader import path in TSX file', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const tsxPath = path.join(tmpDir, 'App.tsx');
		fs.writeFileSync(
			tsxPath,
			`import { register } from '@public-ui/components/dist/loader';
import { DEFAULT } from '@public-ui/themes';

export const App = () => {
	return <div>Hello</div>;
};

register([DEFAULT], []);
`,
		);

		const task = UpdateLoaderImportPathTask.getInstance('^4');
		task.run(tmpDir);

		const content = fs.readFileSync(tsxPath, 'utf8');
		assert.ok(content.includes("import { register } from '@public-ui/components/loader';"));
		assert.ok(!content.includes('/dist/loader'));
		// Other imports should remain unchanged
		assert.ok(content.includes("import { DEFAULT } from '@public-ui/themes';"));
	});

	it('updates loader import path in JSX file', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const jsxPath = path.join(tmpDir, 'App.jsx');
		fs.writeFileSync(
			jsxPath,
			`import { register } from '@public-ui/components/dist/loader';

export const App = () => <div>Hello</div>;
`,
		);

		const task = UpdateLoaderImportPathTask.getInstance('^4');
		task.run(tmpDir);

		const content = fs.readFileSync(jsxPath, 'utf8');
		assert.ok(content.includes("import { register } from '@public-ui/components/loader';"));
		assert.ok(!content.includes('/dist/loader'));
	});

	it('updates loader import path in Vue file', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const vuePath = path.join(tmpDir, 'App.vue');
		fs.writeFileSync(
			vuePath,
			`<script setup lang="ts">
import { register } from '@public-ui/components/dist/loader';
import { DEFAULT } from '@public-ui/themes';

register([DEFAULT], []);
</script>

<template>
	<div>Hello</div>
</template>
`,
		);

		const task = UpdateLoaderImportPathTask.getInstance('^4');
		task.run(tmpDir);

		const content = fs.readFileSync(vuePath, 'utf8');
		assert.ok(content.includes("import { register } from '@public-ui/components/loader';"));
		assert.ok(!content.includes('/dist/loader'));
	});

	it('handles multiple loader imports in same file', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const tsPath = path.join(tmpDir, 'main.ts');
		fs.writeFileSync(
			tsPath,
			`import { register } from '@public-ui/components/dist/loader';
// Alternative import style
const loader = require('@public-ui/components/dist/loader');

register([DEFAULT], []);
`,
		);

		const task = UpdateLoaderImportPathTask.getInstance('^4');
		task.run(tmpDir);

		const content = fs.readFileSync(tsPath, 'utf8');
		assert.ok(content.includes("import { register } from '@public-ui/components/loader';"));
		assert.ok(content.includes("require('@public-ui/components/loader')"));
		assert.ok(!content.includes('/dist/loader'));
	});

	it('does not modify files without loader import', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
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
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const tsPath = path.join(tmpDir, 'main.ts');
		const originalContent = `import { register } from '@public-ui/components/loader';

register([DEFAULT], []);
`;
		fs.writeFileSync(tsPath, originalContent);

		const task = UpdateLoaderImportPathTask.getInstance('^4');
		task.run(tmpDir);

		const content = fs.readFileSync(tsPath, 'utf8');
		assert.strictEqual(content, originalContent);
	});

	it('processes files in subdirectories', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const subDir = path.join(tmpDir, 'src', 'bootstrap');
		fs.mkdirSync(subDir, { recursive: true });
		const tsPath = path.join(subDir, 'init.ts');
		fs.writeFileSync(
			tsPath,
			`import { register } from '@public-ui/components/dist/loader';

register([DEFAULT], []);
`,
		);

		const task = UpdateLoaderImportPathTask.getInstance('^4');
		task.run(tmpDir);

		const content = fs.readFileSync(tsPath, 'utf8');
		assert.ok(content.includes("import { register } from '@public-ui/components/loader';"));
		assert.ok(!content.includes('/dist/loader'));
	});
});
