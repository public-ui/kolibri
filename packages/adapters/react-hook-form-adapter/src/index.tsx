import React from 'react';
import { Controller } from 'react-hook-form';
import type { FieldValues, UseControllerProps } from 'src/react-hook-form';
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

function withController<P extends Record<string, unknown>, T extends FieldValues = FieldValues>(Component: React.ComponentType<P>, valueProp = '_value') {
	return (props: P & ControllerProps<T>) => {
		const { _name, control, rules, defaultValue, ...rest } = props;
		return (
			<Controller
				name={_name}
				control={control}
				rules={rules}
				defaultValue={defaultValue}
				render={({ field, fieldState }) => (
					<Component
						{...(rest as P)}
						{...{ [valueProp]: field.value }}
						_touched={fieldState.isTouched}
						_msg={
							fieldState.error
								? {
										_type: 'error',
										_description: typeof fieldState.error === 'string' ? fieldState.error : ((fieldState.error as any).message ?? ''),
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

export const KolInputTextController = withController(KolInputText);
export const KolInputPasswordController = withController(KolInputPassword);
export const KolInputEmailController = withController(KolInputEmail);
export const KolInputNumberController = withController(KolInputNumber);
export const KolInputRangeController = withController(KolInputRange);
export const KolInputDateController = withController(KolInputDate);
export const KolInputColorController = withController(KolInputColor);
export const KolInputFileController = withController(KolInputFile);
export const KolTextareaController = withController(KolTextarea);
export const KolComboboxController = withController(KolCombobox);
export const KolSelectController = withController(KolSelect);
export const KolSingleSelectController = withController(KolSingleSelect);
export const KolInputRadioController = withController(KolInputRadio);
export const KolInputCheckboxController = withController(KolInputCheckbox, '_checked');
export { withController };
