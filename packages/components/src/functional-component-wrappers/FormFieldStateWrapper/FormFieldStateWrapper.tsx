import { type FunctionalComponent as FC, h } from '@stencil/core';
import KolFormFieldFc, { type FormFieldProps } from '../../functional-components/FormField';
import type { TextareaStates } from '../../schema';
import {
	type InputColorStates,
	type InputEmailStates,
	type InputFileStates,
	type InputNumberStates,
	type InputPasswordStates,
	type InputRangeStates,
	type InputTextStates,
	type MsgPropType,
} from '../../schema';

type InputState =
	InputTextStates | InputEmailStates | InputPasswordStates | InputNumberStates | InputColorStates | InputFileStates | InputRangeStates | TextareaStates;

export type FormFieldStateWrapperProps = Partial<FormFieldProps> & {
	state: InputState;
	counterRefs?: {
		visualRef?: (el?: HTMLSpanElement) => void;
		ariaRef?: (el?: HTMLSpanElement) => void;
	};
};

function getFormFieldProps(
	state: InputState,
	counterRefs?: { visualRef?: (el?: HTMLSpanElement) => void; ariaRef?: (el?: HTMLSpanElement) => void },
): FormFieldProps {
	const props: FormFieldProps = {
		id: state._id,
		disabled: state._disabled,
		msg: state._msg as MsgPropType,
		hint: state._hint,
		label: state._label,
		hideLabel: state._hideLabel,
		hideMsg: state._hideMsg,
		touched: state._touched,
		showBadge: ('_accessKey' in state && Boolean(state._accessKey)) || ('_shortKey' in state && Boolean(state._shortKey)),
	};

	if ('_required' in state) {
		props.required = state._required;
	}

	if ('_readOnly' in state) {
		props.readOnly = state._readOnly;
	}

	if ('_accessKey' in state) {
		props.accessKey = state._accessKey;
	}

	if ('_shortKey' in state) {
		props.shortKey = state._shortKey;
	}

	if ('_maxLength' in state) {
		props.maxLength = state._maxLength;
	}

	if ('_hasCounter' in state && state._hasCounter === true) {
		props.counter = {
			maxLength: '_maxLength' in state ? state._maxLength : undefined,
			maxLengthBehavior: ('_maxLengthBehavior' in state ? state._maxLengthBehavior : undefined) || 'hard',
			...counterRefs,
		};
	}

	if ('_variant' in state) {
		props.variant = state._variant;
	}
	return props;
}

const FormFieldStateWrapper: FC<FormFieldStateWrapperProps> = ({ state, counterRefs, ...other }, children) => {
	const baseProps = getFormFieldProps(state, counterRefs);

	return (
		<KolFormFieldFc {...baseProps} {...other}>
			{children}
		</KolFormFieldFc>
	);
};

export default FormFieldStateWrapper;
