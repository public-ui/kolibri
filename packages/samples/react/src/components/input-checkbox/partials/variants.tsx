import React, { FC, useLayoutEffect, useRef } from 'react';

import { KolForm, KolInputCheckbox } from '@public-ui/react';

import { Components } from '@public-ui/components';
import { ERROR_MSG } from '../../../shares/constants';

export const InputCheckboxVariant: FC<Components.KolInputCheckbox> = ({ _variant }) => {
	const ref = useRef<HTMLKolInputCheckboxElement | null>(null);

	useLayoutEffect(() => {
		setTimeout(() => {
			ref.current?.focus();
		}, 500);
	}, [ref]);

	return (
		<KolForm>
			<fieldset>
				<legend>Checkbox ({_variant})</legend>
				<div className="grid grid-cols-2 gap-4">
					<KolInputCheckbox
						_icon={{
							unchecked: 'codicon codicon-close',
						}}
						_variant={_variant}
						_label="Nicht ausgewählt"
						_value={false}
					/>
					<KolInputCheckbox
						_hideLabel={true}
						_icon={{
							unchecked: 'codicon codicon-close',
						}}
						_variant={_variant}
						_label="Nicht ausgewählt"
						_value={false}
					/>
					<KolInputCheckbox
						_icon={{
							unchecked: 'codicon codicon-close',
						}}
						_variant={_variant}
						_label="Unbestimmt (Indeterminate)"
						_value={null}
						_indeterminate
					/>
					<KolInputCheckbox
						_hideLabel={true}
						_icon={{
							unchecked: 'codicon codicon-close',
						}}
						_variant={_variant}
						_label="Unbestimmt (Indeterminate)"
						_value={null}
						_indeterminate
					/>
					<KolInputCheckbox
						_icon={{
							unchecked: 'codicon codicon-close',
						}}
						_variant={_variant}
						_label="Ausgewählt"
						_value={true}
						_checked
					/>
					<KolInputCheckbox
						_hideLabel={true}
						_icon={{
							unchecked: 'codicon codicon-close',
						}}
						_variant={_variant}
						_label="Ausgewählt"
						_value={true}
						_checked
					/>
					<KolInputCheckbox
						_icon={{
							unchecked: 'codicon codicon-close',
						}}
						_variant={_variant}
						_label="Disabled"
						_value={true}
						_disabled
					/>
					<KolInputCheckbox
						_hideLabel={true}
						_icon={{
							unchecked: 'codicon codicon-close',
						}}
						_variant={_variant}
						_label="Disabled"
						_value={true}
						_disabled
					/>
					<KolInputCheckbox
						ref={ref}
						_icon={{
							unchecked: 'codicon codicon-close',
						}}
						_variant={_variant}
						_label="Mit Fehler"
						_value={true}
						_error={ERROR_MSG}
						_touched
					/>
					<KolInputCheckbox
						_hideLabel={true}
						_icon={{
							unchecked: 'codicon codicon-close',
						}}
						_variant={_variant}
						_label="Mit Fehler"
						_value={true}
						_error={ERROR_MSG}
						_touched
					/>
				</div>
			</fieldset>
		</KolForm>
	);
};
