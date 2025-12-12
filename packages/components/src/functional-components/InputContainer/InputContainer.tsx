import { h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase, VNode } from '@stencil/core/internal';
import clsx from 'clsx';
import { isMsgDefinedAndInputTouched, type MsgPropType, type Stringified } from '../../schema';
import InputAdornment from '../InputAdornment';

type InputAdornmentType = VNode | VNode[] | null;

export type InputContainerProps = JSXBase.HTMLAttributes & {
	startAdornment?: InputAdornmentType;
	endAdornment?: InputAdornmentType;
	disabled?: boolean;
	msg?: Stringified<MsgPropType>;
	touched?: boolean;

	containerProps?: JSXBase.HTMLAttributes<HTMLDivElement>;
	startAdornmentProps?: JSXBase.HTMLAttributes<HTMLDivElement>;
	endAdornmentProps?: JSXBase.HTMLAttributes<HTMLDivElement>;
};

function hasItems(items?: InputAdornmentType): boolean {
	if (!items) {
		return false;
	}

	return Array.isArray(items) ? items.length > 0 : Boolean(items);
}

const Container: FC<JSXBase.HTMLAttributes<HTMLDivElement>> = ({ class: className, ...other }, children) => {
	return (
		<div class={clsx('kol-input-container__container', className)} {...other}>
			{children}
		</div>
	);
};

const KolInputContainerFc: FC<InputContainerProps> = (props, children) => {
	const { class: classNames, startAdornment, endAdornment, disabled, msg, touched, containerProps, startAdornmentProps, endAdornmentProps, ...other } = props;
	const showMsg = isMsgDefinedAndInputTouched(msg, touched);
	const msgType = typeof msg === 'string' ? 'error' : msg?._type;

	const stateCssClasses = {
		['kol-input-container--disabled']: disabled,
		[`kol-input-container--${msgType || 'error'}`]: showMsg,
	};

	const baseProps: JSXBase.HTMLAttributes<HTMLDivElement> = {
		class: clsx('kol-input-container', stateCssClasses, classNames),
		...other,
	};

	if (!hasItems(startAdornment) && !hasItems(endAdornment)) {
		return (
			<div {...baseProps}>
				<Container {...containerProps}>{children}</Container>
			</div>
		);
	}

	return (
		<div {...baseProps}>
			<InputAdornment {...startAdornmentProps} position="start">
				{startAdornment}
			</InputAdornment>
			<Container {...containerProps}>{children}</Container>
			<InputAdornment {...endAdornmentProps} position="end">
				{endAdornment}
			</InputAdornment>
		</div>
	);
};

export default KolInputContainerFc;
