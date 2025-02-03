import { h, type FunctionalComponent as FC } from '@stencil/core';
import type { InternMsgPropType } from '../../schema';
import {
	type ButtonProps,
	type IconOrIconClass,
	type InputColorStates,
	type InputEmailStates,
	type InputFileStates,
	type InputNumberStates,
	type InputPasswordStates,
	type InputRangeStates,
	type InputTextStates,
	type KoliBriHorizontalIcons,
	type TextareaStates,
	type SelectStates,
	convertMsgToInternMsg,
} from '../../schema';

import KolInputContainerFc, { type InputContainerProps } from '../../functional-components/InputContainer';
import KolIconButtonFc from '../../functional-components/IconButton';
import { isObject, isString } from 'lodash-es';

type InputState =
	| TextareaStates
	| SelectStates
	| InputTextStates
	| InputEmailStates
	| InputPasswordStates
	| InputNumberStates
	| InputColorStates
	| InputFileStates
	| InputRangeStates;

export type InputContainerStateWrapperProps = Partial<InputContainerProps> & {
	state: InputState;
};

function getInputContainerProps(state: InputState): {
	icons?: KoliBriHorizontalIcons;
	smartButton?: ButtonProps;
	disabled?: boolean;
	msg?: InternMsgPropType;
	touched?: boolean;
} {
	let icons: KoliBriHorizontalIcons | undefined = undefined;
	let smartButton: ButtonProps | undefined;

	if ('_icons' in state) {
		icons = state._icons;
	}

	if ('_smartButton' in state) {
		smartButton = state._smartButton;
	}

	return {
		icons,
		smartButton,
		disabled: state._disabled,
		msg: convertMsgToInternMsg(state._msg),
		touched: state._touched,
	};
}

const InputContainerStateWrapperFc: FC<InputContainerStateWrapperProps> = ({ state, endAdornment: defaultEndAdornment }, children) => {
	const { icons, smartButton, disabled, msg, touched } = getInputContainerProps(state);

	let leftIconProps: IconOrIconClass | undefined = icons?.left;
	if (isString(leftIconProps)) {
		leftIconProps = { icon: leftIconProps };
	}

	let rightIconProps: IconOrIconClass | undefined = icons?.right;
	if (isString(rightIconProps)) {
		rightIconProps = { icon: rightIconProps };
	}

	const startAdornment = [];
	const endAdornment = [];

	if (defaultEndAdornment) {
		if (Array.isArray(defaultEndAdornment)) {
			endAdornment.push(...defaultEndAdornment);
		} else {
			endAdornment.push(defaultEndAdornment);
		}
	}

	if (leftIconProps) {
		startAdornment.push(<KolIconButtonFc componentName="icon" {...(isObject(leftIconProps) ? leftIconProps : {})} />);
	}

	if (isObject(smartButton)) {
		endAdornment.push(<KolIconButtonFc componentName="button" {...smartButton} hideLabel={true} disabled={disabled} />);
	}

	if (rightIconProps) {
		endAdornment.push(<KolIconButtonFc componentName="icon" {...(isObject(rightIconProps) ? rightIconProps : {})} />);
	}

	return (
		<KolInputContainerFc disabled={disabled} msg={msg} touched={touched} startAdornment={startAdornment} endAdornment={endAdornment}>
			{children}
		</KolInputContainerFc>
	);
};

export default InputContainerStateWrapperFc;
