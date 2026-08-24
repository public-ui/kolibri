import type { Components } from '@public-ui/components';
import { KolInputDate } from '@public-ui/react-v19';
import React, { forwardRef } from 'react';

import { ERROR_MSG, HINT_MSG } from '../../../shares/constants';
import { SampleBlock } from '../../SampleBlock';

type InputDateCasesProps = Components.KolInputDate & {
	/** Prefixes the visual block ids so the same cases can be rendered more than once per route. */
	blockIdPrefix: string;
	/**
	 * Restricts the snapshots of this rendering to the case with this id; every other block is
	 * rendered with `skipSnapshot`. Used for the `_hideLabel` groups: hiding the label mainly
	 * changes how the message is laid out, so snapshotting every case a second time would only
	 * duplicate the labelled group.
	 */
	snapshotOnly?: string;
};

export const InputDateCases = forwardRef<HTMLKolInputDateElement, InputDateCasesProps>(function InputDateCases({ blockIdPrefix, snapshotOnly, ...props }, ref) {
	// Blocks outside `snapshotOnly` stay visible in the sample but are excluded from the snapshots.
	const block = (caseId: string) => ({ id: `${blockIdPrefix}-${caseId}`, skipSnapshot: snapshotOnly !== undefined && caseId !== snapshotOnly });
	return (
		<div className="grid gap-4">
			<SampleBlock {...block('black-bg')} className="black-background">
				<KolInputDate {...props} _type="date" _label="Date input (Black background test)" _required />
			</SampleBlock>
			<SampleBlock {...block('datetime-local')}>
				<KolInputDate {...props} _type="datetime-local" _label="Local-Datetime (Standard)" _required />
			</SampleBlock>
			<SampleBlock {...block('datetime-seconds')}>
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
			<SampleBlock {...block('msg-info')}>
				<KolInputDate {...props} _msg={{ _type: 'info', _description: 'Just a hint' }} _label="Date" _touched />
			</SampleBlock>
			<SampleBlock {...block('msg-warning')}>
				<KolInputDate {...props} _msg={{ _type: 'warning', _description: 'Small warning' }} _label="Date" _touched />
			</SampleBlock>
			<SampleBlock {...block('msg-success')}>
				<KolInputDate {...props} _msg={{ _type: 'success', _description: 'Success message' }} _label="Date" _touched />
			</SampleBlock>
			<SampleBlock {...block('msg-default')}>
				<KolInputDate {...props} _msg={{ _type: 'default', _description: 'Default message' }} _label="Date" _touched />
			</SampleBlock>
			<SampleBlock {...block('month')}>
				<KolInputDate {...props} _type="month" _label="Month" _required />
			</SampleBlock>
			<SampleBlock {...block('week')}>
				<KolInputDate {...props} ref={ref} _accessKey="W" _type="week" _label="Week" _required />
			</SampleBlock>
			<SampleBlock {...block('time')}>
				<KolInputDate {...props} _type="time" _label="Time (standard)" _required />
			</SampleBlock>
			<SampleBlock {...block('time-seconds')}>
				<KolInputDate {...props} _step={1} _type="time" _label="Time (with seconds)" _required />
			</SampleBlock>
			<SampleBlock {...block('readonly')}>
				<KolInputDate {...props} _readOnly _label="Date input (read-only)" _required />
			</SampleBlock>
			<SampleBlock {...block('disabled')}>
				<KolInputDate {...props} _disabled _label="Date input (Disabled)" _required />
			</SampleBlock>
			<SampleBlock {...block('access-key')}>
				<KolInputDate {...props} _label="With access key" _accessKey="s" />
			</SampleBlock>
			<SampleBlock {...block('short-key')}>
				<KolInputDate {...props} _label="With short key" _shortKey="s" />
			</SampleBlock>
		</div>
	);
});
