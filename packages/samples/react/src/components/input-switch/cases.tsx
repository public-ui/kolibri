import React, { forwardRef } from 'react';

import { KolInputSwitch } from '@public-ui/react-v19';

import { ERROR_MSG } from '../../shares/constants';

import type { Components } from '@public-ui/components';
import { SampleBlock } from '../SampleBlock';

type InputSwitchCasesProps = Partial<Components.KolInputSwitch> & {
	/** Prefixes the visual block ids so the same cases can be rendered more than once per route. */
	blockIdPrefix: string;
};

export const InputSwitchCases = forwardRef<HTMLKolInputSwitchElement, InputSwitchCasesProps>(function InputSwitchCases({ blockIdPrefix, ...props }, ref) {
	return (
		<div className="grid gap-4">
			<SampleBlock id={`${blockIdPrefix}-unchecked`}>
				<KolInputSwitch {...props} _label="Switched off" _value={false} _required />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-checked`}>
				<KolInputSwitch {...props} ref={ref} _accessKey="A" _checked _label="Switched on" _tooltipAlign="right" _value={true} />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-long-label`}>
				<KolInputSwitch {...props} _checked _label={'With a very long label and upheavals '.repeat(5)} _value={true} />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-disabled`}>
				<KolInputSwitch {...props} _disabled _label="Disabled" _value={true} _hint="Hint text" />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-checked-disabled`}>
				<KolInputSwitch {...props} _checked _disabled _label="Switched on and disabled" />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-error`}>
				<KolInputSwitch {...props} _msg={{ _type: 'error', _description: ERROR_MSG }} _label="With error" _touched _value={true} _hint="Hint text" _required />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-short-key`}>
				<KolInputSwitch {...props} _label="With short key" _shortKey="s" _value={null}></KolInputSwitch>
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-info-popover`}>
				<KolInputSwitch
					{...props}
					_label="With popover"
					_value={false}
					_required
					_infoPopover={{ _label: 'hint', _content: 'Ich bin ein Hinweis.', _icons: 'kolicon-alert-info' }}
				>
					<span slot="expert">Expert Slot & required</span>
				</KolInputSwitch>
			</SampleBlock>
		</div>
	);
});
