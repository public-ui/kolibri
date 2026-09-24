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

const readSource = (component: string, file: string): string => fs.readFileSync(path.join(__dirname, '..', component, file), 'utf8');
const extractFrom = (component: string, file: string): ApiMember[] => extractPublicApi(readSource(component, file));

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

/**
 * Pinned public API of `kol-button` — byte-identical to the predecessor on the develop branch
 * (20 props plus `getValue()`, `focus()` and `click()`). The skeleton migration moved the
 * `buttonVariantDefault` feature-flag fallback for `_variant` out of the inner `kol-button-wc`
 * and into the `kol-button` watcher, so the rendered default is unchanged while the declared
 * `@Prop` keeps its predecessor shape (no default literal).
 */
const KOL_BUTTON_PUBLIC_API: Record<string, Omit<ApiMember, 'name'>> = {
	getValue: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Returns the current value.',
	},
	focus: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Sets focus on the internal element.',
	},
	click: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Clicks the primary interactive element inside this component.',
	},
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
		doc: 'Defines whether the interactive element of the component expanded something. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)',
	},
	_ariaSelected: {
		kind: 'prop',
		type: 'boolean',
		required: false,
		doc: 'Defines whether the interactive element of the component is selected (e.g. role=tab). (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected)',
	},
	_customClass: {
		kind: 'prop',
		type: 'CustomClassPropType',
		required: false,
		doc: 'Defines the custom class attribute if _variant="custom" is set.',
	},
	_disabled: {
		kind: 'prop',
		type: 'boolean',
		required: false,
		default: 'false',
		doc: 'Makes the element not focusable and ignore all events.',
	},
	_hideLabel: {
		kind: 'prop',
		type: 'boolean',
		required: false,
		default: 'false',
		doc: 'Hides the caption by default and displays the caption text with a tooltip when the interactive element is focused or the mouse is over it. @TODO: Change type back to `HideLabelPropType` after Stencil#4663 has been resolved.',
	},
	_icons: {
		kind: 'prop',
		type: 'IconsPropType',
		required: false,
		doc: 'Defines the icon classnames.',
	},
	_inline: {
		kind: 'prop',
		type: 'InlinePropType',
		required: false,
		default: 'false',
		doc: 'Defines whether the component is displayed as a standalone block or inline without enforcing a minimum size of 44px.',
	},
	_label: {
		kind: 'prop',
		type: 'LabelWithExpertSlotPropType',
		required: true,
		doc: 'Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.',
	},
	_name: {
		kind: 'prop',
		type: 'string',
		required: false,
		doc: 'Defines the technical name of an input field.',
	},
	_on: {
		kind: 'prop',
		type: 'ButtonCallbacksPropType<StencilUnknown>',
		required: false,
		doc: 'Defines the callback functions for button events.',
	},
	_role: {
		kind: 'prop',
		type: 'AlternativeButtonLinkRolePropType',
		required: false,
		doc: 'Defines the role of the components primary element. @deprecated We prefer the semantic role of the HTML element and do not allow for customization. We will remove this prop in the future.',
	},
	_shortKey: {
		kind: 'prop',
		type: 'ShortKeyPropType',
		required: false,
		doc: 'Adds a visual shortcut hint after the label and instructs the screen reader to read the shortcut aloud.',
	},
	_syncValueBySelector: {
		kind: 'prop',
		type: 'SyncValueBySelectorPropType',
		required: false,
		doc: 'Selector for synchronizing the value with another input element. @internal',
	},
	_tooltipAlign: {
		kind: 'prop',
		type: 'TooltipAlignPropType',
		required: false,
		default: "'top'",
		doc: 'Defines where to show the Tooltip preferably: top, right, bottom or left.',
	},
	_type: {
		kind: 'prop',
		type: 'ButtonTypePropType',
		required: false,
		default: "'button'",
		doc: 'Defines either the type of the component or of the components interactive element.',
	},
	_value: {
		kind: 'prop',
		type: 'StencilUnknown',
		required: false,
		doc: 'Defines the value of the element.',
	},
	_variant: {
		kind: 'prop',
		type: 'VariantClassNamePropType',
		required: false,
		doc: 'Defines which variant should be used for presentation.',
	},
};

/**
 * Pinned public API of `kol-button-link` — byte-identical to the predecessor `shadow.tsx` on the
 * develop branch (19 props + getValue/focus/click), except `_on`'s JSDoc, translated from German
 * to English to match every other prop's documentation (doc-only, no behavior change). `_role`
 * stays declared but, as before, is not forwarded to the inner element.
 */
