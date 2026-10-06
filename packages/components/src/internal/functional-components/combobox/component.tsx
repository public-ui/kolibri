import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { bem } from '../../../schema/bem-registry';
import { IconFC } from '../icon/component';

const comboboxBem = bem.forBlock('kol-combobox');

export const BEM_CLASS_COMBOBOX__DELETE = comboboxBem('delete');

const BEM_CLASS_COMBOBOX_TOGGLE = bem.forBlock('kol-combobox-toggle')();

export type ComboboxToggleFCProps = {
	disabled: boolean;
	handleClick: () => void;
};

/**
 * Opens and closes the suggestion list. It is no tab stop: the keyboard reaches the list from the
 * input.
 */
export const ComboboxToggleFC: FC<ComboboxToggleFCProps> = ({ disabled, handleClick }) => (
	<button type="button" tabIndex={-1} class={BEM_CLASS_COMBOBOX_TOGGLE} onClick={handleClick} disabled={disabled} hidden={disabled}>
		<IconFC icons="kolicon-chevron-down" label="" />
	</button>
);
