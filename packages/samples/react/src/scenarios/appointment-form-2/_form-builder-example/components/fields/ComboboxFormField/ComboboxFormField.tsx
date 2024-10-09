import * as React from 'react';
import { FastField, type FastFieldProps, type FormikProps } from 'formik';
import { ComboboxControl, type ComboboxControlProps } from '../../formik-fields';
import { SuggestionsQueryController } from '../../data-query';
import type { CoreFormFieldProps } from '../_types';
import { useCompleteFormikNameBuilder } from '../../../providers/FormikNamespaceProvider';

export type ComboboxFormFieldProps = ComboboxControlProps &
	CoreFormFieldProps & {
		queryKey?: string;
	};

function ComboboxFormField<T extends Record<string, unknown>, V extends string>(
	props: ComboboxFormFieldProps,
	ref: React.ForwardedRef<HTMLKolComboboxElement>,
) {
	const { name: initialName, queryKey = '', ...other } = props;
	const name = useCompleteFormikNameBuilder(initialName);

	return (
		<FastField name={name}>
			{({ field, form, meta: { error, touched, value } }: FastFieldProps<T>) => {
				return (
					<SuggestionsQueryController queryKey={queryKey}>
						<ComboboxControl
							ref={ref}
							field={field}
							form={form as FormikProps<Record<string, unknown>>}
							error={error}
							touched={touched}
							value={value as unknown as V}
							{...other}
						/>
					</SuggestionsQueryController>
				);
			}}
		</FastField>
	);
}

export default React.forwardRef(ComboboxFormField);