const KOL_BUTTON_LINK_PUBLIC_API: Record<string, Omit<ApiMember, 'name'>> = {
	getValue: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Returns the current value.',
	},
	focus: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Sets focus on the internal element.',
	},
	click: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Clicks the primary interactive element inside this component.',
	},
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
	_ariaSelected: {
		kind: 'prop',
		type: 'boolean',
		required: false,
		doc: 'Defines whether the interactive element of the component is selected (e.g. role=tab). (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected) @TODO: Change type back to `AriaSelectedPropType` after Stencil#4663 has been resolved.',
	},
	_disabled: {
		kind: 'prop',
		type: 'boolean',
		required: false,
		default: 'false',
		doc: 'Makes the element not focusable and ignore all events. @TODO: Change type back to `DisabledPropType` after Stencil#4663 has been resolved.',
	},
	_hideLabel: {
		kind: 'prop',
		type: 'boolean',
		required: false,
		default: 'false',
		doc: 'Hides the caption by default and displays the caption text with a tooltip when the interactive element is focused or the mouse is over it. @TODO: Change type back to `HideLabelPropType` after Stencil#4663 has been resolved.',
	},
	_icons: {
		kind: 'prop',
		type: 'IconsPropType',
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
		required: true,
		doc: 'Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.',
	},
	_name: {
		kind: 'prop',
		type: 'NamePropType',
		required: false,
		doc: 'Defines the technical name of an input field.',
	},
	_on: {
		kind: 'prop',
		type: 'ButtonCallbacksPropType<StencilUnknown>',
		required: false,
		doc: 'Defines the callback functions for button events.',
	},
	_role: {
		kind: 'prop',
		type: 'AlternativeButtonLinkRolePropType',
		required: false,
		doc: 'Defines the role of the components primary element. @deprecated We prefer the semantic role of the HTML element and do not allow for customization. We will remove this prop in the future.',
	},
	_shortKey: {
		kind: 'prop',
		type: 'ShortKeyPropType',
		required: false,
		doc: 'Adds a visual shortcut hint after the label and instructs the screen reader to read the shortcut aloud.',
	},
	_syncValueBySelector: {
		kind: 'prop',
		type: 'SyncValueBySelectorPropType',
		required: false,
		doc: 'Selector for synchronizing the value with another input element. @internal',
	},
	_tooltipAlign: {
		kind: 'prop',
		type: 'TooltipAlignPropType',
		required: false,
		default: "'top'",
		doc: 'Defines where to show the Tooltip preferably: top, right, bottom or left.',
	},
	_type: {
		kind: 'prop',
		type: 'ButtonTypePropType',
		required: false,
		default: "'button'",
		doc: 'Defines either the type of the component or of the components interactive element.',
	},
	_value: {
		kind: 'prop',
		type: 'StencilUnknown',
		required: false,
		doc: 'Defines the value of the element.',
	},
	_variant: {
		kind: 'prop',
		type: 'VariantClassNamePropType',
		required: false,
		doc: 'Defines which variant should be used for presentation.',
	},
};

/**
 * Pinned public API of `kol-link-button` — byte-identical to the predecessor `shadow.tsx` on the
 * develop branch (18 props + focus/click). `_role` stays declared but, as before, is not forwarded
 * to the inner element.
 */
const KOL_LINK_BUTTON_PUBLIC_API: Record<string, Omit<ApiMember, 'name'>> = {
	focus: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Sets focus on the internal element.',
	},
	click: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Clicks the primary interactive element inside this component.',
	},
	_accessKey: {
		kind: 'prop',
		type: 'AccessKeyPropType',
		required: false,
		doc: "Defines the key combination that can be used to trigger or focus the component's interactive element.",
	},
	_ariaCurrentValue: {
		kind: 'prop',
		type: 'AriaCurrentValuePropType',
		required: false,
		doc: 'Defines the value for the aria-current attribute.',
	},
	_ariaControls: {
		kind: 'prop',
		type: 'string',
		required: false,
		doc: 'Defines which elements are controlled by this component. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls)',
	},
	_ariaDescription: {
		kind: 'prop',
		type: 'AriaDescriptionPropType',
		required: false,
		doc: 'Defines the value for the aria-description attribute.',
	},
	_customClass: {
		kind: 'prop',
		type: 'CustomClassPropType',
		required: false,
		doc: 'Defines the custom class attribute if _variant="custom" is set.',
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
		doc: 'Defines the target URI of the link.',
	},
	_icons: {
		kind: 'prop',
		type: 'IconsPropType',
		required: false,
		doc: 'Defines the icon classnames.',
	},
	_inline: {
		kind: 'prop',
		type: 'InlinePropType',
		required: false,
		default: 'false',
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
	_role: {
		kind: 'prop',
		type: 'AlternativeButtonLinkRolePropType',
		required: false,
		doc: 'Defines the role of the components primary element. @deprecated We prefer the semantic role of the HTML element and do not allow for customization. We will remove this prop in the future.',
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
		default: "getFeatureFlag('buttonVariantDefault', this.host) ?? 'normal'",
		doc: 'Defines which variant should be used for presentation.',
	},
};

/**
 * Pinned public API of `kol-split-button` — byte-identical to the predecessor `shadow.tsx` on the
 * develop branch (19 props + getValue/focus/click/closePopup). `_role` stays declared but, as
 * before, is not forwarded to the inner element.
 */
const KOL_SPLIT_BUTTON_PUBLIC_API: Record<string, Omit<ApiMember, 'name'>> = {
	getValue: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Returns the current value.',
	},
	focus: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Sets focus on the internal element.',
	},
	click: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Clicks the primary interactive element inside this component.',
	},
	closePopup: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Closes the dropdown.',
	},
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
		doc: 'Defines whether the interactive element of the component expanded something. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)',
	},
	_ariaSelected: {
		kind: 'prop',
		type: 'boolean',
		required: false,
		doc: 'Defines whether the interactive element of the component is selected (e.g. role=tab). (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected)',
	},
	_customClass: {
		kind: 'prop',
		type: 'CustomClassPropType',
		required: false,
		doc: 'Defines the custom class attribute if _variant="custom" is set.',
	},
	_disabled: {
		kind: 'prop',
		type: 'boolean',
		required: false,
		default: 'false',
		doc: 'Makes the element not focusable and ignore all events.',
	},
	_hideLabel: {
		kind: 'prop',
		type: 'boolean',
		required: false,
		default: 'false',
		doc: 'Hides the caption by default and displays the caption text with a tooltip when the interactive element is focused or the mouse is over it. @TODO: Change type back to `HideLabelPropType` after Stencil#4663 has been resolved.',
	},
	_icons: {
		kind: 'prop',
		type: 'IconsPropType',
		required: false,
		doc: 'Defines the icon classnames.',
	},
	_label: {
		kind: 'prop',
		type: 'LabelWithExpertSlotPropType',
		required: true,
		doc: 'Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).',
	},
	_name: {
		kind: 'prop',
		type: 'string',
		required: false,
		doc: 'Defines the technical name of an input field.',
	},
	_on: {
		kind: 'prop',
		type: 'ButtonCallbacksPropType<StencilUnknown>',
		required: false,
		doc: 'Defines the callback functions for button events.',
	},
	_role: {
		kind: 'prop',
		type: 'AlternativeButtonLinkRolePropType',
		required: false,
		doc: 'Defines the role of the components primary element. @deprecated We prefer the semantic role of the HTML element and do not allow for customization. We will remove this prop in the future.',
	},
	_shortKey: {
		kind: 'prop',
		type: 'ShortKeyPropType',
		required: false,
		doc: 'Adds a visual shortcut hint after the label and instructs the screen reader to read the shortcut aloud.',
	},
	_syncValueBySelector: {
		kind: 'prop',
		type: 'SyncValueBySelectorPropType',
		required: false,
		doc: 'Selector for synchronizing the value with another input element. @internal',
	},
	_tooltipAlign: {
		kind: 'prop',
		type: 'TooltipAlignPropType',
		required: false,
		default: "'top'",
		doc: 'Defines where to show the Tooltip preferably: top, right, bottom or left.',
	},
	_type: {
		kind: 'prop',
		type: 'ButtonTypePropType',
		required: false,
		default: "'button'",
		doc: 'Defines either the type of the component or of the components interactive element.',
	},
	_value: {
		kind: 'prop',
		type: 'StencilUnknown',
		required: false,
		doc: 'Defines the value of the element.',
	},
	_variant: {
		kind: 'prop',
		type: 'VariantClassNamePropType',
		required: false,
		default: "'normal'",
		doc: 'Defines which variant should be used for presentation.',
	},
};

