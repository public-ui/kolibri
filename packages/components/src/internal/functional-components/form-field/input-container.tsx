import { h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase, VNode } from '@stencil/core/internal';
import { getMsgType, isMsgDefinedAndInputTouched, type MsgPropType, type Stringified } from '../../../schema';
import { bem } from '../../../schema/bem-registry';
import clsx from '../../../utils/clsx';
import { BemRootNodeFC } from '../bem-root-node/component';

const inputContainerBem = bem.forBlock('kol-input-container');

type InputAdornmentType = VNode | VNode[] | null;

export type InputAdornmentFCProps = JSXBase.HTMLAttributes<HTMLDivElement> & {
	position?: 'start' | 'end';
};

/** Slot before or after the input, e.g. for icons or the smart button. */
export const InputAdornmentFC: FC<InputAdornmentFCProps> = ({ position = 'start', class: className, ...other }, children) => (
	<div class={clsx(inputContainerBem('adornment', { [position]: true }), className)} {...other}>
		{children}
	</div>
);

export type InputContainerFCProps = JSXBase.HTMLAttributes<HTMLDivElement> & {
	startAdornment?: InputAdornmentType;
	endAdornment?: InputAdornmentType;
	disabled?: boolean;
	msg?: Stringified<MsgPropType>;
	touched?: boolean;
};

function hasItems(items?: InputAdornmentType): boolean {
	if (!items) {
		return false;
	}

	return Array.isArray(items) ? items.length > 0 : Boolean(items);
}

/** Box around the native control of a field. Both adornments render as soon as one of them has content. */
export const InputContainerFC: FC<InputContainerFCProps> = (props, children) => {
	const { class: classNames, startAdornment, endAdornment, disabled, msg, touched, ...other } = props;
	const withAdornments = hasItems(startAdornment) || hasItems(endAdornment);

	return (
		<BemRootNodeFC
			block="kol-input-container"
			modifiers={{
				disabled: Boolean(disabled),
				...(isMsgDefinedAndInputTouched(msg, touched) ? { [getMsgType(msg) as string]: true } : {}),
			}}
			class={classNames}
			{...other}
		>
			{withAdornments && <InputAdornmentFC position="start">{startAdornment}</InputAdornmentFC>}
			<div class={inputContainerBem('container')}>{children}</div>
			{withAdornments && <InputAdornmentFC position="end">{endAdornment}</InputAdornmentFC>}
		</BemRootNodeFC>
	);
};
