import fs from 'fs';
import assert from 'node:assert';
import os from 'os';
import path from 'path';
import { MoveTextContentToPropertyTask } from '../src/migrate/runner/tasks/common/MoveTextContentToPropertyTask';

const migrate = (fileName: string, content: string): string => {
	const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
	const filePath = path.join(tmpDir, fileName);
	fs.writeFileSync(filePath, content);
	MoveTextContentToPropertyTask.getInstance('kol-abbr', '_abbr', '^4.5.0-0').run(tmpDir);
	return fs.readFileSync(filePath, 'utf8');
};

describe('MoveTextContentToPropertyTask', () => {
	it('moves the text of a custom element into the property', () => {
		assert.strictEqual(migrate('sample.html', '<p>I am <kol-abbr>z. B.</kol-abbr> here.</p>'), '<p>I am <kol-abbr _abbr="z. B."></kol-abbr> here.</p>');
	});

	it('keeps the other attributes', () => {
		assert.strictEqual(migrate('sample.html', '<kol-abbr _label="zum Beispiel">z. B.</kol-abbr>'), '<kol-abbr _label="zum Beispiel" _abbr="z. B."></kol-abbr>');
	});

	it('moves the text of a React component into the property', () => {
		assert.strictEqual(migrate('sample.tsx', 'const x = <KolAbbr>e.g.</KolAbbr>;'), 'const x = <KolAbbr _abbr="e.g." />;');
	});

	for (const [name, content] of [
		['markup', '<kol-abbr><strong>z. B.</strong></kol-abbr>'],
		['an expression', 'const x = <KolAbbr>{text}</KolAbbr>;'],
		['an existing property', '<kol-abbr _abbr="e.g.">z. B.</kol-abbr>'],
	]) {
		it(`keeps an element with ${name}`, () => {
			const fileName = content.startsWith('const') ? 'sample.tsx' : 'sample.html';
			assert.strictEqual(migrate(fileName, content), content);
		});
	}
});
