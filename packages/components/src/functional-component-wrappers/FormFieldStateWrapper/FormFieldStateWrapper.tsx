import { h, type FunctionalComponent as FC } from '@stencil/core';
import KolFormFieldFc, { type FormFieldProps } from '../../functional-components/FormField';
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
	type SelectStates,
	convertMsgToInternMsg,
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
	| SelectStates;

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

	if ('_hasCounter' in state && '_currentLength' in state) {
		props.counter = state._hasCounter ? { currentLength: state._currentLength } : undefined;
		if (props.counter && '_maxLength' in state) {
			props.counter.maxLength = state._maxLength;
		}
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
