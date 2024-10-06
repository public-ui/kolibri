import * as React from 'react';
import { FastField, type FastFieldProps, type FormikProps } from 'formik';
import { ComboboxControl } from '../../formik-fields';
import { SuggestionsQueryController } from '../../data-query';
import type { SuggestionsPropType } from '@public-ui/components';

export type ComboboxFormFieldProps = {
	name: string;
	label: string;
	required?: boolean;
	queryKey?: string;
	suggestions?: SuggestionsPropType;
};

function ComboboxFormField<T extends Record<string, unknown>, V extends string>(
	props: ComboboxFormFieldProps,
	ref: React.ForwardedRef<HTMLKolComboboxElement>,
) {
	const { name, suggestions = [], queryKey = '', label, required } = props;

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
							label={label}
							value={value as unknown as V}
							required={required}
							suggestions={suggestions}
						/>
					</SuggestionsQueryController>
				);
			}}
		</FastField>
	);
}

export default React.forwardRef(ComboboxFormField);
