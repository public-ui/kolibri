import * as React from 'react';
import { KolInputRange } from '@public-ui/react';
import type { InputTypeOnDefault } from '@public-ui/components';
import { useFieldIdBuilder, useFieldMsgBuilder, useFormikControlEventHandler } from '../../../hooks';
import type { GenericFormikInputControlProps } from '../_types';

export type InputRangeControlProps<V> = {
	label: string;
	min?: V;
	max?: V;
	required?: boolean;
};

function InputRangeControl<T extends Record<string, unknown>, V extends number>(
	props: GenericFormikInputControlProps<T, V> & InputRangeControlProps<V>,
	ref: React.ForwardedRef<HTMLKolInputRangeElement>,
) {
	const { field, form, error, label, value: initialValue, min, max, touched /*, required */ } = props;
	const { _on, value } = useFormikControlEventHandler<T, number>({ value: initialValue, field, form });
	const { buildFieldId } = useFieldIdBuilder();
	const { buildFieldMsg } = useFieldMsgBuilder();

	return (
		<KolInputRange
			ref={ref}
			id={buildFieldId(field.name)}
			_msg={buildFieldMsg(error || '')}
			_name={field.name}
			_touched={touched}
			_label={label}
			_value={value as unknown as number}
			_min={min}
			_max={max}
			_on={_on as InputTypeOnDefault}
		/>
	);
}

export default React.forwardRef(InputRangeControl);
