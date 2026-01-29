import { h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import clsx from '../../utils/clsx';

import {
	type BadgeTextPropType,
	type HideLabelPropType,
	type IconOrIconClass,
	type KoliBriCustomIcon,
	type KoliBriIconsProp,
	type LabelWithExpertSlotPropType,
} from '../../schema';

import IconHelper from './IconHelper';
import SpanCoreHelper from './SpanCoreHelper';

type IconType = IconOrIconClass | undefined | null;

export type SpanProps = JSXBase.HTMLAttributes<HTMLSpanElement> & {
	label: LabelWithExpertSlotPropType;
	badgeText?: BadgeTextPropType;
	allowMarkdown?: boolean;
	icons?: KoliBriIconsProp;
	hideLabel?: HideLabelPropType;
};

const normalizeIconProps = (icon?: IconOrIconClass | null): KoliBriCustomIcon | null => {
	if (!icon) {
		return null;
	}

	if (typeof icon === 'string') {
		return { icon };
	}

	return icon;
};

const KolSpanFc: FC<SpanProps> = (props, children) => {
	const { class: classNames, label, hideLabel = false, badgeText, allowMarkdown, icons, ...other } = props;
	let topIconProps: IconType = null;
	let leftIconProps: IconType = null;
	let rightIconProps: IconType = null;
	let bottomIconProps: IconType = null;

	if (typeof icons === 'object' && icons !== null) {
		topIconProps = normalizeIconProps(icons.top);
		leftIconProps = normalizeIconProps(icons.left);
		rightIconProps = normalizeIconProps(icons.right);
		bottomIconProps = normalizeIconProps(icons.bottom);
	} else if (typeof icons === 'string') {
		leftIconProps = { icon: icons };
	}

	return (
		<span class={clsx('kol-span', { 'kol-span--hide-label': hideLabel }, classNames)} {...other}>
			{topIconProps && <IconHelper class="top" {...topIconProps} />}
			<span class="kol-span__container">
				{leftIconProps && <IconHelper class="left" {...leftIconProps} />}
				<SpanCoreHelper label={label} hideLabel={hideLabel} allowMarkdown={allowMarkdown} badgeText={badgeText}>
					{children}
				</SpanCoreHelper>
				{rightIconProps && <IconHelper class="right" {...rightIconProps} />}
			</span>
			{bottomIconProps && <IconHelper class="bottom" {...bottomIconProps} />}
		</span>
	);
};

export default KolSpanFc;
