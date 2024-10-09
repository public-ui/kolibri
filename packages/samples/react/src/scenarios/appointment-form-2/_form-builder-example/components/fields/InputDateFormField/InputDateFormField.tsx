import * as React from 'react';
import type { Iso8601 } from '@public-ui/components';
import { FastField, type FormikProps, type FastFieldProps } from 'formik';
import { InputDateControl, type InputDateControlProps } from '../../formik-fields';
import type { CoreFormFieldProps } from '../_types';
import { useCompleteFormikNameBuilder } from '../../../providers/FormikNamespaceProvider';

export type InputDateFormFieldProps<V> = InputDateControlProps<V> & CoreFormFieldProps;

function InputDateFormField<T extends Record<string, unknown>, V extends Iso8601 | Date>(
	props: InputDateFormFieldProps<V>,
	ref: React.ForwardedRef<HTMLKolInputDateElement>,
) {
	const { name: initialName, ...other } = props;
	const name = useCompleteFormikNameBuilder(initialName);

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
						value={value as unknown as V}
						{...other}
					/>
				);
			}}
		</FastField>
	);
}

export default React.forwardRef(InputDateFormField);
