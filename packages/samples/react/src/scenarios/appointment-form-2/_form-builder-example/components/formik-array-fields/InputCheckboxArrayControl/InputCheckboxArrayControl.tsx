import * as React from 'react';
import { type FieldInputProps, type FormikProps } from 'formik';
import { KolInputCheckbox } from '@public-ui/react';
import { type InputTypeOnDefault } from '@public-ui/components';

export type InputCheckboxArrayControlProps<T> = {
	field: FieldInputProps<T>;
	form: FormikProps<T>;
	error?: string;
	label: string;
	value: string[];
	touched?: boolean;
	required?: boolean;
	options?: ({ value: string; label: string } | string)[];
	orientation?: 'horizontal' | 'vertical';
	emtpyValue?: unknown;
};

export type InternaInputCheckboxArrayControlProps = {
	isPending?: boolean;
};

function InputCheckboxArrayControl<T extends Record<string, unknown>>(
	props: InputCheckboxArrayControlProps<T> & InternaInputCheckboxArrayControlProps,
	ref: React.ForwardedRef<HTMLDivElement>,
) {
	const { field, form, /* label, */ options, value, emtpyValue = [] } = props;

	const handleOnBlur = React.useCallback(() => {
		void form.setFieldTouched(field.name, true);
	}, [field.name]);

	const handleOnChange = React.useCallback(
		(event: Event) => {
			if (event.target) {
				const { checked, name } = event.target as { checked?: boolean; name?: string };
				if (!name) {
					return;
				}

				if (checked) {
					form.setFieldValue(field.name, [...(value || []), name], true);
				} else {
					let nextArray = value.filter((v) => v !== name) as unknown;
					if (!(nextArray as string[]).length) {
						nextArray = emtpyValue;
					}

					form.setFieldValue(field.name, nextArray, true);
				}
			}
		},
		[field.name, value],
	);

	return (
		<div ref={ref} onBlur={handleOnBlur}>
			{options?.map((option) => {
				const optionIsString = typeof option === 'string';
				const name = optionIsString ? option : option.value;
				const label = optionIsString ? option : option.label;

				return (
					<KolInputCheckbox
						key={name}
						_name={name}
						_label={label}
						_checked={value?.includes?.(name) || false}
						_on={
							{
								onChange: handleOnChange,
							} as InputTypeOnDefault
						}
					/>
				);
			})}
		</div>
	);
}

export default React.forwardRef(InputCheckboxArrayControl);
