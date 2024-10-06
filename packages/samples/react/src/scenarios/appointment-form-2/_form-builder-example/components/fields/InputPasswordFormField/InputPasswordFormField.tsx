import * as React from 'react';
import { FastField, type FastFieldProps, type FormikProps } from 'formik';
import { InputPasswordControl } from '../../formik-fields';

export type InputPasswordFormFieldProps = {
	name: string;
	label: string;
	required?: boolean;
};

function InputPasswordFormField<T extends Record<string, unknown>, V extends string>(
	props: InputPasswordFormFieldProps,
	ref: React.ForwardedRef<HTMLKolInputPasswordElement>,
) {
	const { name, label, required } = props;

	return (
		<FastField name={name}>
			{({ field, form, meta: { error, touched, value } }: FastFieldProps<T>) => {
				return (
					<InputPasswordControl
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

export default React.forwardRef(InputPasswordFormField);
