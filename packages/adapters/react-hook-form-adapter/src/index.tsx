import React, { HTMLAttributes, RefAttributes } from 'react';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import {
	KolInputCheckbox,
	KolInputColor,
	KolInputDate,
	KolInputEmail,
	KolInputFile,
	KolInputNumber,
	KolInputPassword,
	KolInputRadio,
	KolInputRange,
	KolInputText,
	KolSelect,
	KolSingleSelect,
	KolCombobox,
	KolTextarea,
} from '@public-ui/react-v19';
import { JSX } from '@public-ui/components';

type ControllerProps<T extends FieldValues> = Omit<UseControllerProps<T>, 'control'> & { control: NonNullable<UseControllerProps<T>['control']> };

type KolComponentProps = {
	_on?: Record<string, Function>;
	_disabled?: boolean;
};

// Helper type to create controller component types with proper ref forwarding
type ControllerComponent<P> = React.ForwardRefExoticComponent<P & ControllerProps<any> & RefAttributes<HTMLElement>>;

function withController<P extends KolComponentProps>(Component: React.ComponentType<any>, valueProp?: keyof P): ControllerComponent<P> {
	return React.forwardRef<HTMLElement, P & ControllerProps<any>>((props, ref) => {
		const { name, control, rules, defaultValue, ...rest } = props;
		const userEventHandlers = (props._on || {}) as Record<string, Function>;

		return (
			<Controller
				name={name}
				control={control}
				rules={rules}
				defaultValue={defaultValue}
				render={({ field, fieldState }) => {
					const componentProps = {
						...(rest as P),
						_name: name,
						_touched: fieldState.isTouched,
						_disabled: props._disabled || field.disabled,
						_msg: fieldState.error
							? {
									_type: 'error',
									_description: typeof fieldState.error === 'string' ? fieldState.error : (fieldState.error?.message ?? ''),
								}
							: undefined,
						_on: {
							...userEventHandlers,
							onInput: (e: unknown, value: unknown) => {
								field.onChange(value);
								if (userEventHandlers.onInput) {
									userEventHandlers.onInput(e, value);
								}
							},
							onChange: (e: unknown, value: unknown) => {
								field.onChange(value);
								if (userEventHandlers.onChange) {
									userEventHandlers.onChange(e, value);
								}
							},
							onBlur: (e: unknown) => {
								field.onBlur();
								if (userEventHandlers.onBlur) {
									userEventHandlers.onBlur(e);
								}
							},
						},
					};

					// Only set the value prop if valueProp is defined (not for file inputs)
					if (valueProp) {
						(componentProps as any)[valueProp] = field.value;
					}

					return (
						<Component
							ref={(e: HTMLElement | null) => {
								// Forward both refs
								if (ref) {
									if (typeof ref === 'function') ref(e);
									else ref.current = e;
								}
								if (e && field.ref) field.ref(e);
							}}
							{...componentProps}
						/>
					);
				}}
			/>
		);
	}) as ControllerComponent<P>;
}

interface StyleReactProps {
	class?: string;
	className?: string;
	style?: {
		[key: string]: any;
	};
}

export const KolInputTextController = withController(KolInputText as any, '_value') as ControllerComponent<
	JSX.KolInputText & Omit<HTMLAttributes<HTMLKolInputTextElement>, 'style'> & StyleReactProps
>;
export const KolInputPasswordController = withController(KolInputPassword as any, '_value') as ControllerComponent<
	JSX.KolInputPassword & Omit<HTMLAttributes<HTMLKolInputPasswordElement>, 'style'> & StyleReactProps
>;
export const KolInputEmailController = withController(KolInputEmail as any, '_value') as ControllerComponent<
	JSX.KolInputEmail & Omit<HTMLAttributes<HTMLKolInputEmailElement>, 'style'> & StyleReactProps
>;
export const KolInputNumberController = withController(KolInputNumber as any, '_value') as ControllerComponent<
	JSX.KolInputNumber & Omit<HTMLAttributes<HTMLKolInputNumberElement>, 'style'> & StyleReactProps
>;
export const KolInputRangeController = withController(KolInputRange as any, '_value') as ControllerComponent<
	JSX.KolInputRange & Omit<HTMLAttributes<HTMLKolInputRangeElement>, 'style'> & StyleReactProps
>;
export const KolInputDateController = withController(KolInputDate as any, '_value') as ControllerComponent<
	JSX.KolInputDate & Omit<HTMLAttributes<HTMLKolInputDateElement>, 'style'> & StyleReactProps
>;
export const KolInputColorController = withController(KolInputColor as any, '_value') as ControllerComponent<
	JSX.KolInputColor & Omit<HTMLAttributes<HTMLKolInputColorElement>, 'style'> & StyleReactProps
>;
export const KolInputFileController = withController(KolInputFile as any, undefined as any) as ControllerComponent<
	JSX.KolInputFile & Omit<HTMLAttributes<HTMLKolInputFileElement>, 'style'> & StyleReactProps
>;
export const KolTextareaController = withController(KolTextarea as any, '_value') as ControllerComponent<
	JSX.KolTextarea & Omit<HTMLAttributes<HTMLKolTextareaElement>, 'style'> & StyleReactProps
>;
export const KolComboboxController = withController(KolCombobox as any, '_value') as ControllerComponent<
	JSX.KolCombobox & Omit<HTMLAttributes<HTMLKolComboboxElement>, 'style'> & StyleReactProps
>;
export const KolSelectController = withController(KolSelect as any, '_value') as ControllerComponent<
	JSX.KolSelect & Omit<HTMLAttributes<HTMLKolSelectElement>, 'style'> & StyleReactProps
>;
export const KolSingleSelectController = withController(KolSingleSelect as any, '_value') as ControllerComponent<
	JSX.KolSingleSelect & Omit<HTMLAttributes<HTMLKolSingleSelectElement>, 'style'> & StyleReactProps
>;
export const KolInputRadioController = withController(KolInputRadio as any, '_value') as ControllerComponent<
	JSX.KolInputRadio & Omit<HTMLAttributes<HTMLKolInputRadioElement>, 'style'> & StyleReactProps
>;
export const KolInputCheckboxController = withController(KolInputCheckbox as any, '_checked') as ControllerComponent<
	JSX.KolInputCheckbox & Omit<HTMLAttributes<HTMLKolInputCheckboxElement>, 'style'> & StyleReactProps
>;
export { withController };
