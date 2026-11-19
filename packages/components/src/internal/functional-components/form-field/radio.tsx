import { h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import { getMsgType, isMsgDefinedAndInputTouched } from '../../../schema';
import { bem } from '../../../schema/bem-registry';
import clsx from '../../../utils/clsx';
import { BemRootNodeFC } from '../bem-root-node/component';
import { InputFC, type InputFCProps } from './input';

const radioBem = bem.forBlock('kol-input-radio');

type MsgTypeModifier = 'default' | 'error' | 'info' | 'success' | 'warning';

export type RadioFCProps = Omit<JSXBase.LabelHTMLAttributes<HTMLLabelElement>, 'ref'> & {
	inputProps: InputFCProps;
};

/** Native radio button of one option, wrapped in its label. */
export const RadioFC: FC<RadioFCProps> = ({ class: classNames, inputProps, ...other }) => {
	const { class: inputClass, ...restInputProps } = inputProps;

	return (
		<BemRootNodeFC
			component="label"
			block="kol-input-radio"
			modifiers={{
				checked: Boolean(inputProps.checked),
				disabled: Boolean(inputProps.disabled),
				required: Boolean(inputProps.required),
				touched: Boolean(inputProps.touched),
				...(isMsgDefinedAndInputTouched(inputProps.msg, inputProps.touched) ? { [getMsgType(inputProps.msg) as MsgTypeModifier]: true } : {}),
			}}
			class={classNames}
			{...other}
		>
			<InputFC class={clsx(radioBem('input'), inputClass as string)} {...restInputProps} type="radio" />
		</BemRootNodeFC>
	);
};
