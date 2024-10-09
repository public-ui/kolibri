import * as React from 'react';
import { KolInputRadio, KolSpin } from '@public-ui/react';
import { type Orientation, type InputTypeOnDefault } from '@public-ui/components';
import { useFieldIdBuilder, useFieldMsgBuilder, useFormikControlEventHandler } from '../../../hooks';
import type { GenericFormikInputControlProps } from '../_types';

export type RadioSelectControlProps<V> = {
	options: { value: V; label: string }[];
	label: string;
	required?: boolean;
	orientation?: Orientation;
};

type InternRadioSelectControlProps = {
	isPending?: boolean;
};

function RadioSelectControl<T extends Record<string, unknown>, V extends string | number>(
	props: GenericFormikInputControlProps<T, V> & RadioSelectControlProps<V> & InternRadioSelectControlProps,
	ref: React.ForwardedRef<HTMLKolInputRadioElement>,
) {
	const { isPending = false, field, form, error, orientation, options = [], label, value: initialValue, touched, required } = props;
	const { _on, value } = useFormikControlEventHandler<T, V>({ value: initialValue, field, form });
	const { buildFieldId } = useFieldIdBuilder();
	const { buildFieldMsg } = useFieldMsgBuilder();

	return (
		<>
			{!!isPending && <KolSpin _show className="block" aria-label="Dates are loaded." _variant="cycle" />}
			<KolInputRadio
				ref={ref}
				id={buildFieldId(field.name)}
				_msg={buildFieldMsg(error || '')}
				_name={field.name}
				_touched={touched}
				_label={label}
				_value={value}
				_required={required}
				_options={[...options]}
				_orientation={orientation}
				_on={_on as unknown as InputTypeOnDefault}
			/>
		</>
	);
}

export default React.forwardRef(RadioSelectControl);
