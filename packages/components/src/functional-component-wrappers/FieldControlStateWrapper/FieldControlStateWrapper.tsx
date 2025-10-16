import { h, type FunctionalComponent as FC } from '@stencil/core';
import KolFieldControlFc, { type FieldControlProps } from '../../functional-components/FieldControl';
import {
	type InputCheckboxStates,
	type InputColorStates,
	type InputEmailStates,
	type InputFileStates,
	type InputNumberStates,
	type InputPasswordStates,
	type InputRadioStates,
	type InputRangeStates,
	type InputTextStates,
	type MsgPropType,
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
	| SelectStates;

export type FieldControlStateWrapperProps = Partial<FieldControlProps> & {
	state: InputState;
};

function getFieldControlProps(state: InputState): FieldControlProps {
	const props: FieldControlProps = {
		id: state._id,
		disabled: state._disabled,
		msg: state._msg as MsgPropType,
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

	if ('_accessKey' in state) {
		props.accessKey = state._accessKey;
	}

	if ('_shortKey' in state) {
		props.shortKey = state._shortKey;
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
