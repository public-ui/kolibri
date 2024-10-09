import * as React from 'react';
import { FastField, type FastFieldProps, type FormikProps } from 'formik';
import { NativeSelectControl, type NativeSelectControlProps } from '../../formik-fields';
import { OptionQueryController } from '../../data-query';
import type { CoreFormFieldProps } from '../_types';
import { useCompleteFormikNameBuilder } from '../../../providers/FormikNamespaceProvider';

export type NativeSelectFormFieldProps<V extends string | number> = NativeSelectControlProps<V> &
	CoreFormFieldProps & {
		queryKey?: string;
	};

function NativeSelectFormField<T extends Record<string, unknown>, V extends string | number>(
	props: NativeSelectFormFieldProps<V>,
	ref: React.ForwardedRef<HTMLKolSelectElement>,
) {
	const { name: initialName, queryKey = '', ...other } = props;
	const name = useCompleteFormikNameBuilder(initialName);

	return (
		<FastField name={name}>
			{({ field, form, meta: { error, touched, value } }: FastFieldProps<T>) => {
				return (
					<OptionQueryController queryKey={queryKey}>
						<NativeSelectControl
							ref={ref}
							field={field}
							form={form as FormikProps<Record<string, unknown>>}
							error={error}
							touched={touched}
							value={value as unknown as V}
							{...other}
						/>
					</OptionQueryController>
				);
			}}
		</FastField>
	);
}

export default React.forwardRef(NativeSelectFormField);
