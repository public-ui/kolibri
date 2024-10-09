import * as React from 'react';
import { KolSelect } from '@public-ui/react';
import { type InputTypeOnDefault, type W3CInputValue } from '@public-ui/components';
import { useFieldIdBuilder, useFieldMsgBuilder } from '../../../hooks';
import type { GenericFormikInputControlProps } from '../_types';

const PleaseOption = { label: 'Please select…', value: '' };

export type NativeSelectControlProps<V> = {
	options: { value: V; label: string }[];
	label: string;
	required?: boolean;
};

function NativeSelectControl<T extends Record<string, unknown>, V extends string | number>(
	props: GenericFormikInputControlProps<T, V> & NativeSelectControlProps<V>,
	ref: React.ForwardedRef<HTMLKolSelectElement>,
) {
	const { field, form, error, options = [], label, value, touched, required } = props;

	const handleOnBlur = React.useCallback(
		(_: Event) => {
			void form.setFieldTouched(field.name, true);
		},
		[field.name],
	);

	const handleOnChange = React.useCallback(
		(event: Event, values: V[]) => {
			if (event.target) {
				const [value] = values;
				void form.setFieldValue(field.name, value, true);
			}
		},
		[field.name],
	);

	const { buildFieldId } = useFieldIdBuilder();
	const { buildFieldMsg } = useFieldMsgBuilder();

	return (
		<KolSelect
			ref={ref}
			id={buildFieldId(field.name)}
			_msg={buildFieldMsg(error || '')}
			_name={field.name}
			_touched={touched}
			_label={label}
			_value={[value as unknown as W3CInputValue]}
			_required={required}
			_options={[PleaseOption, ...options]}
			_on={
				{
					onBlur: handleOnBlur,
					onChange: handleOnChange,
				} as InputTypeOnDefault
			}
		/>
	);
}

export default React.forwardRef(NativeSelectControl);
