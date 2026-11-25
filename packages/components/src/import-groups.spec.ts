import fs from 'node:fs';
import path from 'node:path';
import * as ts from 'typescript';

/**
 * Pins the import groups of every source file under `src`: the imports of packages first, then the
 * relative imports, the two groups separated by one blank line and each without a blank line of its
 * own. `prettier-plugin-organize-imports` sorts within a group and keeps the blank lines.
 */
const SRC = __dirname;

const sourceFiles = (dir: string): string[] =>
	fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) return sourceFiles(full);
		return /\.tsx?$/.test(entry.name) && !entry.name.endsWith('.d.ts') ? [full] : [];
	});

const importGroupProblems = (file: string): string[] => {
	const text = fs.readFileSync(file, 'utf8');
	const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, file.endsWith('x') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
	const imports: ts.ImportDeclaration[] = [];
	for (const statement of source.statements) {
		if (!ts.isImportDeclaration(statement)) break;
		imports.push(statement);
	}
	const isRelative = (declaration: ts.ImportDeclaration): boolean => (declaration.moduleSpecifier as ts.StringLiteral).text.startsWith('.');
	const lineOf = (position: number): number => source.getLineAndCharacterOfPosition(position).line;
	const problems: string[] = [];
	imports.slice(1).forEach((declaration, index) => {
		const previous = imports[index];
		const gap = lineOf(declaration.getStart(source)) - lineOf(previous.getEnd()) - 1;
		const groupChange = !isRelative(previous) && isRelative(declaration);
		const specifier = (declaration.moduleSpecifier as ts.StringLiteral).text;
		if (isRelative(previous) && !isRelative(declaration)) problems.push(`'${specifier}' follows a relative import`);
		else if (groupChange && gap !== 1) problems.push(`'${specifier}' starts the relative imports without one blank line before it`);
		else if (!groupChange && gap !== 0) problems.push(`'${specifier}' is separated from its group by ${gap} line(s)`);
	});
	return problems;
};

describe('Import groups', () => {
	const files = sourceFiles(SRC);

	it('finds the source files', () => {
		expect(files.length).toBeGreaterThan(500);
	});

	it('place the packages first and the relative imports second, separated by one blank line', () => {
		const problems = files.flatMap((file) => importGroupProblems(file).map((problem) => `${path.relative(SRC, file)}: ${problem}`));
		expect(problems).toEqual([]);
	});
});
