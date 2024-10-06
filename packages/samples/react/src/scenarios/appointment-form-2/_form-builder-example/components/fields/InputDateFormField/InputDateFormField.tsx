import * as React from 'react';
import type { Iso8601 } from '@public-ui/components';
import { FastField, type FormikProps, type FastFieldProps } from 'formik';
import { InputDateControl } from '../../formik-fields';

export type InputDateFormFieldProps = {
	name: string;
	label: string;
	required?: boolean;
	min?: Iso8601 | Date;
	max?: Iso8601 | Date;
};

function InputDateFormField<T extends Record<string, unknown>, V extends Iso8601 | Date>(
	props: InputDateFormFieldProps,
	ref: React.ForwardedRef<HTMLKolInputDateElement>,
) {
	const { name, label, required } = props;

	return (
		<FastField name={name}>
			{({ field, form, meta: { error, touched, value } }: FastFieldProps<T>) => {
				return (
					<InputDateControl
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

export default React.forwardRef(InputDateFormField);
