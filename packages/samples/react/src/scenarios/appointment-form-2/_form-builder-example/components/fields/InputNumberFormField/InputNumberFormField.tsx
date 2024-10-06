import * as React from 'react';
import { FastField, type FastFieldProps, type FormikProps } from 'formik';
import { InputNumberControl } from '../../formik-fields';

export type InputNumberFormFieldProps = {
	name: string;
	label: string;
	required?: boolean;
	min?: number;
	max?: number;
};

function InputNumberFormField<T extends Record<string, unknown>>(props: InputNumberFormFieldProps, ref: React.ForwardedRef<HTMLKolInputNumberElement>) {
	const { name, min, max, label, required } = props;

	return (
		<FastField name={name}>
			{({ field, form, meta: { error, touched, value } }: FastFieldProps<T>) => {
				return (
					<InputNumberControl
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

export default React.forwardRef(InputNumberFormField);
