import { type FunctionalComponent as FC, h } from '@stencil/core';
import KolFormFieldFc, { type FormFieldProps } from '../../functional-components/FormField';
import type { TextareaStates } from '../../schema';
import {
	convertMsgToInternMsg,
	type InputCheckboxStates,
	type InputColorStates,
	type InputEmailStates,
	type InputFileStates,
	type InputNumberStates,
	type InputPasswordStates,
	type InputRadioStates,
	type InputRangeStates,
	type InputTextStates,
	type SelectStates,
} from '../../schema';

type InputState =
	| InputTextStates
	| InputEmailStates
	| InputPasswordStates
	| InputNumberStates
	| InputColorStates
	| InputFileStates
	| InputRangeStates
	| InputCheckboxStates
	| InputRadioStates
	| SelectStates
	| TextareaStates;

export type FormFieldStateWrapperProps = Partial<FormFieldProps> & {
	state: InputState;
};

function getFormFieldProps(state: InputState): FormFieldProps {
	const props: FormFieldProps = {
		id: state._id,
		disabled: state._disabled,
		msg: convertMsgToInternMsg(state._msg),
		hint: state._hint,
		label: state._label,
		hideLabel: state._hideLabel,
		hideMsg: state._hideMsg,
		touched: state._touched,
		accessKey: state._accessKey,
		shortKey: state._shortKey,
	};

	if ('_required' in state) {
		props.required = state._required;
	}

	if ('_readOnly' in state) {
		props.readOnly = state._readOnly;
	}

	if (
		'_currentLength' in state &&
		typeof state._currentLength === 'number' &&
		'_currentLengthDebounced' in state &&
		typeof state._currentLengthDebounced === 'number' &&
		'_characterLimit' in state &&
		typeof state._characterLimit === 'number'
	) {
		props.counter = { currentLength: state._currentLength, maxLength: state._characterLimit, currentLengthDebounced: state._currentLengthDebounced };
	}

	return props;
}

const FormFieldStateWrapper: FC<FormFieldStateWrapperProps> = ({ state, ...other }, children) => {
	return (
		<KolFormFieldFc {...getFormFieldProps(state)} {...other}>
			{children}
		</KolFormFieldFc>
	);
};

export default FormFieldStateWrapper;