/**
 * Pinned public API of `kol-badge`: 4 props plus `focus()`. Changing any of them is a breaking
 * change and has to be decided, not slipped in — see the contract test below.
 */
const KOL_BADGE_PUBLIC_API: Record<string, Omit<ApiMember, 'name'>> = {
	focus: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Sets focus on the internal element.',
	},
	_color: {
		kind: 'prop',
		type: 'Stringified<PropColor>',
		required: false,
		default: "'#000'",
		doc: 'Defines the backgroundColor and foregroundColor.',
	},
	_icons: {
		kind: 'prop',
		type: 'Stringified<KoliBriIconsProp>',
		required: false,
		doc: 'Defines the icon classnames.',
	},
	_label: {
		kind: 'prop',
		type: 'LabelPropType',
		required: true,
		doc: 'Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).',
	},
	_smartButton: {
		kind: 'prop',
		type: 'Stringified<InternalButtonProps>',
		required: false,
		doc: 'Allows to add a button with an arbitrary action within the element (_hide-label only).',
	},
};

/**
 * Pinned public API of `kol-card`: 6 props plus `focus()` and `click()` — identical to the
 * predecessor `shadow.tsx` on the develop branch. `_headingId` stays internal to the transitional
 * `kol-card-wc`, where dialog and drawer set it.
 */
const KOL_CARD_PUBLIC_API: Record<string, Omit<ApiMember, 'name'>> = {
	focus: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Sets focus on the internal element.',
	},
	click: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Clicks the primary interactive element inside this component.',
	},
	_hasCloser: {
		kind: 'prop',
		type: 'boolean',
		required: false,
		default: 'false',
		doc: 'Defines whether the element can be closed. @TODO: Change type back to `HasCloserPropType` after Stencil#4663 has been resolved.',
	},
	_href: {
		kind: 'prop',
		type: 'HrefPropType',
		required: false,
		doc: 'Sets the target URI of the link or citation source.',
	},
	_label: {
		kind: 'prop',
		type: 'LabelPropType',
		required: true,
		doc: 'Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).',
	},
	_level: {
		kind: 'prop',
		type: 'HeadingLevel',
		required: false,
		default: '0',
		doc: 'Defines which H-level from 1-6 the heading has. 0 specifies no heading and is shown as bold text.',
	},
	_on: {
		kind: 'prop',
		type: 'KoliBriCardEventCallbacks',
		required: false,
		doc: 'Defines the event callback functions for the component.',
	},
	_target: {
		kind: 'prop',
		type: 'LinkTargetPropType',
		required: false,
		doc: 'Defines where to open the link.',
	},
};

/**
 * Pinned public API of `kol-dialog`: 5 props plus the five open/close methods — identical to the
 * predecessor `shadow.tsx` on the develop branch.
 */
const KOL_DIALOG_PUBLIC_API: Record<string, Omit<ApiMember, 'name'>> = {
	openModal: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Opens the dialog. @deprecated Use showModal() instead.',
	},
	showModal: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Opens the dialog as a modal.',
	},
	show: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Opens the dialog. Pass true to open as a modal dialog.',
	},
	close: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Closes the dialog.',
	},
	closeModal: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Closes the dialog. @deprecated Use close() instead.',
	},
	_label: {
		kind: 'prop',
		type: 'LabelPropType',
		required: true,
		doc: 'Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).',
	},
	_level: {
		kind: 'prop',
		type: 'HeadingLevel',
		required: false,
		default: '0',
		doc: 'Defines which H-level from 1-6 the heading has. 0 specifies no heading and is shown as bold text.',
	},
	_on: {
		kind: 'prop',
		type: 'KoliBriDialogEventCallbacks',
		required: false,
		doc: 'Defines the modal callback functions.',
	},
	_variant: {
		kind: 'prop',
		type: 'ModalVariantPropType',
		required: false,
		default: "'blank'",
		doc: 'Defines the variant of the modal.',
	},
	_width: {
		kind: 'prop',
		type: 'string',
		required: false,
		default: "'100%'",
		doc: 'Defines the width of the modal. (max-width: 100%)',
	},
};

/**
 * Pinned public API of the deprecated `kol-modal`: the same surface as `kol-dialog` minus
 * `_level`, which it never exposed, and with its own "modal dialog" wording.
 */
