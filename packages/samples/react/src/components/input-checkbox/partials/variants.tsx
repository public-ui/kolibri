import { KolInputCheckbox } from '@public-ui/react';
import React, { FC, useRef, useLayoutEffect } from 'react';
import { ERROR_MSG } from '../../../shares/constants';

type Props = {
	variant: 'checkbox' | 'switch' | 'button';
};

export const InputCheckboxVariant: FC<Props> = ({ variant }) => {
	const ref = useRef<HTMLKolInputCheckboxElement | null>(null);

	useLayoutEffect(() => {
		setTimeout(() => {
			ref.current?.focus();
		}, 500);
	}, [ref]);

	return (
		<fieldset>
			<legend>Checkbox ({variant})</legend>
			<KolInputCheckbox
				_icon={{
					unchecked: 'codicon codicon-close',
				}}
				_variant={variant}
				_label="Nicht ausgewählt"
				_value={false}
				class="block"
			/>
			<KolInputCheckbox
				_icon={{
					unchecked: 'codicon codicon-close',
				}}
				_variant={variant}
				_label="Unbestimmt (Indeterminate)"
				_value={null}
				_indeterminate
				class="block"
			/>
			<KolInputCheckbox
				_icon={{
					unchecked: 'codicon codicon-close',
				}}
				_variant={variant}
				_label="Ausgewählt"
				_value={true}
				_checked
				class="block"
			/>
			<KolInputCheckbox
				_icon={{
					unchecked: 'codicon codicon-close',
				}}
				_variant={variant}
				_label="Disabled"
				_value={true}
				_hint="Hint Hinweis Text"
				_disabled
				class="block"
			/>
			<KolInputCheckbox
				ref={ref}
				_icon={{
					unchecked: 'codicon codicon-close',
				}}
				_variant={variant}
				_label="Mit Fehler"
				_value={true}
				_error={ERROR_MSG}
				_hint="Hint Hinweis Text"
				_touched
				class="block"
			/>
		</fieldset>
	);
};
