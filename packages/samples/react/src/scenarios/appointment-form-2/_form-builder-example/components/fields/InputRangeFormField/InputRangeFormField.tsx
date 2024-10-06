import * as React from 'react';
import { FastField, type FastFieldProps, type FormikProps } from 'formik';
import { InputRangeControl } from '../../formik-fields';

export type InputRangeFormFieldProps = {
	name: string;
	label: string;
	required?: boolean;
	min?: number;
	max?: number;
};

function InputRangeFormField<T extends Record<string, unknown>>(props: InputRangeFormFieldProps, ref: React.ForwardedRef<HTMLKolInputRangeElement>) {
	const { name, label, min, max, required } = props;

	return (
		<FastField name={name}>
			{({ field, form, meta: { error, touched, value } }: FastFieldProps<T>) => {
				return (
					<InputRangeControl
						ref={ref}
						field={field}
						form={form as FormikProps<Record<string, unknown>>}
						error={error}
						touched={touched}
						label={label}
						value={value as unknown as number}
						min={min}
						max={max}
						required={required}
					/>
				);
			}}
		</FastField>
	);
}

export default React.forwardRef(InputRangeFormField);
