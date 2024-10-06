import * as React from 'react';
import { FastField, type FastFieldProps, type FormikProps } from 'formik';
import { InputCheckboxControl } from '../../formik-fields';

export type InputCheckboxFormFieldProps = {
	name: string;
	label: string;
	required?: boolean;
	trueValue?: unknown;
	falseValue?: unknown;
};

function InputCheckboxFormField<T extends Record<string, unknown>, V extends boolean>(
	props: InputCheckboxFormFieldProps,
	ref: React.ForwardedRef<HTMLKolInputCheckboxElement>,
) {
	const { name, label, required, trueValue, falseValue } = props;

	return (
		<FastField name={name}>
			{({ field, form, meta: { error, touched, value } }: FastFieldProps<T>) => {
				return (
					<InputCheckboxControl
						ref={ref}
						field={field}
						form={form as FormikProps<Record<string, unknown>>}
						error={error}
						touched={touched}
						label={label}
						value={value as unknown as V}
						required={required}
						trueValue={trueValue}
						falseValue={falseValue}
					/>
				);
			}}
		</FastField>
	);
}

export default React.forwardRef(InputCheckboxFormField);
