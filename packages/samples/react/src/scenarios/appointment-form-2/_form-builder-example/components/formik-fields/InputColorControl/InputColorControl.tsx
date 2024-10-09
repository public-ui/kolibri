import * as React from 'react';
import { KolInputColor } from '@public-ui/react';
import type { InputTypeOnDefault } from '@public-ui/components';
import { useFieldIdBuilder, useFieldMsgBuilder, useFormikControlEventHandler } from '../../../hooks';
import type { GenericFormikInputControlProps } from '../_types';

export type InputColorControlProps = {
	label: string;
	required?: boolean;
};

function InputColorControl<T extends Record<string, unknown>, V extends string>(
	props: GenericFormikInputControlProps<T, V> & InputColorControlProps,
	ref: React.ForwardedRef<HTMLKolInputColorElement>,
) {
	const { field, form, error, label, value: initialValue, touched /*, required */ } = props;
	const { _on, value } = useFormikControlEventHandler<T, V>({ value: initialValue, field, form });
	const { buildFieldId } = useFieldIdBuilder();
	const { buildFieldMsg } = useFieldMsgBuilder();

	return (
		<KolInputColor
			ref={ref}
			id={buildFieldId(field.name)}
			_msg={buildFieldMsg(error || '')}
			_name={field.name}
			_touched={touched}
			_label={label}
			_value={value}
			_on={_on as InputTypeOnDefault}
		/>
	);
}

export default React.forwardRef(InputColorControl);