const KOL_MODAL_PUBLIC_API: Record<string, Omit<ApiMember, 'name'>> = {
	openModal: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Opens the modal dialog. @deprecated Use showModal() instead.',
	},
	showModal: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Opens the dialog as a modal.',
	},
	show: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Opens the dialog. Pass true to open as a modal dialog.',
	},
	close: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Closes the modal dialog.',
	},
	closeModal: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Closes the modal dialog. @deprecated Use close() instead.',
	},
	_label: {
		kind: 'prop',
		type: 'LabelPropType',
		required: true,
		doc: 'Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).',
	},
	_on: {
		kind: 'prop',
		type: 'KoliBriDialogEventCallbacks',
		required: false,
		doc: 'Defines the modal callback functions.',
	},
	_variant: {
		kind: 'prop',
		type: 'ModalVariantPropType',
		required: false,
		default: "'blank'",
		doc: 'Defines the variant of the modal.',
	},
	_width: {
		kind: 'prop',
		type: 'string',
		required: false,
		default: "'100%'",
		doc: 'Defines the width of the modal. (max-width: 100%)',
	},
};

describe('kol-link public API contract (ARC42 § Public API Contract)', () => {
	it('exposes exactly the pinned props and methods with pinned types, defaults and JSDoc', () => {
		const extracted = extractFrom('link', 'component.tsx');
		// Failing this test means the public contract changed — a breaking change (ARC42 §
		// "Public API Contract (Migration Parity)"): get owner approval, then update the pinned
		// contract consciously and note it in the PR description.
		expect(toContract(extracted)).toEqual(KOL_LINK_PUBLIC_API);
	});

	it('implements the schema interface so prop-type drift fails the build', () => {
		expect(readSource('link', 'component.tsx')).toMatch(/implements\s+[^{]*\bLinkProps\b/);
	});
});

describe('documentation requirement (custom-elements.json and docs-vscode are generated from prop.docs)', () => {
	const sources: [component: string, file: string][] = [
		['link', 'component.tsx'],
		['link', 'wc.tsx'],
		['button', 'component.tsx'],
		['button', 'wc.tsx'],
		['breadcrumb', 'component.tsx'],
		['form', 'component.tsx'],
		['skip-nav', 'component.tsx'],
		['button-link', 'component.tsx'],
		['link-button', 'component.tsx'],
		['split-button', 'component.tsx'],
		['tabs', 'component.tsx'],
		['badge', 'component.tsx'],
		['card', 'component.tsx'],
		['card', 'wc.tsx'],
		['alert', 'component.tsx'],
		['alert', 'wc.tsx'],
		['details', 'component.tsx'],
		['accordion', 'component.tsx'],
		['dialog', 'component.tsx'],
		['dialog', 'wc.tsx'],
		['modal', 'component.tsx'],
		['toolbar', 'component.tsx'],
	];

	it.each(sources)('documents every public member of %s/%s', (component, file) => {
		const undocumented = extractFrom(component, file)
			.filter((member) => member.doc.length === 0)
			.map((member) => member.name);
		expect(undocumented).toEqual([]);
	});
});

describe('kol-link-wc transitional wrapper (internal contract for legacy consumers)', () => {
	it('keeps the full predecessor surface: 21 props plus focus() and click()', () => {
		const extracted = extractFrom('link', 'wc.tsx');
		expect(extracted.filter((member) => member.kind === 'prop')).toHaveLength(21);
		expect(extracted.filter((member) => member.kind === 'method').map((member) => member.name)).toEqual(['focus', 'click']);
	});
});

describe('kol-button public API contract (ARC42 § Public API Contract)', () => {
	it('exposes exactly the pinned props and methods with pinned types, defaults and JSDoc', () => {
		const extracted = extractFrom('button', 'component.tsx');
		// Failing this test means the public contract changed — a breaking change (ARC42 §
		// "Public API Contract (Migration Parity)"): get owner approval, then update the pinned
		// contract consciously and note it in the PR description.
		expect(toContract(extracted)).toEqual(KOL_BUTTON_PUBLIC_API);
	});

	it('implements the schema interface so prop-type drift fails the build', () => {
		expect(readSource('button', 'component.tsx')).toMatch(/implements\s+[^{]*\bButtonProps\b/);
	});
});

describe('kol-button-wc transitional wrapper (internal contract for legacy consumers)', () => {
	it('keeps the full predecessor surface: 23 props plus focus() and click()', () => {
		const extracted = extractFrom('button', 'wc.tsx');
		expect(extracted.filter((member) => member.kind === 'prop')).toHaveLength(23);
		expect(extracted.filter((member) => member.kind === 'method').map((member) => member.name)).toEqual(['focus', 'click']);
	});
});

describe('kol-card-wc transitional wrapper (internal contract for legacy consumers)', () => {
	it('keeps the full predecessor surface: 7 props plus focus() and click()', () => {
		const extracted = extractFrom('card', 'wc.tsx');
		expect(extracted.filter((member) => member.kind === 'prop')).toHaveLength(7);
		expect(extracted.filter((member) => member.kind === 'method').map((member) => member.name)).toEqual(['focus', 'click']);
	});
});

describe('kol-dialog-wc transitional wrapper (internal contract for legacy consumers)', () => {
	it('keeps the full predecessor surface: 5 props plus the five open/close methods', () => {
		const extracted = extractFrom('dialog', 'wc.tsx');
		expect(extracted.filter((member) => member.kind === 'prop').map((member) => member.name)).toEqual(['_label', '_level', '_on', '_variant', '_width']);
		expect(extracted.filter((member) => member.kind === 'method').map((member) => member.name)).toEqual([
			'show',
			'showModal',
			'openModal',
			'close',
			'closeModal',
		]);
	});
});

/**
 * Pinned public API of `kol-form` — same props, types and defaults as the predecessor
 * `shadow.tsx` on the develop branch (3 props + focusErrorList). The one deviation is the `_on`
 * JSDoc, which the predecessor carried in German; it was translated on reviewer request, which
 * changes only the generated documentation, not the API surface.
 */
const KOL_FORM_PUBLIC_API: Record<string, Omit<ApiMember, 'name'>> = {
	focusErrorList: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Scrolls to the error list and focuses the first link.',
	},
	_errorList: {
		kind: 'prop',
		type: 'ErrorListPropType[]',
		required: false,
		doc: 'A list of error objects that each describe an issue encountered in the form. Each error object contains a message and a selector for identifying the form element related to the error.',
	},
	_on: {
		kind: 'prop',
		type: 'KoliBriFormCallbacks',
		required: false,
		doc: 'Defines the callback functions for form events.',
	},
	_requiredText: {
		kind: 'prop',
		type: 'Stringified<boolean>',
		required: false,
		default: 'true',
		doc: 'Defines whether the mandatory-fields-hint should be shown. A string overrides the default text.',
	},
};

/**
 * Pinned public API of `kol-toolbar`: 3 props plus `focus()` and `click()` — identical to the
 * predecessor `shadow.tsx` on the develop branch.
 */
const KOL_TOOLBAR_PUBLIC_API: Record<string, Omit<ApiMember, 'name'>> = {
	focus: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Sets focus on the currently active toolbar item.',
	},
	click: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Triggers a click on the currently active toolbar item.',
	},
	_label: {
		kind: 'prop',
		type: 'string',
		required: true,
		doc: 'Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).',
	},
	_items: {
		kind: 'prop',
		type: 'ToolbarItemsPropType',
		required: true,
		doc: 'Defines the functional elements of toolbar to render (e.g. kol-link, kol-button).',
	},
	_orientation: {
		kind: 'prop',
		type: 'OrientationPropType',
		required: false,
		doc: 'Defines whether the orientation of the component is horizontal or vertical.',
	},
};

