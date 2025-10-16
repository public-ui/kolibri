import { h, type FunctionalComponent as FC } from '@stencil/core';
import { type InputProps } from '../../functional-components/inputs/Input';
import KolRadioFc, { type RadioProps } from '../../functional-components/inputs/Radio';

import { type InputRadioStates, type MsgPropType } from '../../schema';
import { getRenderStates } from '../_helpers/getRenderStates';

export type RadioStateWrapperProps = Omit<RadioProps, 'inputProps'> & {
	state: InputRadioStates;
	inputProps?: Partial<InputProps>;
};

function getRadioProps(state: InputRadioStates, inputProps: Partial<InputProps> = {}): InputProps {
	const { ariaDescribedBy } = getRenderStates(state);

	const props: InputProps = {
		id: state._id,
		hideLabel: state._hideLabel,
		label: state._label,
		value: state._value as string | number | string[] | undefined,
		disabled: state._disabled,
		name: state._name,
		ariaDescribedBy,
	};

	if ('_required' in state) props.required = state._required;
	if ('_touched' in state) props.touched = state._touched;
	if ('_msg' in state) props.msg = state._msg as MsgPropType;

	return { ...props, ...inputProps };
}

const RadioStateWrapper: FC<RadioStateWrapperProps> = ({ state, inputProps, ...other }) => {
	return <KolRadioFc inputProps={getRadioProps(state, inputProps)} {...other} />;
};

export default RadioStateWrapper;
