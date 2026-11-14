import { buttonPropsConfig, type ButtonApi } from '@public-ui/internals/controller/button/api';
import type { FunctionalComponentProps } from '@public-ui/internals/controller/generic-types';
import { resolveFcProps } from '@public-ui/internals/controller/props-from-config';
import { classNameFromVariant, trimLabel } from '@public-ui/internals/schema';
import { bem } from '@public-ui/internals/schema/bem-registry';
import clsx from '@public-ui/internals/utils/clsx';
import { html, nothing, type TemplateResult } from 'lit';
import { ref } from 'lit/directives/ref.js';
import { AriaDescriptionSpanLitFC } from './aria-description-span';
import { BemRootLitFC } from './bem-root-node';
import { SpanLitFC } from './span';
import { TooltipLitFC } from './tooltip';

const buttonBem = bem.forBlock('kol-button');
const BEM_CLASS_BUTTON__INTERACTIVE_ELEMENT = buttonBem('interactive-element');
const BEM_CLASS_BUTTON__TEXT = buttonBem('text');
const BEM_CLASS_BUTTON__TOOLTIP = buttonBem('tooltip');

type ButtonLitFCProps = FunctionalComponentProps<ButtonApi>;

/**
 * Lit port of `ButtonFC` (`internal/functional-components/button/component.tsx`).
 *
 * Renders the button, its floating tooltip and its visually-hidden description inside a single
 * BEM root, structurally identical to the Stencil original: same tags, same BEM classes, same
 * attributes. The tooltip and the description span cannot live inside the `<button>` — a nested
 * tooltip would become part of the accessible name, and the description is referenced by
 * `aria-describedby` from outside. They are therefore siblings of the `<button>` within the BEM root.
 */
export function ButtonLitFC(props: ButtonLitFCProps): TemplateResult {
	const {
		accessKey,
		ariaControls,
		ariaDescription,
		ariaDescriptionId,
		ariaExpanded,
		ariaHasPopup,
		ariaSelected,
		customClass,
		disabled,
		handleBlur,
		handleClick,
		handleFocus,
		handleMouseDown,
		hideLabel,
		icons,
		id,
		inline,
		label,
		name,
		refButton,
		refTooltip,
		role,
		shortKey,
		tabIndex,
		type,
		variant,
		/* Not rendered as attributes: `tooltipAlign` is consumed by the tooltip behavior of the
		   web component; why `on` stays out of the forwarded rest attributes is the comment above. */
		on,
		tooltipAlign,
		...rest
	} = resolveFcProps(buttonPropsConfig, props);

	// Marking both as intentionally read keeps them out of the forwarded rest attributes.
	void on;
	void tooltipAlign;

	const badgeText = accessKey || shortKey;
	const hasLabelText = trimLabel(label).length > 0;
	const hasAriaDescription = ariaDescription.trim().length > 0;

	return BemRootLitFC(
		(modifiers) => buttonBem(modifiers as never),
		{
			modifiers: {
				disabled,
				'hide-label': hideLabel,
				inline: inline === true,
				standalone: inline === false,
			},
			class: clsx(
				// Forwarded 1:1 from the FC tag, so a component embedding a button inside its own
				// boundary can mark it — e.g. the badge's `kol-badge__smart-button`. The button's own
				// FC-facing props carry no `class` prop, so only the variant and custom class remain.
				{
					[classNameFromVariant(variant, 'button')]: variant.length > 0,
					[customClass]: customClass.length > 0,
				},
			),
			attrs: rest as Record<string, string | number | boolean | undefined>,
		},
		html`<button
				${ref(refButton)}
				accesskey="${accessKey || nothing}"
				aria-controls="${ariaControls || nothing}"
				aria-describedby="${hasAriaDescription ? ariaDescriptionId : nothing}"
				aria-expanded="${ariaExpanded || nothing}"
				aria-haspopup="${ariaHasPopup || nothing}"
				aria-keyshortcuts="${shortKey || nothing}"
				aria-label="${hideLabel && hasLabelText ? trimLabel(label) : nothing}"
				aria-selected="${ariaSelected || nothing}"
				class="${BEM_CLASS_BUTTON__INTERACTIVE_ELEMENT}"
				?disabled="${disabled}"
				id="${id || nothing}"
				name="${name || nothing}"
				@blur="${handleBlur}"
				@click="${handleClick}"
				@focus="${handleFocus}"
				@mousedown="${handleMouseDown}"
				role="${role || nothing}"
				tabindex="${tabIndex ?? nothing}"
				type="${type}"
			>
				${SpanLitFC({
					class: BEM_CLASS_BUTTON__TEXT,
					badgeText,
					icons,
					hideLabel,
					label,
					children: html`<slot name="expert" slot="expert"></slot>`,
				})}
			</button>
			${hideLabel && hasLabelText ? html`<div class="${BEM_CLASS_BUTTON__TOOLTIP}">${TooltipLitFC({ badgeText, label, refFloating: refTooltip })}</div>` : nothing}
			${hasAriaDescription ? AriaDescriptionSpanLitFC({ description: ariaDescription, descriptionId: ariaDescriptionId }) : nothing}`,
	);
}
