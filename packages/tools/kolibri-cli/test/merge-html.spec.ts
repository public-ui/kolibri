import fs from 'fs';
import assert from 'node:assert';
import os from 'os';
import path from 'path';
import { MergeHtmlTask } from '../src/migrate/runner/tasks/common/MergeHtmlTask';

describe('MergeHtmlTask', () => {
	it('injects html snippet into file', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const filePath = path.join(tmpDir, 'index.html');
		fs.writeFileSync(filePath, '<head>\n</head>');

		const snippet = '<meta name="test" />';
		const task = MergeHtmlTask.getInstance('test', filePath, 'index.html', snippet, '^1');
		task.run();

		const content = fs.readFileSync(filePath, 'utf8');
		assert.ok(content.includes(snippet));
	});
});
