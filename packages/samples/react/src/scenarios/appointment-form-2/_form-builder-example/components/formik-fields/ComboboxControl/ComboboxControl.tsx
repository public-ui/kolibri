import * as React from 'react';
import type { FieldInputProps, FormikProps } from 'formik';
import { KolCombobox } from '@public-ui/react';
import type { InputTypeOnDefault, SuggestionsPropType } from '@public-ui/components';
import { useFieldIdBuilder, useFieldMsgBuilder, useFormikControlEventHandler } from '../../../hooks';

export type ComboboxControlProps<T, V> = {
	field: FieldInputProps<T>;
	form: FormikProps<T>;
	error?: string;
	suggestions?: SuggestionsPropType;
	label: string;
	value: V;
	touched: boolean;
	required?: boolean;
};

function ComboboxControl<T extends Record<string, unknown>, V extends string>(
	{ field, form, error, suggestions = [], label, value: initialValue, touched, required }: ComboboxControlProps<T, V>,
	ref: React.ForwardedRef<HTMLKolComboboxElement>,
) {
	const { _on, value } = useFormikControlEventHandler<T, V>({ value: initialValue, field, form });
	const { buildFieldId } = useFieldIdBuilder();
	const { buildFieldMsg } = useFieldMsgBuilder();

	return (
		<KolCombobox
			ref={ref}
			id={buildFieldId(field.name)}
			_msg={buildFieldMsg(error || '')}
			_name={field.name}
			_touched={touched}
			_label={label}
			_value={value}
			_required={required}
			_suggestions={[...suggestions]}
			_on={_on as InputTypeOnDefault}
		/>
	);
}

export default React.forwardRef(ComboboxControl);
