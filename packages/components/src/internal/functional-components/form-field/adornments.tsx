import { h } from '@stencil/core';
import type { VNode } from '@stencil/core/internal';
import type { IconOrIconClass, InternalButtonProps, KoliBriHorizontalIcons } from '../../../schema';
import { IconFC } from '../icon/component';
import { IconButtonFC } from './icon-button';

type InputAdornmentsOptions = {
	icons?: KoliBriHorizontalIcons;
	smartButton?: InternalButtonProps;
	disabled?: boolean;
	/** Field-specific content after the smart button and the right icon, e.g. the clear button. */
	endAdornment?: VNode | null;
};

const renderIcon = (icon?: IconOrIconClass): VNode | null => {
	if (!icon) {
		return null;
	}
	return typeof icon === 'string' ? (
		<IconFC class="kol-input-container__icon" icons={icon} label="" />
	) : (
		<IconFC class="kol-input-container__icon" icons={icon.icon} label={icon.label ?? ''} style={icon.style} />
	);
};

/**
 * Adornments of `InputContainerFC`: the left icon at the start; the smart button, the right icon and
 * the field-specific content at the end.
 */
export const getInputAdornments = ({
	icons,
	smartButton,
	disabled,
	endAdornment,
}: InputAdornmentsOptions): { startAdornment: VNode[]; endAdornment: VNode[] } => ({
	startAdornment: [renderIcon(icons?.left)].filter(Boolean) as VNode[],
	endAdornment: [
		typeof smartButton === 'object' && smartButton !== null ? (
			<IconButtonFC componentName="button" class="kol-input-container__smart-button" {...smartButton} hideLabel={true} disabled={disabled} />
		) : null,
		renderIcon(icons?.right),
		endAdornment ?? null,
	].filter(Boolean) as VNode[],
});
