import { h, type FunctionalComponent as FC } from '@stencil/core';
import KolTextAreaFc, { type TextAreaProps } from '../../functional-components/inputs/TextArea';

import { convertMsgToInternMsg, type TextareaStates } from '../../schema';
import { getRenderStates } from '../_helpers/getRenderStates';

export type TextAreaStateWrapperProps = Partial<TextAreaProps> & {
	state: TextareaStates;
};

function getTextAreaProps(state: TextareaStates, other: Partial<TextAreaProps>): TextAreaProps {
	const renderStates = getRenderStates(state);
	const ariaDescribedBy = [...renderStates.ariaDescribedBy, ...(other.ariaDescribedBy ?? [])];

	const props: TextAreaProps = {
		id: state._id,
		hideLabel: state._hideLabel,
		label: state._label,
		value: state._value as string,
		accessKey: state._accessKey,
		disabled: state._disabled,
		name: state._name,
		rows: state._rows,
		readonly: state._readOnly,
		required: state._required,
		placeholder: state._placeholder,
		maxLength: state._maxLength,
		touched: state._touched,
		msg: convertMsgToInternMsg(state._msg),
		...other,
		ariaDescribedBy,
	};

	return props;
}

const TextAreaStateWrapper: FC<TextAreaStateWrapperProps> = ({ state, ...other }) => {
	return <KolTextAreaFc {...getTextAreaProps(state, other)} />;
};

export default TextAreaStateWrapper;
