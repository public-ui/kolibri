import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { bem } from '../../../schema/bem-registry';

const inputContainerBem = bem.forBlock('kol-input-container');

export const BEM_CLASS_INPUT_CONTAINER__BUTTON = inputContainerBem('button');

export type InputFileNameFCProps = {
	filename: string;
	hasFile: boolean;
};

/** Shows the names of the selected files, or the placeholder text while none is selected. */
export const InputFileNameFC: FC<InputFileNameFCProps> = ({ filename, hasFile }) => (
	<span class={inputContainerBem('filename', { 'has-file': hasFile })}>{filename}</span>
);
