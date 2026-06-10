import { h, type FunctionalComponent as FC } from '@stencil/core';
import KolSelectFc, { type SelectProps } from '../../functional-components/inputs/NativeSelect';

import { type MsgPropType, type SelectStates } from '../../schema';
import { getRenderStates } from '../_helpers/getRenderStates';

export type SelectStateWrapperProps = Partial<SelectProps> & {
	state: SelectStates;
};

function getSelectProps(state: SelectStates): SelectProps {
	const { ariaDescribedBy } = getRenderStates(state);

	const props: SelectProps = {
		id: state._id,
		hideLabel: state._hideLabel,
		label: state._label,
		value: state._value,
		options: state._options,
		accessKey: state._accessKey,
		disabled: state._disabled,
		name: state._name,
		ariaDescribedBy: ariaDescribedBy,
		size: state._multiple ? state._rows : undefined,
		multiple: state._multiple,
		required: state._required,
		touched: state._touched,
		msg: state._msg as MsgPropType,
	};

	if ('_shortKey' in state) props['aria-keyshortcuts'] = state._shortKey;

	return props;
}

const SelectStateWrapper: FC<SelectStateWrapperProps> = ({ state, ...other }) => {
	return <KolSelectFc {...getSelectProps(state)} {...other} />;
};

export default SelectStateWrapper;
