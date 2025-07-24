import type { FC } from 'react';
import React from 'react';

import { KolInputCheckbox } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';
import { ERROR_MSG } from '../../shares/constants';

export const InputCheckboxAlignLeft: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows KolInputCheckbox with label alignment on the left.</p>
		</SampleDescription>

		<div className="grid gap-4">
			<KolInputCheckbox _labelAlign="left" _label="Not selected" _value={false} _required />
			<KolInputCheckbox _labelAlign="left" _label="Indeterminate" _value={null} _indeterminate />
			<KolInputCheckbox _labelAlign="left" _accessKey="A" _checked _label="Selected" _tooltipAlign="right" _value={true} />
			<KolInputCheckbox
				_labelAlign="left"
				_checked
				_icons={{ unchecked: 'codicon codicon-close' }}
				_label={'With a very long label and upheavals '.repeat(5)}
				_value={true}
			/>
			<KolInputCheckbox _labelAlign="left" _disabled _label="Disabled" _value={true} _hint="Hint text" />
			<KolInputCheckbox _labelAlign="left" _checked _disabled _label="Checked and disabled" />
			<KolInputCheckbox _labelAlign="left" _indeterminate _disabled _label="Indeterminate and disabled" />
			<KolInputCheckbox _labelAlign="left" _msg={{ _type: 'error', _description: ERROR_MSG }} _label="With error" _touched _value={true} _hint="Hint text" />
			<KolInputCheckbox _labelAlign="left" _label="With access key" _accessKey="c" _value={null}></KolInputCheckbox>
			<KolInputCheckbox _labelAlign="left" _label="With short key" _shortKey="s" _value={null}></KolInputCheckbox>
		</div>
	</>
);
