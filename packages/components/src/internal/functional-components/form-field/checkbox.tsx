import { h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import { getMsgType, isMsgDefinedAndInputTouched } from '../../../schema';
import { bem } from '../../../schema/bem-registry';
import clsx from '../../../utils/clsx';
import { BemRootNodeFC } from '../bem-root-node/component';
import { IconFC } from '../icon/component';
import { InputFC, type InputFCProps } from './input';

const checkboxBem = bem.forBlock('kol-checkbox');

type MsgTypeModifier = 'default' | 'error' | 'info' | 'success' | 'warning';

export type CheckboxFCProps = Omit<JSXBase.LabelHTMLAttributes<HTMLLabelElement>, 'ref'> & {
	icon: string;
	variant?: 'default' | 'button' | 'switch';
	inputProps: InputFCProps;
};

/** Native checkbox wrapped in its label, with the icon of the current state before it. */
export const CheckboxFC: FC<CheckboxFCProps> = ({ class: classNames, variant = 'default', icon, inputProps, ...other }) => {
	const { class: inputClass, ...restInputProps } = inputProps;

	return (
		<BemRootNodeFC
			component="label"
			block="kol-checkbox"
			modifiers={{
				'variant-button': variant === 'button',
				'variant-default': variant === 'default',
				'variant-switch': variant === 'switch',
				checked: Boolean(inputProps.checked),
				indeterminate: Boolean(inputProps.indeterminate),
				disabled: Boolean(inputProps.disabled),
				required: Boolean(inputProps.required),
				touched: Boolean(inputProps.touched),
				...(isMsgDefinedAndInputTouched(inputProps.msg, inputProps.touched) ? { [getMsgType(inputProps.msg) as MsgTypeModifier]: true } : {}),
			}}
			class={classNames}
			{...other}
		>
			<IconFC label="" icons={icon} class={checkboxBem('icon')} />
			<InputFC class={clsx(checkboxBem('input'), inputClass as string)} {...restInputProps} type="checkbox" />
		</BemRootNodeFC>
	);
};
