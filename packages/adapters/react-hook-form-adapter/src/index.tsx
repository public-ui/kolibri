import React from 'react';
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
} from '@public-ui/react';

type ControllerProps<T extends FieldValues> = Omit<UseControllerProps<T>, 'control'> & { control: NonNullable<UseControllerProps<T>['control']> };

function withController<P, T extends FieldValues>(Component: React.ComponentType<Omit<P, '_name'>>, valueProp: keyof P) {
	return (props: P & ControllerProps<T>) => {
		const { name, control, rules, defaultValue, ...rest } = props;
		return (
			<Controller
				name={name}
				control={control}
				rules={rules}
				defaultValue={defaultValue}
				render={({ field, fieldState }) => (
					<Component
						{...(rest as P)}
						{...{ [valueProp]: field.value }}
						_name={name}
						_touched={fieldState.isTouched}
						_msg={
							fieldState.error
								? {
										_type: 'error',
										_description: typeof fieldState.error === 'string' ? fieldState.error : (fieldState.error?.message ?? ''),
									}
								: undefined
						}
						_on={{
							onInput: (_e: unknown, value: unknown) => field.onChange(value),
							onChange: (_e: unknown, value: unknown) => field.onChange(value),
							onBlur: field.onBlur,
						}}
					/>
				)}
			/>
		);
	};
}

// function wrapper<T extends FieldValues>() {
// 	return
// }

export const KolInputTextController = withController(KolInputText, '_value');
export const KolInputPasswordController = withController(KolInputPassword, '_value');
export const KolInputEmailController = withController(KolInputEmail, '_value');
export const KolInputNumberController = withController(KolInputNumber, '_value');
export const KolInputRangeController = withController(KolInputRange, '_value');
export const KolInputDateController = withController(KolInputDate, '_value');
export const KolInputColorController = withController(KolInputColor, '_value');
export const KolInputFileController = withController(KolInputFile, '_value');
export const KolTextareaController = withController(KolTextarea, '_value');
export const KolComboboxController = withController(KolCombobox, '_value');
export const KolSelectController = withController(KolSelect, '_value');
export const KolSingleSelectController = withController(KolSingleSelect, '_value');
export const KolInputRadioController = withController(KolInputRadio, '_value');
export const KolInputCheckboxController = withController(KolInputCheckbox, '_checked');
export { withController };
