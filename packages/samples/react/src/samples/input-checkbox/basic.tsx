import React from 'react';
import { KolIcon, KolInputCheckbox, KolTooltip } from '@public-ui/react';

import { FC } from 'react';

import { ERROR_MSG } from '../../shares/constants';

export const InputCheckboxBasic: FC = () => (
	<div className="grid gap-4">
		<KolInputCheckbox _id="anrede1" _variant="button">
			<KolIcon aria-labelledby="abc" _ariaLabel="Schalter aktiv" _icon="codicon codicon-home" />
			<KolTooltip _id="abc" _label="text" />
		</KolInputCheckbox>
		<KolInputCheckbox _checked _id="anrede2" _variant="checkbox" _touched _error={ERROR_MSG}>
			Ausgewählt
		</KolInputCheckbox>
		<KolInputCheckbox _id="anrede3" _indeterminate _variant="checkbox">
			Unbestimmt (Indeterminate)
		</KolInputCheckbox>
		<KolInputCheckbox _id="anrede4" _variant="switch" _error={ERROR_MSG}>
			Nicht ausgewählt
		</KolInputCheckbox>
		<KolInputCheckbox _checked _id="anrede5" _variant="switch">
			Ausgewählt
		</KolInputCheckbox>
		<KolInputCheckbox _id="anrede6" _indeterminate _variant="switch" _touched _error={ERROR_MSG}>
			Unbestimmt (Indeterminate)
		</KolInputCheckbox>
		<KolInputCheckbox _id="anrede7" _disabled _indeterminate _variant="switch" _touched _error={ERROR_MSG}>
			Unbestimmt (Indeterminate)
		</KolInputCheckbox>
	</div>
);
