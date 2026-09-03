import type { FunctionalComponent as FC } from '@stencil/core';
import { Fragment, h } from '@stencil/core';
import { isString } from 'lodash-es';

import type { IconOrIconClass, KoliBriAllIcons, KoliBriCustomIcon, KoliBriIconsProp } from '../../../schema';
import { showExpertSlot } from '../../../schema';
import { bem } from '../../../schema/bem-registry';
import clsx from '../../../utils/clsx';
import { md } from '../../../utils/markdown';
import type { FunctionalComponentProps } from '../generic-types';
import { IconFC } from '../icon/component';
import type { SpanApi } from './api';

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

function isAllIcons(icons: unknown): icons is KoliBriAllIcons {
	return typeof icons === 'object' && icons !== null && !Array.isArray(icons);
}

function renderUnderlinedBadgeText(label: string, badgeText: string) {
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
	return (
		<>
			{first}
			{rest.length ? (
				<>
					<u>{badgeStr}</u>
					{rest.join(badgeStr)}
				</>
			) : null}
		</>
	);
}

function renderLabel(label: string, hideLabel: boolean, allowMarkdown: boolean | undefined, badgeText: string | undefined) {
	if (hideLabel || !isString(label)) {
		return null;
	}
	if (allowMarkdown) {
		return <span class={clsx(spanBem('label'), 'md')} innerHTML={md(label)} />;
	}
	if (badgeText) {
		return <span class={spanBem('label')}>{renderUnderlinedBadgeText(label, badgeText)}</span>;
	}
	return <span class={spanBem('label')}>{label}</span>;
}

export const SpanFC: FC<
	Omit<FunctionalComponentProps<SpanApi>, 'allowMarkdown' | 'badgeText' | 'hideLabel' | 'icons'> & {
		allowMarkdown?: boolean;
		badgeText?: string;
		hideLabel?: boolean;
		icons?: KoliBriIconsProp;
	}
> = (props, children) => {
	const { allowMarkdown, badgeText, class: classNames, hideLabel = false, icons, label, ...htmlAttributes } = props;

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
			return null;
		}
		return <IconFC class={spanBem('icon', { [position]: true })} icons={iconProps.icon} label={iconProps.label ?? ''} style={iconProps.style} />;
	};

	// label === '' signals that the expert slot should be used instead of the label text
	const hideExpertSlot = !showExpertSlot(label);

	return (
		<span
			{...htmlAttributes}
			class={clsx(
				spanBem({
					'has-badge': !!badgeText,
					'hide-label': !!hideLabel,
				}),
				classNames,
			)}
		>
			{renderIcon(top, 'top')}
			<span class={spanBem('container')}>
				{renderIcon(left, 'left')}
				{hideExpertSlot && renderLabel(label, hideLabel, allowMarkdown, badgeText)}
				<span aria-hidden={hideExpertSlot ? 'true' : undefined} class={spanBem('slot')} hidden={hideExpertSlot}>
					{children}
				</span>
				{isString(badgeText) && badgeText.length > 0 && (
					<kbd aria-hidden="true" class="badge-text-hint">
						{badgeText}
					</kbd>
				)}
				{renderIcon(right, 'right')}
			</span>
			{renderIcon(bottom, 'bottom')}
		</span>
	);
};
