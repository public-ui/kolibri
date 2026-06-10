import {
	KolCombobox,
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
	KolTextarea,
} from '@public-ui/react-v19';
import React, { RefAttributes } from 'react';
import { Control, Controller } from 'react-hook-form';

// Import API types from components - these are used in generated .d.ts files
import type {
	ComboboxAPI,
	InputCheckboxAPI,
	InputColorAPI,
	InputDateAPI,
	InputEmailAPI,
	InputFileAPI,
	InputNumberAPI,
	InputPasswordAPI,
	InputRadioAPI,
	InputRangeAPI,
	InputTextAPI,
	SelectAPI,
	SingleSelectAPI,
	TextareaAPI,
} from '@public-ui/components/dist/types/schema/index';

// Export API types for convenience
export type {
	ComboboxAPI,
	InputCheckboxAPI,
	InputColorAPI,
	InputDateAPI,
	InputEmailAPI,
	InputFileAPI,
	InputNumberAPI,
	InputPasswordAPI,
	InputRadioAPI,
	InputRangeAPI,
	InputTextAPI,
	SelectAPI,
	SingleSelectAPI,
	TextareaAPI,
};

type KolEventHandlers = {
	onInput?: (event: any, value: any) => void;
	onChange?: (event: any, value: any) => void;
	onBlur?: (event: any) => void;
};

// Use generic constraint that makes control compatible with any field values
type ControllerBaseProps<TControl = Control<any>> = {
	name: string;
	control: TControl;
	rules?: any;
	defaultValue?: any;
	shouldUnregister?: boolean;
	disabled?: boolean;
};

// Extract component props from React component type
type ExtractProps<T> = T extends React.ComponentType<infer P> ? P : T extends React.ForwardRefExoticComponent<infer P> ? P : never;

// Controller component type
type ControllerComponent<P> = React.ForwardRefExoticComponent<P & ControllerBaseProps<any> & RefAttributes<HTMLElement>>;

function withController<T extends React.ComponentType<any>>(Component: T, valueProp?: string): ControllerComponent<ExtractProps<T>> {
	const ControllerWrapper = React.forwardRef<HTMLElement, ExtractProps<T> & ControllerBaseProps<any>>((props, ref) => {
		const { name, control, rules, defaultValue, shouldUnregister, ...componentProps } = props;

		return (
			<Controller
				name={name}
				control={control}
				rules={rules}
				defaultValue={defaultValue}
				shouldUnregister={shouldUnregister}
				disabled={props._disabled}
				render={({ field, fieldState }) => {
					const userHandlers = (componentProps as any)._on as KolEventHandlers | undefined;

					const mergedProps = {
						...componentProps,
						ref: (element: HTMLElement | null) => {
							if (ref) {
								if (typeof ref === 'function') ref(element);
								else ref.current = element;
							}
							if (element) field.ref(element);
						},
						_name: name,
						_touched: fieldState.isTouched,
						_disabled: field.disabled, // https://react-hook-form.com/docs/useform#disabled
						_msg: fieldState.error
							? {
									_type: 'error' as const,
									_description: fieldState.error.message || (fieldState.error as any).toString?.() || 'Unknown error',
								}
							: undefined,
						_on: {
							...(userHandlers || {}),
							onInput: (event: any, value: any) => {
								field.onChange(value);
								userHandlers?.onInput?.(event, value);
							},
							onChange: (event: any, value: any) => {
								field.onChange(value);
								userHandlers?.onChange?.(event, value);
							},
							onBlur: (event: any) => {
								field.onBlur();
								userHandlers?.onBlur?.(event);
							},
						},
					};

					// Set value property if specified
					if (valueProp) {
						(mergedProps as any)[valueProp] = field.value;
					}

					return <Component {...(mergedProps as any)} />;
				}}
			/>
		);
	});

	ControllerWrapper.displayName = `withController(${Component.displayName || Component.name || 'Component'})`;

	return ControllerWrapper as any;
}

export const KolInputTextController = withController(KolInputText, '_value');
export const KolInputPasswordController = withController(KolInputPassword, '_value');
export const KolInputEmailController = withController(KolInputEmail, '_value');
export const KolInputNumberController = withController(KolInputNumber, '_value');
export const KolInputRangeController = withController(KolInputRange, '_value');
export const KolInputDateController = withController(KolInputDate, '_value');
export const KolInputColorController = withController(KolInputColor, '_value');
export const KolInputFileController = withController(KolInputFile);
export const KolTextareaController = withController(KolTextarea, '_value');
export const KolComboboxController = withController(KolCombobox, '_value');
export const KolSelectController = withController(KolSelect, '_value');
export const KolSingleSelectController = withController(KolSingleSelect, '_value');
export const KolInputRadioController = withController(KolInputRadio, '_value');
export const KolInputCheckboxController = withController(KolInputCheckbox, '_checked');
