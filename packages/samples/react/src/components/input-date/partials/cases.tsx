import type { Components } from '@public-ui/components';
import { KolInputDate } from '@public-ui/react-v19';
import React, { forwardRef } from 'react';

import { ERROR_MSG, HINT_MSG } from '../../../shares/constants';
import { SampleBlock } from '../../SampleBlock';

type InputDateCasesProps = Components.KolInputDate & {
	/** Prefixes the visual block ids so the same cases can be rendered more than once per route. */
	blockIdPrefix: string;
};

export const InputDateCases = forwardRef<HTMLKolInputDateElement, InputDateCasesProps>(function InputDateCases({ blockIdPrefix, ...props }, ref) {
	return (
		<div className="grid gap-4">
			<SampleBlock id={`${blockIdPrefix}-black-bg`} className="black-background">
				<KolInputDate {...props} _type="date" _label="Date input (Black background test)" _required />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-datetime-local`}>
				<KolInputDate {...props} _type="datetime-local" _label="Local-Datetime (Standard)" _required />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-datetime-seconds`}>
				<KolInputDate
					{...props}
					_step={1}
					_type="datetime-local"
					_hint={HINT_MSG}
					_msg={{ _type: 'error', _description: ERROR_MSG }}
					_label="Local datetime (with seconds)"
					_required
					_touched
					_infoPopover={{ _label: 'hint', _content: 'Ich bin ein Hinweis.', _icons: 'kolicon-alert-info' }}
				/>
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-msg-info`}>
				<KolInputDate {...props} _msg={{ _type: 'info', _description: 'Just a hint' }} _label="Date" _touched />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-msg-warning`}>
				<KolInputDate {...props} _msg={{ _type: 'warning', _description: 'Small warning' }} _label="Date" _touched />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-msg-success`}>
				<KolInputDate {...props} _msg={{ _type: 'success', _description: 'Success message' }} _label="Date" _touched />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-msg-default`}>
				<KolInputDate {...props} _msg={{ _type: 'default', _description: 'Default message' }} _label="Date" _touched />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-month`}>
				<KolInputDate {...props} _type="month" _label="Month" _required />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-week`}>
				<KolInputDate {...props} ref={ref} _accessKey="W" _type="week" _label="Week" _required />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-time`}>
				<KolInputDate {...props} _type="time" _label="Time (standard)" _required />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-time-seconds`}>
				<KolInputDate {...props} _step={1} _type="time" _label="Time (with seconds)" _required />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-readonly`}>
				<KolInputDate {...props} _readOnly _label="Date input (read-only)" _required />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-disabled`}>
				<KolInputDate {...props} _disabled _label="Date input (Disabled)" _required />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-access-key`}>
				<KolInputDate {...props} _label="With access key" _accessKey="s" />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-short-key`}>
				<KolInputDate {...props} _label="With short key" _shortKey="s" />
			</SampleBlock>
		</div>
	);
});
