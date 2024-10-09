import * as React from 'react';
import { KolInputNumber } from '@public-ui/react';
import type { InputTypeOnDefault } from '@public-ui/components';
import { useFieldIdBuilder, useFieldMsgBuilder, useFormikControlEventHandler } from '../../../hooks';
import type { GenericFormikInputControlProps } from '../_types';

export type InputNumberControlProps<V> = {
	label: string;
	min?: V;
	max?: V;
	required?: boolean;
};

function InputNumberControl<T extends Record<string, unknown>, V extends number>(
	props: GenericFormikInputControlProps<T, V> & InputNumberControlProps<V>,
	ref: React.ForwardedRef<HTMLKolInputNumberElement>,
) {
	const { field, form, error, label, value: initialValue, min, max, touched, required } = props;
	const { _on, value } = useFormikControlEventHandler<T, V>({ value: initialValue, field, form });
	const { buildFieldId } = useFieldIdBuilder();
	const { buildFieldMsg } = useFieldMsgBuilder();

	return (
		<KolInputNumber
			ref={ref}
			id={buildFieldId(field.name)}
			_msg={buildFieldMsg(error || '')}
			_name={field.name}
			_touched={touched}
			_label={label}
			_value={value}
			_min={min}
			_max={max}
			_required={required}
			_on={_on as InputTypeOnDefault}
		/>
	);
}

export default React.forwardRef(InputNumberControl);