/**
 * Pinned public API of `kol-drawer`: 6 props plus the four open/close methods — identical to the
 * predecessor `shadow.tsx` on the develop branch.
 */
const KOL_DRAWER_PUBLIC_API: Record<string, Omit<ApiMember, 'name'>> = {
	show: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Opens the drawer. Pass true to open as a modal drawer.',
	},
	showModal: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Opens the drawer as a modal.',
	},
	open: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Opens the drawer. @deprecated Use show() or showModal() instead.',
	},
	close: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Closes the drawer.',
	},
	_align: {
		kind: 'prop',
		type: 'AlignPropType',
		required: false,
		doc: 'Defines the visual orientation of the component.',
	},
	_hasCloser: {
		kind: 'prop',
		type: 'boolean',
		required: false,
		default: 'false',
		doc: 'Defines whether the element can be closed. @TODO: Change type back to `HasCloserPropType` after Stencil#4663 has been resolved.',
	},
	_label: {
		kind: 'prop',
		type: 'LabelPropType',
		required: true,
		doc: 'Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).',
	},
	_level: {
		kind: 'prop',
		type: 'HeadingLevel',
		required: false,
		default: '0',
		doc: 'Defines which H-level from 1-6 the heading has. 0 specifies no heading and is shown as bold text.',
	},
	_on: {
		kind: 'prop',
		type: 'KoliBriModalEventCallbacks',
		required: false,
		doc: 'Specifies the EventCallback function to be called when the drawer is closing.',
	},
	_open: {
		kind: 'prop',
		type: 'OpenPropType',
		required: false,
		doc: 'Opens/expands the element when truthy, closes/collapses when falsy.',
	},
};

/**
 * Pinned public API of `kol-tabs` — same props, types and defaults as the predecessor `shadow.tsx`
 * on the develop branch (7 props + focus and click). The one deviation is the `_on` JSDoc, which
 * the predecessor carried in German; it was translated on reviewer request, which changes only the
 * generated documentation, not the API surface.
 */
const KOL_TABS_PUBLIC_API: Record<string, Omit<ApiMember, 'name'>> = {
	focus: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Sets focus on the current tab button.',
	},
	click: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Triggers a click on the currently selected tab.',
	},
	_align: {
		kind: 'prop',
		type: 'AlignPropType',
		required: false,
		default: "'top'",
		doc: 'Defines the visual orientation of the component.',
	},
	_behavior: {
		kind: 'prop',
		type: 'TabBehaviorPropType',
		required: false,
		doc: 'Defines which behavior is active.',
	},
	_hasCreateButton: {
		kind: 'prop',
		type: 'HasCreateButtonPropType',
		required: false,
		default: 'false',
		doc: 'Defines whether the element has a create button.',
	},
	_label: {
		kind: 'prop',
		type: 'LabelPropType',
		required: true,
		doc: 'Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).',
	},
	_on: {
		kind: 'prop',
		type: 'KoliBriTabsCallbacks',
		required: false,
		doc: 'Defines the callback functions for tabs events.',
	},
	_selected: {
		kind: 'prop',
		type: 'number',
		required: false,
		default: '0',
		doc: 'Defines which tab is active.',
	},
	_tabs: {
		kind: 'prop',
		type: 'Stringified<TabButtonProps[]>',
		required: true,
		doc: 'Defines the tab captions.',
	},
};

