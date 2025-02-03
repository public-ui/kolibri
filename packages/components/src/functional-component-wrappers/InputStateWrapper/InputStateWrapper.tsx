import type { VNode } from '@stencil/core';
import { h, type FunctionalComponent as FC } from '@stencil/core';
import KolInputFc, { type InputProps } from '../../functional-components/inputs/Input';

import {
	type InputColorStates,
	type InputEmailStates,
	type InputFileStates,
	type InputNumberStates,
	type InputPasswordStates,
	type InputRangeStates,
	type InputTextStates,
	type InputCheckboxStates,
	type InputRadioStates,
	convertMsgToInternMsg,
} from '../../schema';
import { getRenderStates } from '../_helpers/getRenderStates';
import SuggestionsFc from '../../functional-components/Suggestions';

type InputState =
	| InputTextStates
	| InputEmailStates
	| InputPasswordStates
	| InputNumberStates
	| InputColorStates
	| InputFileStates
	| InputRangeStates
	| InputCheckboxStates
	| InputRadioStates;

export type InputStateWrapperProps = Partial<InputProps> & {
	state: InputState;
};

function getInputProps(state: InputState): InputProps {
	const { ariaDescribedBy } = getRenderStates(state);

	const props: InputProps = {
		id: state._id,
		hideLabel: state._hideLabel,
		label: state._label,
		accessKey: state._accessKey,
		disabled: state._disabled,
		name: state._name,

		ariaDescribedBy: ariaDescribedBy,
	};

	if ('_type' in state) props.type = state._type;
	if ('_value' in state) props.value = state._value as string | number | string[];
	if ('_required' in state) props.required = state._required;
	if ('_maxLength' in state) props.maxlength = state._maxLength;
	if ('_placeholder' in state) props.placeholder = state._placeholder;
	if ('_autoComplete' in state) props.autoComplete = state._autoComplete;
	if ('_spellCheck' in state) props.spellcheck = state._spellCheck;
	if ('_pattern' in state) props.pattern = state._pattern;
	if ('_readOnly' in state) props.readonly = state._readOnly;
	if ('_min' in state) props.min = state._min;
	if ('_max' in state) props.max = state._max;
	if ('_step' in state) props.step = state._step;
	if ('_multiple' in state) props.multiple = state._multiple;
	if ('_checked' in state) props.checked = state._checked;
	if ('_indeterminate' in state) props.indeterminate = state._indeterminate;
	if ('_touched' in state) props.touched = state._touched;
	if ('_msg' in state) props.msg = convertMsgToInternMsg(state._msg);

	if ('_suggestions' in state) {
		const hasSuggestions = Array.isArray(state._suggestions) && state._suggestions.length > 0;
		if (hasSuggestions) {
			props.suggestions = (<SuggestionsFc id={state._id} suggestions={state._suggestions} />) as VNode;
		}
	}

	return props;
}

const InputStateWrapper: FC<InputStateWrapperProps> = ({ state, ...other }) => {
	return <KolInputFc {...getInputProps(state)} {...other} />;
};

export default InputStateWrapper;
