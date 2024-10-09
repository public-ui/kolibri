import * as React from 'react';
import { KolInputDate } from '@public-ui/react';
import type { InputTypeOnDefault, Iso8601 } from '@public-ui/components';
import { useFieldIdBuilder, useFieldMsgBuilder, useFormikControlEventHandler } from '../../../hooks';
import type { GenericFormikInputControlProps } from '../_types';

export type InputDateControlProps<V> = {
	label: string;
	min?: V;
	max?: V;
	required?: boolean;
};

function InputDateControl<T extends Record<string, unknown>, V extends Iso8601 | Date>(
	props: GenericFormikInputControlProps<T, V> & InputDateControlProps<V>,
	ref: React.ForwardedRef<HTMLKolInputDateElement>,
) {
	const { field, form, error, label, value: initialValue, min, max, touched, required } = props;
	const { _on, value } = useFormikControlEventHandler<T, V>({ value: initialValue, field, form });
	const { buildFieldId } = useFieldIdBuilder();
	const { buildFieldMsg } = useFieldMsgBuilder();

	return (
		<KolInputDate
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

export default React.forwardRef(InputDateControl);
