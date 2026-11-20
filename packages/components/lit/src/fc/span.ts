import type { IconOrIconClass, KoliBriCustomIcon, KoliBriIconsProp, LabelLangSegmentsPropType } from '@public-ui/internals/schema';
import { showExpertSlot } from '@public-ui/internals/schema';
import { bem } from '@public-ui/internals/schema/bem-registry';
import clsx from '@public-ui/internals/utils/clsx';
import { md } from '@public-ui/internals/utils/markdown';
import { html, nothing, type TemplateResult } from 'lit';
import { isString } from 'lodash-es';
import { IconLitFC } from './icon';

const spanBem = bem.forBlock('kol-span');

type NormalizedIcon = KoliBriCustomIcon | null;

function isCustomIcon(icon: IconOrIconClass): icon is KoliBriCustomIcon {
	return typeof icon === 'object' && icon !== null && 'icon' in icon;
}

function normalizeIcon(icon: IconOrIconClass | undefined | null): NormalizedIcon {
	if (icon !== null && icon !== undefined && isCustomIcon(icon)) {
		return icon;
	}
	if (isString(icon) && icon.length > 0) {
		return { icon };
	}
	return null;
}

function isAllIcons(icons: unknown): icons is Exclude<KoliBriIconsProp, string> {
	return typeof icons === 'object' && icons !== null && !Array.isArray(icons);
}

function renderUnderlinedBadgeText(label: string, badgeText: string): TemplateResult {
	/* Prefer capitalization as defined in the badgeText, try uppercase/lowercase when there's no match. */
	let badgeStr = badgeText;
	let [first, ...rest] = label.split(badgeStr);
	if (rest.length === 0) {
		badgeStr = badgeText.toUpperCase();
		[first, ...rest] = label.split(badgeStr);
	}
	if (rest.length === 0) {
		badgeStr = badgeText.toLowerCase();
		[first, ...rest] = label.split(badgeStr);
	}
	return html`${first}${rest.length ? html`<u>${badgeStr}</u>${rest.join(badgeStr)}` : nothing}`;
}

function renderLabel(label: LabelLangSegmentsPropType, hideLabel: boolean, allowMarkdown: boolean | undefined, badgeText: string | undefined): TemplateResult {
	if (hideLabel) {
		return html`${nothing}`;
	}

	if (Array.isArray(label)) {
		return html`<span class="${spanBem('label')}">${label.map((labelSegment) => html`<span lang="${labelSegment.lang}">${labelSegment.text}</span>`)}</span>`;
	} else {
		if (allowMarkdown) {
			return html`<span class="${clsx(spanBem('label'), 'md')}" .innerHTML="${md(label)}"></span>`;
		}
		if (badgeText) {
			return html`<span class="${spanBem('label')}">${renderUnderlinedBadgeText(label, badgeText)}</span>`;
		}
		return html`<span class="${spanBem('label')}">${label}</span>`;
	}
}

export type SpanLitProps = {
	allowMarkdown?: boolean;
	badgeText?: string;
	class?: string | (string | false | undefined)[];
	hideLabel?: boolean;
	icons?: KoliBriIconsProp;
	label: LabelLangSegmentsPropType;
	/** Slot content inside the `kol-span__slot` element; `nothing` renders none. */
	children?: TemplateResult;
};

/**
 * Lit port of `SpanFC` (`internal/functional-components/span/component.tsx`). The JSX children
 * of the original become the `children` template part; all other rendering stays 1:1.
 */
export function SpanLitFC(props: SpanLitProps): TemplateResult {
	const { allowMarkdown, badgeText, class: classNames, hideLabel = false, icons, label, children } = props;

	let top: NormalizedIcon = null;
	let left: NormalizedIcon = null;
	let right: NormalizedIcon = null;
	let bottom: NormalizedIcon = null;

	if (isAllIcons(icons)) {
		top = normalizeIcon(icons.top);
		left = normalizeIcon(icons.left);
		right = normalizeIcon(icons.right);
		bottom = normalizeIcon(icons.bottom);
	} else if (isString(icons) && icons.length > 0) {
		// An empty icon string must not render an (invisible) icon element: it would still
		// occupy a slot in the flex container and shift the label by the container gap.
		left = { icon: icons };
	}

	const renderIcon = (iconProps: NormalizedIcon, position: 'bottom' | 'left' | 'right' | 'top') => {
		if (!iconProps) {
			return html`${nothing}`;
		}
		return IconLitFC({
			icons: iconProps.icon,
			label: iconProps.label ?? '',
			style: iconProps.style as Record<string, string> | undefined,
			class: spanBem('icon', { [position]: true }),
		});
	};

	// label === '' signals that the expert slot should be used instead of the label text
	const hideExpertSlot = !showExpertSlot(label);

	return html`<span class="${clsx(spanBem({ 'has-badge': !!badgeText, 'hide-label': !!hideLabel }), classNames)}"
		>${renderIcon(top, 'top')}<span class="${spanBem('container')}"
			>${renderIcon(left, 'left')}${hideExpertSlot ? renderLabel(label, hideLabel, allowMarkdown, badgeText) : html`${nothing}`}
			<span aria-hidden="${hideExpertSlot ? 'true' : nothing}" class="${spanBem('slot')}" ?hidden="${hideExpertSlot}">${children ?? nothing}</span
			>${isString(badgeText) && badgeText.length > 0 ? html`<kbd aria-hidden="true" class="badge-text-hint">${badgeText}</kbd>` : nothing}
			${renderIcon(right, 'right')}</span
		>${renderIcon(bottom, 'bottom')}</span
	>`;
}
