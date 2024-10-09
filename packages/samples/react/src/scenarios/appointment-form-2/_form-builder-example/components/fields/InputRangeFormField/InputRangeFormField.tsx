import * as React from 'react';
import { FastField, type FastFieldProps, type FormikProps } from 'formik';
import { InputRangeControl, type InputRangeControlProps } from '../../formik-fields';
import type { CoreFormFieldProps } from '../_types';
import { useCompleteFormikNameBuilder } from '../../../providers/FormikNamespaceProvider';

export type InputRangeFormFieldProps<V> = InputRangeControlProps<V> & CoreFormFieldProps;

function InputRangeFormField<T extends Record<string, unknown>, V extends number>(
	props: InputRangeFormFieldProps<V>,
	ref: React.ForwardedRef<HTMLKolInputRangeElement>,
) {
	const { name: initialName, ...other } = props;
	const name = useCompleteFormikNameBuilder(initialName);

	return (
		<FastField name={name}>
			{({ field, form, meta: { error, touched, value } }: FastFieldProps<T>) => {
				return (
					<InputRangeControl
						ref={ref}
						field={field}
						form={form as FormikProps<Record<string, unknown>>}
						error={error}
						touched={touched}
						value={value as unknown as number}
						{...other}
					/>
				);
			}}
		</FastField>
	);
}

export default React.forwardRef(InputRangeFormField);
