import * as React from 'react';
import { FastField, type FastFieldProps, type FormikProps } from 'formik';
import { TextareaControl } from '../../formik-fields';

export type TextareaFormFieldProps = {
	name: string;
	label: string;
	required?: boolean;
	rows?: number;
};

function TextareaFormField<T extends Record<string, unknown>, V extends string>(
	props: TextareaFormFieldProps,
	ref: React.ForwardedRef<HTMLKolTextareaElement>,
) {
	const { name, label, required, rows } = props;

	return (
		<FastField name={name}>
			{({ field, form, meta: { error, touched, value } }: FastFieldProps<T>) => {
				return (
					<TextareaControl
						ref={ref}
						field={field}
						form={form as FormikProps<Record<string, unknown>>}
						error={error}
						touched={touched}
						label={label}
						value={value as unknown as V}
						required={required}
						rows={rows}
					/>
				);
			}}
		</FastField>
	);
}

export default React.forwardRef(TextareaFormField);
