import { h, type FunctionalComponent as FC } from '@stencil/core';
import KolFieldControlFc, { type FieldControlProps } from '../../functional-components/FieldControl';
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

export type FieldControlStateWrapperProps = Partial<FieldControlProps> & {
	state: InputState;
};

function getFieldControlProps(state: InputState): FieldControlProps {
	const props: FieldControlProps = {
		accessKey: state._accessKey,
		shortKey: state._shortKey,
		id: state._id,
		disabled: state._disabled,
		msg: convertMsgToInternMsg(state._msg),
		hint: state._hint,
		label: state._label,
		hideLabel: state._hideLabel,
		touched: state._touched,
	};

	if ('_required' in state) {
		props.required = state._required;
	}

	if ('_readOnly' in state) {
		props.readonly = state._readOnly;
	}

	if ('_labelAlign' in state) {
		props.labelAlign = state._labelAlign;
	}

	return props;
}

const FieldControlStateWrapper: FC<FieldControlStateWrapperProps> = ({ state, ...other }, children) => {
	return (
		<KolFieldControlFc {...getFieldControlProps(state)} {...other}>
			{children}
		</KolFieldControlFc>
	);
};

export default FieldControlStateWrapper;
