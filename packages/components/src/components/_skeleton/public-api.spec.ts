import fs from 'node:fs';
import path from 'node:path';

/**
 * Public API contract test — enforces ARC42 § "Public API Contract (Migration Parity)".
 *
 * The public API of a web component is its set of `@Prop`/`@Method` members including their
 * JSDoc, types, defaults and `@deprecated` markers. `stencil build --docs` generates
 * `custom-elements.json`, `docs-vscode` and the adapter IntelliSense from `prop.docs` /
 * `method.docs`, so a member without JSDoc silently loses its documentation.
 *
 * Every skeleton-migrated component pins its public API below. A failing test here means the
 * public contract changed — that is a breaking change, not a refactor. It requires owner
 * approval, a conscious update of the pinned contract and a note in the PR description.
 * The FC's props are internal by definition and must NOT appear in the pinned contracts.
 */

type ApiMember = {
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
const toContract = (members: ApiMember[]): Record<string, Omit<ApiMember, 'name'>> =>
	Object.fromEntries(members.map(({ name, ...contract }) => [name, contract]));

const readSource = (file: string): string => fs.readFileSync(path.join(__dirname, '..', 'link', file), 'utf8');
const extractFrom = (file: string): ApiMember[] => extractPublicApi(readSource(file));

/**
 * Pinned public API of `kol-link` — identical to the predecessor on the develop branch
 * (18 props + focus) except `_role`, which was removed by owner decision ("keine public
 * role nur an der FC"; fulfils the deprecation announced on develop). The role exists only
 * as an internal `LinkFC` render prop and as `_role` on the transitional `kol-link-wc`.
 */
const KOL_LINK_PUBLIC_API: Record<string, Omit<ApiMember, 'name'>> = {
	_accessKey: {
		kind: 'prop',
		type: 'AccessKeyPropType',
		required: false,
		doc: "Defines the key combination that can be used to trigger or focus the component's interactive element.",
	},
	_ariaControls: {
		kind: 'prop',
		type: 'string',
		required: false,
		doc: 'Defines which elements are controlled by this component. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls)',
	},
	_ariaCurrentValue: {
		kind: 'prop',
		type: 'AriaCurrentValuePropType',
		required: false,
		doc: 'Defines the value for the aria-current attribute.',
	},
	_ariaDescription: {
		kind: 'prop',
		type: 'AriaDescriptionPropType',
		required: false,
		doc: 'Defines the value for the aria-description attribute.',
	},
	_ariaExpanded: {
		kind: 'prop',
		type: 'boolean',
		required: false,
		doc: 'Defines whether the interactive element of the component expanded something. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded) @TODO: Change type back to `AriaExpandedPropType` after Stencil#4663 has been resolved.',
	},
	_disabled: {
		kind: 'prop',
		type: 'boolean',
		required: false,
		default: 'false',
		doc: 'Makes the element not focusable and ignore all events.',
	},
	_download: {
		kind: 'prop',
		type: 'DownloadPropType',
		required: false,
		doc: 'Tells the browser that the link contains a file. Optionally sets the filename.',
	},
	_hideLabel: {
		kind: 'prop',
		type: 'boolean',
		required: false,
		default: 'false',
		doc: 'Hides the caption by default and displays the caption text with a tooltip when the interactive element is focused or the mouse is over it. @TODO: Change type back to `HideLabelPropType` after Stencil#4663 has been resolved.',
	},
	_href: {
		kind: 'prop',
		type: 'HrefPropType',
		required: true,
		doc: 'Sets the target URI of the link or citation source.',
	},
	_icons: {
		kind: 'prop',
		type: 'Stringified<KoliBriIconsProp>',
		required: false,
		doc: 'Defines the icon classnames.',
	},
	_inline: {
		kind: 'prop',
		type: 'InlinePropType',
		required: false,
		default: 'true',
		doc: 'Defines whether the component is displayed as a standalone block or inline without enforcing a minimum size of 44px.',
	},
	_label: {
		kind: 'prop',
		type: 'LabelWithExpertSlotPropType',
		required: false,
		doc: 'Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.',
	},
	_on: {
		kind: 'prop',
		type: 'LinkOnCallbacksPropType',
		required: false,
		doc: 'Defines the callback functions for links.',
	},
	_shortKey: {
		kind: 'prop',
		type: 'ShortKeyPropType',
		required: false,
		doc: 'Adds a visual shortcut hint after the label and instructs the screen reader to read the shortcut aloud.',
	},
	_target: {
		kind: 'prop',
		type: 'LinkTargetPropType',
		required: false,
		doc: 'Defines where to open the link.',
	},
	_tooltipAlign: {
		kind: 'prop',
		type: 'TooltipAlignPropType',
		required: false,
		default: "'right'",
		doc: 'Defines where to show the Tooltip preferably: top, right, bottom or left.',
	},
	_variant: {
		kind: 'prop',
		type: 'VariantClassNamePropType',
		required: false,
		doc: 'Defines which variant should be used for presentation.',
	},
	focus: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Sets focus on the internal element.',
	},
};

describe('kol-link public API contract (ARC42 § Public API Contract)', () => {
	it('exposes exactly the pinned props and methods with pinned types, defaults and JSDoc', () => {
		const extracted = extractFrom('component.tsx');
		// Failing this test means the public contract changed — a breaking change (ARC42 §
		// "Public API Contract (Migration Parity)"): get owner approval, then update the pinned
		// contract consciously and note it in the PR description.
		expect(toContract(extracted)).toEqual(KOL_LINK_PUBLIC_API);
	});

	it('implements the schema interface so prop-type drift fails the build', () => {
		expect(readSource('component.tsx')).toMatch(/implements\s+[^{]*\bLinkProps\b/);
	});
});

describe('documentation requirement (custom-elements.json and docs-vscode are generated from prop.docs)', () => {
	const files = ['component.tsx', 'wc.tsx'];

	it.each(files)('documents every public member of %s', (file) => {
		const undocumented = extractFrom(file)
			.filter((member) => member.doc.length === 0)
			.map((member) => member.name);
		expect(undocumented).toEqual([]);
	});
});

describe('kol-link-wc transitional wrapper (internal contract for legacy consumers)', () => {
	it('keeps the full predecessor surface: 21 props plus focus() and click()', () => {
		const extracted = extractFrom('wc.tsx');
		expect(extracted.filter((member) => member.kind === 'prop')).toHaveLength(21);
		expect(extracted.filter((member) => member.kind === 'method').map((member) => member.name)).toEqual(['focus', 'click']);
	});
});