describe.each([
	['kol-button-link', 'button-link', 'ButtonLinkProps', KOL_BUTTON_LINK_PUBLIC_API],
	['kol-link-button', 'link-button', 'LinkButtonProps', KOL_LINK_BUTTON_PUBLIC_API],
	['kol-form', 'form', 'FormProps', KOL_FORM_PUBLIC_API],
	['kol-split-button', 'split-button', 'SplitButtonProps', KOL_SPLIT_BUTTON_PUBLIC_API],
	['kol-tabs', 'tabs', 'TabsProps', KOL_TABS_PUBLIC_API],
	['kol-badge', 'badge', 'BadgeProps', KOL_BADGE_PUBLIC_API],
	['kol-card', 'card', 'CardProps', KOL_CARD_PUBLIC_API],
	['kol-dialog', 'dialog', 'DialogProps', KOL_DIALOG_PUBLIC_API],
	['kol-modal', 'modal', 'DialogProps', KOL_MODAL_PUBLIC_API],
	['kol-drawer', 'drawer', 'DrawerProps', KOL_DRAWER_PUBLIC_API],
	['kol-toolbar', 'toolbar', 'ToolbarProps', KOL_TOOLBAR_PUBLIC_API],
] as const)('%s public API contract (ARC42 § Public API Contract)', (_tag, component, schemaInterface, pinnedApi) => {
	it('exposes exactly the pinned props and methods with pinned types, defaults and JSDoc', () => {
		// Failing this test means the public contract changed — a breaking change (ARC42 §
		// "Public API Contract (Migration Parity)"): get owner approval, then update the pinned
		// contract consciously and note it in the PR description.
		expect(toContract(extractFrom(component, 'component.tsx'))).toEqual(pinnedApi);
	});

	it('implements the schema interface so prop-type drift fails the build', () => {
		expect(readSource(component, 'component.tsx')).toMatch(new RegExp(`implements\\s+[^{]*\\b${schemaInterface}\\b`));
	});
});

/**
 * Pinned public API of `kol-breadcrumb` — byte-identical to the predecessor on the develop branch
 * (2 required props, no methods).
 */
const KOL_BREADCRUMB_PUBLIC_API: Record<string, Omit<ApiMember, 'name'>> = {
	_label: {
		kind: 'prop',
		type: 'LabelPropType',
		required: true,
		doc: 'Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).',
	},
	_links: {
		kind: 'prop',
		type: 'Stringified<BreadcrumbLinkProps[]>',
		required: true,
		doc: 'Defines the list of links combined with their labels to render.',
	},
};

describe('kol-breadcrumb public API contract (ARC42 § Public API Contract)', () => {
	it('exposes exactly the pinned props and methods with pinned types, defaults and JSDoc', () => {
		const extracted = extractFrom('breadcrumb', 'component.tsx');
		// Failing this test means the public contract changed — a breaking change (ARC42 §
		// "Public API Contract (Migration Parity)"): get owner approval, then update the pinned
		// contract consciously and note it in the PR description.
		expect(toContract(extracted)).toEqual(KOL_BREADCRUMB_PUBLIC_API);
	});

	it('implements the schema interface so prop-type drift fails the build', () => {
		expect(readSource('breadcrumb', 'component.tsx')).toMatch(/implements\s+[^{]*\bBreadcrumbProps\b/);
	});
});

/**
 * Pinned public API of `kol-details` — 5 props plus `focus()` and `click()`. `_open` keeps its
 * `mutable`/`reflect` decorators so the reflected attribute is already updated when the delayed
 * `onClick`/`onToggle` callbacks read it.
 *
 * Consciously changed against the predecessor when `kol-accordion` and `kol-details` were
 * consolidated onto one collapsible layer (owner-approved, noted in the PR):
 * - `_on` is typed `CollapsibleCallbacksPropType<boolean>`, the shared contract of both
 *   collapsibles. Against `DetailsCallbacksPropType` it adds the optional `onClick` member —
 *   additive, so objects that only set `onToggle` stay assignable. The old name survives as a
 *   `@deprecated` alias in `schema/props/details-callbacks.ts`.
 * - `_on` and `click()` carry the wording shared with `kol-accordion`.
 */
const KOL_DETAILS_PUBLIC_API: Record<string, Omit<ApiMember, 'name'>> = {
	focus: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Sets focus on the internal element.',
	},
	click: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Triggers a click on the heading toggle button.',
	},
	_disabled: {
		kind: 'prop',
		type: 'boolean',
		required: false,
		default: 'false',
		doc: 'Makes the element not focusable and ignore all events.',
	},
	_label: {
		kind: 'prop',
		type: 'LabelPropType',
		required: true,
		doc: 'Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).',
	},
	_level: {
		kind: 'prop',
		type: 'HeadingLevel',
		required: false,
		default: '0',
		doc: 'Defines which H-level from 1-6 the heading has. 0 specifies no heading and is shown as bold text.',
	},
	_on: {
		kind: 'prop',
		type: 'CollapsibleCallbacksPropType<boolean>',
		required: false,
		doc: 'Defines the callback functions for the collapsible.',
	},
	_open: {
		kind: 'prop',
		type: 'boolean',
		required: false,
		default: 'false',
		doc: 'Opens/expands the element when truthy, closes/collapses when falsy. @TODO: Change type back to `OpenPropType` after Stencil#4663 has been resolved.',
	},
};

