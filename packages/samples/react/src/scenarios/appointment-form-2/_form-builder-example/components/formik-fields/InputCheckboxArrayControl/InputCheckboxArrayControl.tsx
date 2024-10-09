import * as React from 'react';
import { KolInputCheckbox } from '@public-ui/react';
import type { InputTypeOnDefault, Orientation } from '@public-ui/components';
import type { GenericFormikInputControlProps } from '../_types';
import { Fieldset } from '../../core';

type InternaInputCheckboxArrayControlProps = {
	isPending?: boolean;
};

export type InputCheckboxArrayControlProps = {
	label: string;
	required?: boolean;
	options?: ({ value: string; label: string } | string)[];
	orientation?: Orientation;
	emptyValue?: unknown;
};

function InputCheckboxArrayControl<T extends Record<string, unknown>, V extends string[]>(
	props: GenericFormikInputControlProps<T, V> & InputCheckboxArrayControlProps & InternaInputCheckboxArrayControlProps,
	ref: React.ForwardedRef<HTMLFieldSetElement>,
) {
	const { field, form, label, options, value, emptyValue = [] } = props;

	const handleOnBlur = React.useCallback(() => {
		void form.setFieldTouched(field.name, true);
	}, [field.name]);

	const handleOnChange = React.useCallback(
		(event: Event) => {
			if (event.target) {
				const { checked, name } = event.target as { checked?: boolean; name?: string };
				if (!name) {
					return;
				}

				if (checked) {
					form.setFieldValue(field.name, [...(value || []), name], true);
				} else {
					let nextArray = value.filter((v) => v !== name) as unknown;
					if (!(nextArray as string[]).length) {
						nextArray = emptyValue;
					}

					form.setFieldValue(field.name, nextArray, true);
				}
			}
		},
		[field.name, value],
	);

	return (
		<Fieldset ref={ref} label={label} onBlur={handleOnBlur}>
			{options?.map((option) => {
				const optionIsString = typeof option === 'string';
				const name = optionIsString ? option : option.value;
				const label = optionIsString ? option : option.label;

				return (
					<KolInputCheckbox
						key={name}
						_name={name}
						_label={label}
						_checked={value?.includes?.(name) || false}
						_on={
							{
								onChange: handleOnChange,
							} as InputTypeOnDefault
						}
					/>
				);
			})}
		</Fieldset>
	);
}

export default React.forwardRef(InputCheckboxArrayControl);
