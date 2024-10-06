import * as React from 'react';
import { FastField, type FastFieldProps, type FormikProps } from 'formik';
import { InputFileControl } from '../../formik-fields';

export type InputFileFormFieldProps = {
	name: string;
	label: string;
	required?: boolean;
};

function InputFileFormField<T extends Record<string, unknown>, V extends FileList>(
	props: InputFileFormFieldProps,
	ref: React.ForwardedRef<HTMLKolInputFileElement>,
) {
	const { name, label, required } = props;

	return (
		<FastField name={name}>
			{({ field, form, meta: { error, touched, value } }: FastFieldProps<T>) => {
				return (
					<InputFileControl
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

export default React.forwardRef(InputFileFormField);