describe('kol-details public API contract (ARC42 § Public API Contract)', () => {
	it('exposes exactly the pinned props and methods with pinned types, defaults and JSDoc', () => {
		const extracted = extractFrom('details', 'component.tsx');
		// Failing this test means the public contract changed — a breaking change (ARC42 §
		// "Public API Contract (Migration Parity)"): get owner approval, then update the pinned
		// contract consciously and note it in the PR description.
		expect(toContract(extracted)).toEqual(KOL_DETAILS_PUBLIC_API);
	});

	it('implements the schema interface so prop-type drift fails the build', () => {
		expect(readSource('details', 'component.tsx')).toMatch(/implements\s+[^{]*\bDetailsProps\b/);
	});
});

/**
 * Pinned public API of `kol-accordion` — 5 props plus `focus()` and `click()`. `_open` keeps its
 * `mutable`/`reflect` decorators so the reflected attribute is already updated when the delayed
 * `onClick`/`onToggle` callbacks read it.
 *
 * Consciously changed against the predecessor when `kol-accordion` and `kol-details` were
 * consolidated onto one collapsible layer (owner-approved, noted in the PR):
 * - `_on` is typed `CollapsibleCallbacksPropType<boolean>` — the same shape as the former
 *   `AccordionCallbacksPropType`, which survives as a `@deprecated` alias.
 * - `_label` is declared with the `LabelPropType` schema alias instead of the primitive `string`,
 *   matching `kol-details` and every other migrated component. Same type, no runtime effect.
 * - `click()` no longer mentions "the first section", a leftover of the pre-migration
 *   multi-section accordion.
 */
const KOL_ACCORDION_PUBLIC_API: Record<string, Omit<ApiMember, 'name'>> = {
	focus: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Sets focus on the internal element.',
	},
	click: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Triggers a click on the heading toggle button.',
	},
	_disabled: {
		kind: 'prop',
		type: 'boolean',
		required: false,
		default: 'false',
		doc: 'Makes the element not focusable and ignore all events.',
	},
	_label: {
		kind: 'prop',
		type: 'LabelPropType',
		required: true,
		doc: 'Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).',
	},
	_level: {
		kind: 'prop',
		type: 'HeadingLevel',
		required: false,
		default: '0',
		doc: 'Defines which H-level from 1-6 the heading has. 0 specifies no heading and is shown as bold text.',
	},
	_on: {
		kind: 'prop',
		type: 'CollapsibleCallbacksPropType<boolean>',
		required: false,
		doc: 'Defines the callback functions for the collapsible.',
	},
	_open: {
		kind: 'prop',
		type: 'boolean',
		required: false,
		default: 'false',
		doc: 'Opens/expands the element when truthy, closes/collapses when falsy. @TODO: Change type back to `OpenPropType` after Stencil#4663 has been resolved.',
	},
};

describe('kol-accordion public API contract (ARC42 § Public API Contract)', () => {
	it('exposes exactly the pinned props and methods with pinned types, defaults and JSDoc', () => {
		const extracted = extractFrom('accordion', 'component.tsx');
		// Failing this test means the public contract changed — a breaking change (ARC42 §
		// "Public API Contract (Migration Parity)"): get owner approval, then update the pinned
		// contract consciously and note it in the PR description.
		expect(toContract(extracted)).toEqual(KOL_ACCORDION_PUBLIC_API);
	});

	it('implements the schema interface so prop-type drift fails the build', () => {
		expect(readSource('accordion', 'component.tsx')).toMatch(/implements\s+[^{]*\bAccordionProps\b/);
	});
});

/**
 * Pinned public API of `kol-skip-nav` — byte-identical to the predecessor on the develop branch
 * (2 required props plus `focus()`).
 */
const KOL_SKIP_NAV_PUBLIC_API: Record<string, Omit<ApiMember, 'name'>> = {
	_label: {
		kind: 'prop',
		type: 'LabelPropType',
		required: true,
		doc: 'Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).',
	},
	_links: {
		kind: 'prop',
		type: 'Stringified<LinkProps[]>',
		required: true,
		doc: 'Defines the list of links combined with their labels to render.',
	},
	focus: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Sets focus on the internal element.',
	},
};

