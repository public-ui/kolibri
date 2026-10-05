import { h } from '@stencil/core';
import type { VNode } from '@stencil/core/internal';
import type { IconOrIconClass, InternalButtonProps, KoliBriHorizontalIcons } from '../../../schema';
import { IconFC } from '../icon/component';
import { IconButtonFC } from './icon-button';

type InputAdornmentsOptions = {
	icons?: KoliBriHorizontalIcons;
	smartButton?: InternalButtonProps;
	disabled?: boolean;
	/** Field-specific content before the left icon, e.g. the step-down button of `kol-input-number`. */
	startAdornment?: VNode | null;
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
 * Adornments of `InputContainerFC`: the field-specific start content and the left icon at the start;
 * the smart button, the right icon and the field-specific end content at the end.
 */
export const getInputAdornments = ({
	icons,
	smartButton,
	disabled,
	startAdornment,
	endAdornment,
}: InputAdornmentsOptions): { startAdornment: VNode[]; endAdornment: VNode[] } => ({
	startAdornment: [startAdornment ?? null, renderIcon(icons?.left)].filter(Boolean) as VNode[],
	endAdornment: [
		typeof smartButton === 'object' && smartButton !== null ? (
			<IconButtonFC componentName="button" class="kol-input-container__smart-button" {...smartButton} hideLabel={true} disabled={disabled} />
		) : null,
		renderIcon(icons?.right),
		endAdornment ?? null,
	].filter(Boolean) as VNode[],
});
