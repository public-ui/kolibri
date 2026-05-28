import { type FunctionalComponent as FC, h } from '@stencil/core';
import KolFormFieldFc, { type FormFieldProps } from '../../functional-components/FormField';
import type { TextareaStates } from '../../schema';
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
import { getRenderStates } from '../_helpers/getRenderStates';

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

	if (
		'_currentLength' in state &&
		typeof state._currentLength === 'number' &&
		'_currentLengthDebounced' in state &&
		typeof state._currentLengthDebounced === 'number'
	) {
		if ('_hasCounter' in state && state._hasCounter === true) {
			props.counter = {
				currentLength: state._currentLength,
				currentLengthDebounced: state._currentLengthDebounced,
				maxLength: state._maxLength,
				maxLengthBehavior: state._maxLengthBehavior || 'hard',
			};
		}
	}

	if ('_variant' in state) {
		props.variant = state._variant;
	}

	return props;
}

const FormFieldStateWrapper: FC<FormFieldStateWrapperProps> = ({ state, ...other }, children) => {
	const { ariaDescribedBy: ariaDescribedByArray } = getRenderStates(state);
	const isRadioVariant = other.component === 'fieldset' || ('_options' in state && '_orientation' in state);
	const ariaDescribedBy = isRadioVariant && ariaDescribedByArray.length > 0 ? ariaDescribedByArray.join(' ') : undefined;
	const baseProps = getFormFieldProps(state);

	return (
		<KolFormFieldFc {...baseProps} {...other} ariaDescribedBy={ariaDescribedBy}>
			{children}
		</KolFormFieldFc>
	);
};

export default FormFieldStateWrapper;
