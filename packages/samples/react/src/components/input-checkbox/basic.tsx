import type { FC } from 'react';
import React from 'react';

import { KolInputCheckbox } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';
import { ERROR_MSG } from '../../shares/constants';

export const InputCheckboxBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolInputCheckbox renders a checkbox. The sample shows KolInputCheckbox in a form context with all variations and states.</p>
		</SampleDescription>

		<div className="grid gap-4">
			<KolInputCheckbox _label="Not selected" _value={false} _required />
			<KolInputCheckbox _label="Indeterminate" _value={null} _indeterminate />
			<KolInputCheckbox _accessKey="A" _checked _label="Selected" _tooltipAlign="right" _value={true} />
			<KolInputCheckbox _checked _icons={{ unchecked: 'codicon codicon-close' }} _label={'With a very long label and upheavals '.repeat(5)} _value={true} />
			<KolInputCheckbox _disabled _label="Disabled" _value={true} _hint="Hint text" />
			<KolInputCheckbox _checked _disabled _label="Checked and disabled" />
			<KolInputCheckbox _indeterminate _disabled _label="Indeterminate and disabled" />
			<KolInputCheckbox _msg={{ _type: 'error', _description: ERROR_MSG }} _label="With error" _touched _value={true} _hint="Hint text" />
			<KolInputCheckbox _label="With access key" _accessKey="c" _value={null}></KolInputCheckbox>
			<KolInputCheckbox _label="With short key" _shortKey="s" _value={null}></KolInputCheckbox>
		</div>
	</>
);
