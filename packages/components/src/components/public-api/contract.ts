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
 * pinned contract and a note in the PR description. The members the `*Api` type declares
 * (callbacks, methods, refs, emitters, listeners) are part of the contract as well and are pinned
 * by `api-members.spec.ts`; the FC's render props that the `*Api` type does not declare are
 * internal by definition and must NOT appear in the pinned contracts.
 */

type ApiMember = {
	/** Prop name including the underscore prefix, or method name. */
	name: string;
	kind: 'prop' | 'method';
	/** Declared type annotation as written in the source; '' for methods and for props without one. */
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
const extractPublicApi = (source: string): ApiMember[] => {
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
			// The type annotation is optional: `public _pageSize = 1;` declares its type by the default.
			const match = declaration.match(/public\s+(_\w+)([!?])?\s*(?::\s*([^;=]+?))?\s*(?:=\s*([^;]+?))?\s*;\s*$/);
			if (match) {
				members.push({
					name: match[1],
					kind,
					type: (match[3] ?? '').trim(),
					required: match[2] === '!',
					default: match[4] === undefined || match[4].trim() === 'undefined' ? undefined : match[4].trim(),
					doc: normalizeDoc(doc),
				});
			}
		} else {
			let next = i + 1;
			while (next < lines.length && !/public\s+(?:async\s+)?(\w+)\s*\(/.test(lines[next])) {
				next++;
			}
			const match = (lines[next] ?? '').match(/public\s+(?:async\s+)?(\w+)\s*\(/);
			if (match) {
				members.push({ name: match[1], kind, type: '', required: false, doc: normalizeDoc(doc) });
			}
		}
	}
	return members;
};

/** Turns the member list into a comparable record (object equality ignores declaration order). */
const toContract = (members: ApiMember[]): PublicApiContract => Object.fromEntries(members.map(({ name, ...contract }) => [name, contract]));

/** The `ApiFromConfig` extra groups of a `*Api` type — the part of the API the props config cannot express. */
export type ApiGroup = 'Callbacks' | 'Emitters' | 'Listeners' | 'Methods' | 'Refs';

export type ApiTypeContract = Partial<Record<ApiGroup, Record<string, { type: string; doc: string }>>>;

/**
 * Extracts the members of the `*Api` type extras (callbacks, methods, refs, emitters, listeners)
 * with their preceding JSDoc from an `api.tsx` source. Every member is part of the API contract
 * (ARC42 § "Public API Contract"), so renaming, removing or retyping it is an API change.
 */
export const extractApiTypeMembers = (source: string): ApiTypeContract => {
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

	const contract: ApiTypeContract = {};
	let group: ApiGroup | undefined;
	let doc: string[] = [];
	for (const line of lines) {
		const groupMatch = line.match(/^\t{2}(\w+): \{$/);
		if (groupMatch && groupMatch[1] in ({ Callbacks: 1, Emitters: 1, Listeners: 1, Methods: 1, Refs: 1 } as const)) {
			group = groupMatch[1] as ApiGroup;
			contract[group] = {};
			doc = [];
			continue;
		}
		if (group && /^\t{2}\};$/.test(line)) {
			group = undefined;
			continue;
		}
		if (!group) {
			continue;
		}
		if (isDocLine(line)) {
			doc.push(line);
			continue;
		}
		const memberMatch = line.match(/^\t{3}(\w+): ([^;]+);$/);
		if (memberMatch) {
			contract[group]![memberMatch[1]] = { type: memberMatch[2].trim(), doc: normalizeDoc(doc) };
			doc = [];
		}
	}
	return contract;
};

/** Reads a source file of a component folder under `src/components`. */
const readSource = (component: string, file: string): string => fs.readFileSync(path.join(__dirname, '..', component, file), 'utf8');

const extractFrom = (component: string, file: string): ApiMember[] => extractPublicApi(readSource(component, file));

/** Lists the public members of a component source that carry no JSDoc. */
const findUndocumentedMembers = (component: string, file: string): string[] =>
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
};

/** Pins the public `@Prop`/`@Method` surface of one web component class. */
export const describePublicApiContract = ({ tag, component, file = 'component.tsx', pinnedApi }: PublicApiContractOptions): void => {
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
	});
};
