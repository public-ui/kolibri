import { h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import clsx from 'clsx';
import { isString, isObject } from 'lodash-es';

import { type BadgeTextPropType, type HideLabelPropType, type IconOrIconClass, type KoliBriIconsProp, type LabelWithExpertSlotPropType } from '../../schema';

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

const KolSpanFc: FC<SpanProps> = (props, children) => {
	const { class: classNames, label, hideLabel = false, badgeText, allowMarkdown, icons, ...other } = props;
	let topIconProps: IconType = null;
	let leftIconProps: IconType = null;
	let rightIconProps: IconType = null;
	let bottomIconProps: IconType = null;

	if (isObject(icons)) {
		topIconProps = icons.top;
		leftIconProps = icons.left;
		rightIconProps = icons.right;
		bottomIconProps = icons.bottom;
	} else if (isString(icons)) {
		leftIconProps = {
			icon: icons,
		};
	}

	return (
		<span class={clsx('kol-span-wc', { 'hide-label': hideLabel }, classNames)} {...other}>
			{isObject(topIconProps) && <IconHelper class="top" {...topIconProps} />}
			<span>
				{isObject(leftIconProps) && <IconHelper class="left" {...leftIconProps} />}
				<SpanCoreHelper label={label} hideLabel={hideLabel} allowMarkdown={allowMarkdown} badgeText={badgeText}>
					{children}
				</SpanCoreHelper>
				{isObject(rightIconProps) && <IconHelper class="right" {...rightIconProps} />}
			</span>
			{isObject(bottomIconProps) && <IconHelper class="bottom" {...bottomIconProps} />}
		</span>
	);
};

export default KolSpanFc;
