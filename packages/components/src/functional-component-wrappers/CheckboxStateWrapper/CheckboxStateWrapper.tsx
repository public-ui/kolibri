import { h, type FunctionalComponent as FC } from '@stencil/core';
import KolCheckboxFc, { type CheckboxProps } from '../../functional-components/inputs/Checkbox';
import { type InputProps } from '../../functional-components/inputs/Input';

import { type InputCheckboxStates, convertMsgToInternMsg } from '../../schema';
import { getRenderStates } from '../_helpers/getRenderStates';

export type CheckboxStateWrapperProps = Omit<CheckboxProps, 'inputProps'> & {
	state: InputCheckboxStates;
	inputProps?: Partial<InputProps>;
};

function getCheckboxProps(state: InputCheckboxStates, inputProps: Partial<InputProps> = {}): InputProps {
	const { ariaDescribedBy } = getRenderStates(state);

	const props: InputProps = {
		id: state._id,
		hideLabel: state._hideLabel,
		label: state._label,
		value: state._value as string | number | string[],
		accessKey: state._accessKey,
		disabled: state._disabled,
		name: state._name,

		ariaDescribedBy: ariaDescribedBy,
	};

	if ('_required' in state) props.required = state._required;
	if ('_checked' in state) props.checked = state._checked;
	if ('_indeterminate' in state) props.indeterminate = state._indeterminate;
	if ('_touched' in state) props.touched = state._touched;
	if ('_msg' in state) props.msg = convertMsgToInternMsg(state._msg);

	return { ...props, ...inputProps };
}

const CheckboxStateWrapper: FC<CheckboxStateWrapperProps> = ({ state, inputProps, ...other }) => {
	const variant = state?._variant || 'default';

	return <KolCheckboxFc variant={variant} inputProps={getCheckboxProps(state, inputProps)} {...other} />;
};

export default CheckboxStateWrapper;
