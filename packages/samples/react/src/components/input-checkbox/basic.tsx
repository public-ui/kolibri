import React from 'react';
import { KolInputCheckbox } from '@public-ui/react';

import { FC } from 'react';

import { ERROR_MSG } from '../../shares/constants';

export const InputCheckboxBasic: FC = () => (
	<>
		<fieldset>
			<legend>Checkbox</legend>
			<KolInputCheckbox _variant="checkbox" _label="Nicht ausgewählt" _value={false} />
			<KolInputCheckbox _variant="checkbox" _label="Unbestimmt (Indeterminate)" _value={null} _indeterminate />
			<KolInputCheckbox _variant="checkbox" _label="Ausgewählt" _value={true} _checked />
			<KolInputCheckbox _variant="checkbox" _label="Disabled" _value={true} _disabled />
			<KolInputCheckbox _variant="checkbox" _label="Mit Fehler" _value={true} _error={ERROR_MSG} _touched />
		</fieldset>

		<fieldset>
			<legend>Switch</legend>
			<KolInputCheckbox _variant="switch" _label="Nicht ausgewählt" _value={false} />
			<KolInputCheckbox _variant="switch" _label="Unbestimmt (Indeterminate)" _value={null} _indeterminate />
			<KolInputCheckbox _variant="switch" _label="Ausgewählt" _value={true} _checked />
			<KolInputCheckbox _variant="switch" _label="Disabled" _value={true} _disabled />
			<KolInputCheckbox _variant="switch" _label="Mit Fehler" _value={true} _error={ERROR_MSG} _touched />
		</fieldset>

		<fieldset>
			<legend>Button</legend>
			<KolInputCheckbox _variant="button" _label="Nicht ausgewählt" _value={false} />
			<KolInputCheckbox _variant="button" _label="Unbestimmt (Indeterminate)" _value={null} _indeterminate />
			<KolInputCheckbox _variant="button" _label="Ausgewählt" _value={true} _checked />
			<KolInputCheckbox _variant="button" _label="Disabled" _value={true} _disabled />
			<KolInputCheckbox _variant="button" _label="Mit Fehler" _value={true} _error={ERROR_MSG} _touched />
		</fieldset>
	</>
);
