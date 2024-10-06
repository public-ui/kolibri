import * as React from 'react';
import { FastField, type FastFieldProps, type FormikProps } from 'formik';
import { InputEmailControl } from '../../formik-fields';

export type InputEmailFormFieldProps = {
	name: string;
	label: string;
	required?: boolean;
};

function InputEmailFormField<T extends Record<string, unknown>, V extends string>(
	props: InputEmailFormFieldProps,
	ref: React.ForwardedRef<HTMLKolInputEmailElement>,
) {
	const { name, label, required } = props;

	return (
		<FastField name={name}>
			{({ field, form, meta: { error, touched, value } }: FastFieldProps<T>) => {
				return (
					<InputEmailControl
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

export default React.forwardRef(InputEmailFormField);
