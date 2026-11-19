import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { bem } from '../../../schema/bem-registry';

const inputRangeBem = bem.forBlock('kol-input-range');

export const BEM_CLASS_INPUT_RANGE__INPUT_NUMBER = inputRangeBem('input', { number: true });
export const BEM_CLASS_INPUT_RANGE__INPUT_RANGE = inputRangeBem('input', { range: true });

const BEM_CLASS_INPUT_RANGE__INPUTS_WRAPPER = inputRangeBem('inputs-wrapper');

export type InputRangeInputsFCProps = {
	max?: number | null;
	min?: number | null;
};

/**
 * Places the range input next to the number input. The number input is as wide as the longer of the
 * two bounds, at least four digits, plus room for its spin buttons.
 */
export const InputRangeInputsFC: FC<InputRangeInputsFCProps> = ({ max, min }, children) => (
	<div
		class={BEM_CLASS_INPUT_RANGE__INPUTS_WRAPPER}
		style={{ '--kolibri-input-range--input-number--width': `calc(${Math.max(String(max ?? 100).length, String(min ?? 0).length, 4)}ch + 2em)` }}
	>
		{children}
	</div>
);
