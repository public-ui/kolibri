import * as React from 'react';
import { FastField, type FastFieldProps, type FormikProps } from 'formik';
import { InputTextControl } from '../../formik-fields';

export type InputTextFormFieldProps = {
	name: string;
	label: string;
	required?: boolean;
};

function InputTextFormField<T extends Record<string, unknown>, V extends string>(
	props: InputTextFormFieldProps,
	ref: React.ForwardedRef<HTMLKolInputTextElement>,
) {
	const { name, label, required } = props;

	return (
		<FastField name={name}>
			{({ field, form, meta: { error, touched, value } }: FastFieldProps<T>) => {
				return (
					<InputTextControl
						ref={ref}
						field={field}
						form={form as FormikProps<Record<string, unknown>>}
						error={error}
						touched={touched}
						label={label}
						value={value as unknown as V}
						required={required}
					/>
				);
			}}
		</FastField>
	);
}

export default React.forwardRef(InputTextFormField);
