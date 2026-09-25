import fs from 'node:fs';
import path from 'node:path';

/**
 * Public API contract test helpers — enforce ARC42 § "Public API Contract (Migration Parity)".
 *
 * The public API of a web component is its set of `@Prop`/`@Method` members including their
 * JSDoc, types, defaults and `@deprecated` markers. `stencil build --docs` generates
 * `custom-elements.json`, `docs-vscode` and the adapter IntelliSense from `prop.docs` /
 * `method.docs`, so a member without JSDoc silently loses its documentation.
 *
 * Every pinned component has its own `<component>.spec.ts` in this folder, so parallel
 * migrations do not touch the same file. A failing pin means the public contract changed — that
 * is a breaking change, not a refactor. It requires owner approval, a conscious update of the
 * pinned contract and a note in the PR description. The FC's props are internal by definition and
 * must NOT appear in the pinned contracts.
 */

export type ApiMember = {
	/** Prop name including the underscore prefix, or method name. */
	name: string;
	kind: 'prop' | 'method';
	/** Declared type annotation as written in the source (props only, otherwise ''). */
	type: string;
	/** Whether the prop is declared required (`_href!: HrefPropType`). */
	required: boolean;
	/** Default value literal as written in the source, if any. */
	default?: string;
	/** JSDoc text above the declaration, whitespace-normalized. */
	doc: string;
};

export type PublicApiContract = Record<string, Omit<ApiMember, 'name'>>;

/** Extracts `@Prop()` and `@Method()` members with their preceding JSDoc from a component source. */
export const extractPublicApi = (source: string): ApiMember[] => {
	const lines = source.split('\n');
	const isDocLine = (line: string): boolean => /^\s*(\/\*\*|\*|\*\/)/.test(line);
	const normalizeDoc = (doc: string[]): string =>
		doc
			.map((line) =>
				line
					.trim()
					.replace(/^\/\*\*\s?/, '')
					.replace(/\*\/\s?$/, '')
					.replace(/^\*\s?/, ''),
			)
			.join(' ')
			.replace(/\s+/g, ' ')
			.trim();

	const members: ApiMember[] = [];
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		if (!/^\s*@(Prop|Method)\(/.test(line)) {
			continue;
		}
		const kind = line.includes('@Prop(') ? 'prop' : 'method';

		const doc: string[] = [];
		let docEnd = i - 1;
		while (docEnd >= 0 && isDocLine(lines[docEnd])) {
			doc.unshift(lines[docEnd]);
			docEnd--;
		}

		if (kind === 'prop') {
			// Declaration on the decorator line (`@Prop() public _name?: T = default;`) or the next
			// non-comment line (`@Prop()` alone) — both styles exist in the repo.
			let declaration = line;
			if (!/public\s+_\w+/.test(declaration)) {
				let next = i + 1;
				while (next < lines.length && !/public\s+_\w+/.test(lines[next])) {
					next++;
				}
				declaration = lines[next] ?? '';
			}
			const match = declaration.match(/public\s+(_\w+)([!?])?\s*:\s*([^;=]+?)\s*(?:=\s*([^;]+?))?\s*;\s*$/);
			if (match) {
				members.push({
					name: match[1],
					kind,
					type: match[3].trim(),
					required: match[2] === '!',
					default: match[4] === undefined ? undefined : match[4].trim(),
					doc: normalizeDoc(doc),
				});
			}
		} else {
			let next = i + 1;
			while (next < lines.length && !/public\s+async\s+(\w+)\s*\(/.test(lines[next])) {
				next++;
			}
			const match = (lines[next] ?? '').match(/public\s+async\s+(\w+)\s*\(/);
			if (match) {
				members.push({ name: match[1], kind, type: '', required: false, doc: normalizeDoc(doc) });
			}
		}
	}
	return members;
};

/** Turns the member list into a comparable record (object equality ignores declaration order). */
export const toContract = (members: ApiMember[]): PublicApiContract => Object.fromEntries(members.map(({ name, ...contract }) => [name, contract]));

/** Reads a source file of a component folder under `src/components`. */
export const readSource = (component: string, file: string): string => fs.readFileSync(path.join(__dirname, '..', '..', component, file), 'utf8');

export const extractFrom = (component: string, file: string): ApiMember[] => extractPublicApi(readSource(component, file));

/** Lists the public members of a component source that carry no JSDoc. */
export const findUndocumentedMembers = (component: string, file: string): string[] =>
	extractFrom(component, file)
		.filter((member) => member.doc.length === 0)
		.map((member) => member.name);

type PublicApiContractOptions = {
	/** Custom element tag, used in the test title. */
	tag: string;
	/** Component folder under `src/components`. */
	component: string;
	/** Source file that declares the web component class. Defaults to `component.tsx`. */
	file?: string;
	pinnedApi: PublicApiContract;
	/**
	 * Schema `*Props` interface the class implements, so prop-type drift fails the build.
	 * Omitted for legacy components that are pinned ahead of their skeleton migration.
	 */
	schemaInterface?: string;
};

/** Pins the public `@Prop`/`@Method` surface of one web component class. */
export const describePublicApiContract = ({ tag, component, file = 'component.tsx', pinnedApi, schemaInterface }: PublicApiContractOptions): void => {
	describe(`${tag} public API contract (ARC42 § Public API Contract)`, () => {
		it('exposes exactly the pinned props and methods with pinned types, defaults and JSDoc', () => {
			// Failing this test means the public contract changed — a breaking change (ARC42 §
			// "Public API Contract (Migration Parity)"): get owner approval, then update the pinned
			// contract consciously and note it in the PR description.
			expect(toContract(extractFrom(component, file))).toEqual(pinnedApi);
		});

		it('documents every public member (custom-elements.json and docs-vscode are generated from prop.docs)', () => {
			expect(findUndocumentedMembers(component, file)).toEqual([]);
		});

		if (schemaInterface !== undefined) {
			it('implements the schema interface so prop-type drift fails the build', () => {
				expect(readSource(component, file)).toMatch(new RegExp(`implements\\s+[^{]*\\b${schemaInterface}\\b`));
			});
		}
	});
};