describe('kol-skip-nav public API contract (ARC42 § Public API Contract)', () => {
	it('exposes exactly the pinned props and methods with pinned types, defaults and JSDoc', () => {
		const extracted = extractFrom('skip-nav', 'component.tsx');
		// Failing this test means the public contract changed — a breaking change (ARC42 §
		// "Public API Contract (Migration Parity)"): get owner approval, then update the pinned
		// contract consciously and note it in the PR description.
		expect(toContract(extracted)).toEqual(KOL_SKIP_NAV_PUBLIC_API);
	});

	it('implements the schema interface so prop-type drift fails the build', () => {
		expect(readSource('skip-nav', 'component.tsx')).toMatch(/implements\s+[^{]*\bSkipNavProps\b/);
	});
});

/**
 * Pinned public API of `kol-alert` — byte-identical to the predecessor on the develop branch
 * (7 props, no methods).
 */
const KOL_ALERT_PUBLIC_API: Record<string, Omit<ApiMember, 'name'>> = {
	_alert: {
		kind: 'prop',
		type: 'boolean',
		required: false,
		default: 'false',
		doc: 'Defines whether the screen-readers should read out the notification.',
	},
	_hasCloser: {
		kind: 'prop',
		type: 'boolean',
		required: false,
		default: 'false',
		doc: 'Defines whether the element can be closed. @TODO: Change type back to `HasCloserPropType` after Stencil#4663 has been resolved.',
	},
	_label: {
		kind: 'prop',
		type: 'LabelPropType',
		required: false,
		doc: 'Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).',
	},
	_level: {
		kind: 'prop',
		type: 'HeadingLevel',
		required: false,
		default: '0',
		doc: 'Defines which H-level from 1-6 the heading has. 0 specifies no heading and is shown as bold text.',
	},
	_on: {
		kind: 'prop',
		type: 'KoliBriAlertEventCallbacks',
		required: false,
		doc: 'Defines the event callback functions for closing the alert.',
	},
	_type: {
		kind: 'prop',
		type: 'AlertTypePropType',
		required: false,
		default: "'default'",
		doc: 'Defines either the type of the component or of the components interactive element.',
	},
	_variant: {
		kind: 'prop',
		type: 'AlertVariantPropType',
		required: false,
		default: "'msg'",
		doc: 'Defines which variant should be used for presentation.',
	},
};

describe('kol-alert public API contract (ARC42 § Public API Contract)', () => {
	it('exposes exactly the pinned props and methods with pinned types, defaults and JSDoc', () => {
		const extracted = extractFrom('alert', 'component.tsx');
		// Failing this test means the public contract changed — a breaking change (ARC42 §
		// "Public API Contract (Migration Parity)"): get owner approval, then update the pinned
		// contract consciously and note it in the PR description.
		expect(toContract(extracted)).toEqual(KOL_ALERT_PUBLIC_API);
	});

	it('implements the schema interface so prop-type drift fails the build', () => {
		expect(readSource('alert', 'component.tsx')).toMatch(/implements\s+[^{]*\bAlertProps\b/);
	});
});

describe('kol-alert-wc transitional wrapper (internal contract for legacy consumers)', () => {
	it('keeps the full predecessor surface: 7 props and no methods', () => {
		const extracted = extractFrom('alert', 'wc.tsx');
		expect(extracted.filter((member) => member.kind === 'prop')).toHaveLength(7);
		expect(extracted.filter((member) => member.kind === 'method')).toEqual([]);
		expect(toContract(extracted)).toEqual(KOL_ALERT_PUBLIC_API);
	});
});

/**
 * Pinned public API of `kol-popover-button` — identical surface to the predecessor (17 props plus
 * showPopover(), hidePopover(), focus() and click()). The wrapper-forwarding wording of the two
 * popover method docs was adapted to the skeleton orchestrator; the surface itself is unchanged.
 */
const KOL_POPOVER_BUTTON_PUBLIC_API: Record<string, Omit<ApiMember, 'name'>> = {
	hidePopover: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Hides the popover programmatically.',
	},
	showPopover: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Shows the popover programmatically.',
	},
	click: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Clicks the primary interactive element inside this component.',
	},
	focus: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Sets focus on the internal element.',
	},
	_accessKey: {
		kind: 'prop',
		type: 'AccessKeyPropType',
		required: false,
		doc: "Defines the key combination that can be used to trigger or focus the component's interactive element.",
	},
	_ariaDescription: {
		kind: 'prop',
		type: 'AriaDescriptionPropType',
		required: false,
		doc: 'Defines the value for the aria-description attribute.',
	},
	_customClass: {
		kind: 'prop',
		type: 'CustomClassPropType',
		required: false,
		doc: 'Defines the custom class attribute if _variant="custom" is set.',
	},
	_disabled: {
		kind: 'prop',
		type: 'boolean',
		required: false,
		default: 'false',
		doc: 'Makes the element not focusable and ignore all events.',
	},
	_hideLabel: {
		kind: 'prop',
		type: 'boolean',
		required: false,
		default: 'false',
		doc: 'Hides the caption by default and displays the caption text with a tooltip when the interactive element is focused or the mouse is over it. @TODO: Change type back to `HideLabelPropType` after Stencil#4663 has been resolved.',
	},
	_icons: {
		kind: 'prop',
		type: 'IconsPropType',
		required: false,
		doc: 'Defines the icon classnames.',
	},
	_inline: {
		kind: 'prop',
		type: 'InlinePropType',
		required: false,
		default: 'false',
		doc: 'Defines whether the component is displayed as a standalone block or inline without enforcing a minimum size of 44px.',
	},
	_label: {
		kind: 'prop',
		type: 'LabelWithExpertSlotPropType',
		required: true,
		doc: 'Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.',
	},
	_name: {
		kind: 'prop',
		type: 'string',
		required: false,
		doc: 'Defines the technical name of an input field.',
	},
	_popoverAlign: {
		kind: 'prop',
		type: 'PopoverAlignPropType',
		required: false,
		default: "'bottom'",
		doc: 'Defines where to show the Popover preferably: top, right, bottom or left.',
	},
	_shortKey: {
		kind: 'prop',
		type: 'ShortKeyPropType',
		required: false,
		doc: 'Adds a visual shortcut hint after the label and instructs the screen reader to read the shortcut aloud.',
	},
	_syncValueBySelector: {
		kind: 'prop',
		type: 'SyncValueBySelectorPropType',
		required: false,
		doc: 'Selector for synchronizing the value with another input element. @internal',
	},
	_tabIndex: {
		kind: 'prop',
		type: 'number',
		required: false,
		doc: 'Defines which tab-index the primary element of the component has. (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)',
	},
	_tooltipAlign: {
		kind: 'prop',
		type: 'TooltipAlignPropType',
		required: false,
		default: "'top'",
		doc: 'Defines where to show the Tooltip preferably: top, right, bottom or left.',
	},
	_type: {
		kind: 'prop',
		type: 'ButtonTypePropType',
		required: false,
		default: "'button'",
		doc: 'Defines either the type of the component or of the components interactive element.',
	},
	_value: {
		kind: 'prop',
		type: 'StencilUnknown',
		required: false,
		doc: 'Defines the value of the element.',
	},
	_variant: {
		kind: 'prop',
		type: 'VariantClassNamePropType',
		required: false,
		default: "'normal'",
		doc: 'Defines which variant should be used for presentation.',
	},
};

describe('kol-popover-button public API contract (ARC42 § Public API Contract)', () => {
	it('exposes exactly the pinned props and methods with pinned types, defaults and JSDoc', () => {
		const extracted = extractFrom('popover-button', 'component.tsx');
		// Failing this test means the public contract changed — a breaking change (ARC42 §
		// "Public API Contract (Migration Parity)"): get owner approval, then update the pinned
		// contract consciously and note it in the PR description.
		expect(toContract(extracted)).toEqual(KOL_POPOVER_BUTTON_PUBLIC_API);
	});

	it('implements the schema interface so prop-type drift fails the build', () => {
		expect(readSource('popover-button', 'component.tsx')).toMatch(/implements\s+[^{]*\bPopoverButtonProps\b/);
	});
});

describe('kol-popover-button-wc transitional wrapper (internal contract for legacy consumers)', () => {
	it('keeps the full predecessor surface: 18 props plus showPopover(), hidePopover(), focus() and click()', () => {
		const extracted = extractFrom('popover-button', 'wc.tsx');
		expect(extracted.filter((member) => member.kind === 'prop')).toHaveLength(18);
		expect(extracted.filter((member) => member.kind === 'method').map((member) => member.name)).toEqual(['hidePopover', 'showPopover', 'focus', 'click']);
	});
});
