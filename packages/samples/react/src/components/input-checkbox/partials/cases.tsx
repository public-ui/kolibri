import React, { forwardRef } from 'react';

import { KolInputCheckbox } from '@public-ui/react';

import { Components } from '@public-ui/components';
import { ERROR_MSG } from '../../../shares/constants';

export const InputCheckboxCases = forwardRef<HTMLKolInputCheckboxElement, Components.KolInputCheckbox>(function InputCheckboxCases(props, ref) {
	return (
		<div className="grid gap-4">
			<KolInputCheckbox
				{...props}
				_icon={{
					unchecked: 'codicon codicon-close',
				}}
				_label="Nicht ausgewählt"
				_value={false}
			/>
			<KolInputCheckbox
				{...props}
				_icon={{
					unchecked: 'codicon codicon-close',
				}}
				_label="Unbestimmt (Indeterminate)"
				_value={null}
				_indeterminate
			/>
			<KolInputCheckbox
				{...props}
				ref={ref}
				_checked
				_icon={{
					unchecked: 'codicon codicon-close',
				}}
				_label="Ausgewählt"
				_tooltipAlign="right"
				_value={true}
			/>
			<KolInputCheckbox
				{...props}
				_disabled
				_icon={{
					unchecked: 'codicon codicon-close',
				}}
				_label="Disabled"
				_value={true}
			/>
			<KolInputCheckbox
				{...props}
				_error={ERROR_MSG}
				_icon={{
					unchecked: 'codicon codicon-close',
				}}
				_label="Mit Fehler"
				_touched
				_value={true}
			/>
		</div>
	);
});
