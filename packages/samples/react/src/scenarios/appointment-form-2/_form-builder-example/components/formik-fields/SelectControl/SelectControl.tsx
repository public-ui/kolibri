import * as React from 'react';
import { KolSingleSelect } from '@public-ui/react';
import type { InputTypeOnDefault } from '@public-ui/components';
import { useFieldIdBuilder, useFieldMsgBuilder, useFormikControlEventHandler } from '../../../hooks';
import type { GenericFormikInputControlProps } from '../_types';

const PleaseOption = { label: 'Please select…', value: '' };

export type SelectControlProps<V> = {
	options: { value: V; label: string }[];
	label: string;
	required?: boolean;
};

function SelectControl<T extends Record<string, unknown>, V extends string>(
	props: GenericFormikInputControlProps<T, V> & SelectControlProps<V>,
	ref: React.ForwardedRef<HTMLKolSingleSelectElement>,
) {
	const { field, form, error, options = [], label, value: initialValue, touched, required } = props;
	const { _on, value } = useFormikControlEventHandler<T, V>({ value: initialValue, field, form });
	const { buildFieldId } = useFieldIdBuilder();
	const { buildFieldMsg } = useFieldMsgBuilder();

	return (
		<KolSingleSelect
			ref={ref}
			id={buildFieldId(field.name)}
			_msg={buildFieldMsg(error || '')}
			_name={field.name}
			_touched={touched}
			_label={label}
			_value={value}
			_required={required}
			_options={[PleaseOption, ...options]}
			_on={_on as InputTypeOnDefault}
		/>
	);
}

export default React.forwardRef(SelectControl);
