import * as React from 'react';
import { FastField, type FastFieldProps, type FormikProps } from 'formik';
import { SelectControl, type SelectControlProps } from '../../formik-fields';
import { OptionQueryController } from '../../data-query';
import type { CoreFormFieldProps } from '../_types';
import { useCompleteFormikNameBuilder } from '../../../providers/FormikNamespaceProvider';

export type SelectFormFieldProps<V extends string> = SelectControlProps<V> &
	CoreFormFieldProps & {
		queryKey?: string;
	};

function SelectFormField<T extends Record<string, unknown>, V extends string>(
	props: SelectFormFieldProps<V>,
	ref: React.ForwardedRef<HTMLKolSingleSelectElement>,
) {
	const { name: initialName, queryKey = '', ...other } = props;
	const name = useCompleteFormikNameBuilder(initialName);

	return (
		<FastField name={name}>
			{({ field, form, meta: { error, touched, value } }: FastFieldProps<T>) => {
				return (
					<OptionQueryController queryKey={queryKey}>
						<SelectControl
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

export default React.forwardRef(SelectFormField);
