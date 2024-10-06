import * as React from 'react';
import { FastField, type FastFieldProps, type FormikProps } from 'formik';
import { InputColorControl } from '../../formik-fields';

export type InputColorFormFieldProps = {
	name: string;
	label: string;
	required?: boolean;
};

function InputColorFormField<T extends Record<string, unknown>, V extends string>(
	props: InputColorFormFieldProps,
	ref: React.ForwardedRef<HTMLKolInputColorElement>,
) {
	const { name, label, required } = props;

	return (
		<FastField name={name}>
			{({ field, form, meta: { error, touched, value } }: FastFieldProps<T>) => {
				return (
					<InputColorControl
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

export default React.forwardRef(InputColorFormField);
