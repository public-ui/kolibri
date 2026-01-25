import { h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import { isObject, isString } from 'lodash-es';
import clsx from '../../utils/clsx';

import { type BadgeTextPropType, type HideLabelPropType, type IconOrIconClass, type KoliBriIconsProp, type LabelWithExpertSlotPropType } from '../../schema';
import { IconFC } from '../../components/_skeleton/internal/functional-components/icon/component';
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

	const renderIcon = (iconProps: IconType, positionClass: string) => {
		if (!isObject(iconProps)) {
			return null;
		}
		const { icon, label: iconLabel, style } = iconProps;

		return <IconFC class={clsx('icon', positionClass)} label={iconLabel || ''} icons={icon} style={style} />;
	};

	return (
		<span class={clsx('kol-span', { 'kol-span--hide-label': hideLabel }, classNames)} {...other}>
			{renderIcon(topIconProps, 'top')}
			<span class="kol-span__container">
				{renderIcon(leftIconProps, 'left')}
				<SpanCoreHelper label={label} hideLabel={hideLabel} allowMarkdown={allowMarkdown} badgeText={badgeText}>
					{children}
				</SpanCoreHelper>
				{renderIcon(rightIconProps, 'right')}
			</span>
			{renderIcon(bottomIconProps, 'bottom')}
		</span>
	);
};

export default KolSpanFc;
