import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { bem } from '../../../schema/bem-registry';
import { IconFC } from '../icon/component';

const comboboxBem = bem.forBlock('kol-combobox');

export const BEM_CLASS_COMBOBOX__DELETE = comboboxBem('delete');

const BEM_CLASS_COMBOBOX_TOGGLE = bem.forBlock('kol-combobox-toggle')();

export type ComboboxToggleFCProps = {
	disabled: boolean;
	expanded: boolean;
	handleClick: () => void;
	label: string;
	listboxId: string;
};

/**
 * Opens and closes the suggestion list. It is no tab stop: the keyboard reaches the list from the
 * input. It keeps its accessible name, because pointer users of assistive technology (voice control,
 * touch screen readers) operate it by that name.
 */
export const ComboboxToggleFC: FC<ComboboxToggleFCProps> = ({ disabled, expanded, handleClick, label, listboxId }) => (
	<button
		type="button"
		tabIndex={-1}
		class={BEM_CLASS_COMBOBOX_TOGGLE}
		aria-controls={listboxId}
		aria-expanded={expanded ? 'true' : 'false'}
		aria-label={label}
		onClick={handleClick}
		disabled={disabled}
		hidden={disabled}
	>
		<IconFC icons="kolicon-chevron-down" label="" />
	</button>
);
