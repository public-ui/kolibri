import { h, type FunctionalComponent as FC } from '@stencil/core';
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
	type KoliBriCustomIcon,
	type KoliBriHorizontalIcons,
	type MsgPropType,
	type SelectStates,
	type Stringified,
	type TextareaStates,
} from '../../schema';

import KolIconButtonFc from '../../functional-components/IconButton';
import KolInputContainerFc, { type InputContainerProps } from '../../functional-components/InputContainer';

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

const normalizeIconProps = (icon?: IconOrIconClass): KoliBriCustomIcon | undefined => {
	if (!icon) {
		return undefined;
	}

	if (typeof icon === 'string') {
		return { icon };
	}

	return icon;
};

function getInputContainerProps(state: InputState): {
	icons?: KoliBriHorizontalIcons;
	smartButton?: ButtonProps;
	disabled?: boolean;
	msg?: Stringified<MsgPropType>;
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
		msg: state._msg,
		touched: state._touched,
	};
}

const InputContainerStateWrapperFc: FC<InputContainerStateWrapperProps> = (
	{ state, startAdornment: defaultStartAdornment, endAdornment: defaultEndAdornment },
	children,
) => {
	const { icons, smartButton, disabled, msg, touched } = getInputContainerProps(state);

	const leftIconProps = normalizeIconProps(icons?.left);
	const rightIconProps = normalizeIconProps(icons?.right);

	const startAdornment = [];
	const endAdornment = [];

	if (defaultStartAdornment) {
		if (Array.isArray(defaultStartAdornment)) {
			startAdornment.push(...defaultStartAdornment);
		} else {
			startAdornment.push(defaultStartAdornment);
		}
	}

	if (leftIconProps) {
		startAdornment.push(<KolIconButtonFc componentName="icon" class="kol-input-container__icon" {...leftIconProps} />);
	}

	if (smartButton) {
		endAdornment.push(
			<KolIconButtonFc componentName="button" class="kol-input-container__smart-button" {...smartButton} hideLabel={true} disabled={disabled} />,
		);
	}

	if (rightIconProps) {
		endAdornment.push(<KolIconButtonFc componentName="icon" class="kol-input-container__icon" {...rightIconProps} />);
	}

	if (defaultEndAdornment) {
		if (Array.isArray(defaultEndAdornment)) {
			endAdornment.push(...defaultEndAdornment);
		} else {
			endAdornment.push(defaultEndAdornment);
		}
	}

	return (
		<KolInputContainerFc disabled={disabled} msg={msg} touched={touched} startAdornment={startAdornment} endAdornment={endAdornment}>
			{children}
		</KolInputContainerFc>
	);
};

export default InputContainerStateWrapperFc;
