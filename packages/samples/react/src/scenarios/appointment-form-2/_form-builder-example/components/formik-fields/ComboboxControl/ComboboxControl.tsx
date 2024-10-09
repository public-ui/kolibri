import * as React from 'react';
import { KolCombobox } from '@public-ui/react';
import type { InputTypeOnDefault, SuggestionsPropType } from '@public-ui/components';
import { useFieldIdBuilder, useFieldMsgBuilder, useFormikControlEventHandler } from '../../../hooks';
import type { GenericFormikInputControlProps } from '../_types';

export type ComboboxControlProps = {
	suggestions?: SuggestionsPropType;
	label: string;
	required?: boolean;
};

function ComboboxControl<T extends Record<string, unknown>, V extends string>(
	props: GenericFormikInputControlProps<T, V> & ComboboxControlProps,
	ref: React.ForwardedRef<HTMLKolComboboxElement>,
) {
	const { field, form, error, suggestions = [], label, value: initialValue, touched, required } = props;
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
