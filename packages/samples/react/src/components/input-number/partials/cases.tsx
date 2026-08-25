import React, { forwardRef } from 'react';

import { KolInputNumber } from '@public-ui/react-v19';

import { ERROR_MSG } from '../../../shares/constants';

import type { Components } from '@public-ui/components';
import { SampleBlock } from '../../SampleBlock';

type InputNumberCasesProps = Components.KolInputNumber & {
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

export const InputNumberCases = forwardRef<HTMLKolInputNumberElement, InputNumberCasesProps>(function InputNumberCases(
	{ blockIdPrefix, snapshotOnly, ...props },
	ref,
) {
	// Blocks outside `snapshotOnly` stay visible in the sample but are excluded from the snapshots.
	const block = (caseId: string) => ({ id: `${blockIdPrefix}-${caseId}`, skipSnapshot: snapshotOnly !== undefined && caseId !== snapshotOnly });
	return (
		<div className="grid gap-4">
			<SampleBlock {...block('black-bg')} className="black-background">
				<KolInputNumber {...props} _required _touched _value={123} _label="Number input (Black background test)" />
			</SampleBlock>
			<SampleBlock {...block('icons-error')}>
				<KolInputNumber
					{...props}
					_required
					_msg={{ _type: 'error', _description: ERROR_MSG }}
					_touched
					_placeholder="Mit Icons"
					_label="Number input"
					_icons={{
						left: {
							icon: 'kolicon-kolibri',
						},
						right: {
							icon: 'kolicon-kolibri',
						},
					}}
					_infoPopover={{ _label: 'hint', _content: 'Ich bin ein Hinweis.', _icons: 'kolicon-alert-info' }}
				/>
			</SampleBlock>
			<SampleBlock {...block('msg-error')}>
				<KolInputNumber {...props} _required _msg={{ _type: 'error', _description: ERROR_MSG }} _touched _value={123} _label="Number input" />
			</SampleBlock>
			<SampleBlock {...block('msg-warning')}>
				<KolInputNumber {...props} _required _msg={{ _type: 'warning', _description: ERROR_MSG }} _touched _value={123} _label="Number input" />
			</SampleBlock>
			<SampleBlock {...block('msg-info')}>
				<KolInputNumber {...props} _required _msg={{ _type: 'info', _description: ERROR_MSG }} _touched _value={123} _label="Number input" />
			</SampleBlock>
			<SampleBlock {...block('msg-success')}>
				<KolInputNumber {...props} _required _msg={{ _type: 'success', _description: ERROR_MSG }} _touched _value={123} _label="Number input" />
			</SampleBlock>
			<SampleBlock {...block('min-max-step')}>
				<KolInputNumber {...props} ref={ref} _accessKey="Z" _max={10} _min={-10} _step={2} _label="Number input (-10 to 10 in steps of 2)" />
			</SampleBlock>
			<SampleBlock {...block('readonly')}>
				<KolInputNumber {...props} _readOnly _value={123} _label="Number input (Readonly)" />
			</SampleBlock>
			<SampleBlock {...block('disabled')}>
				<KolInputNumber {...props} _disabled _value={123} _label="Number input (Disabled)" />
			</SampleBlock>
			<SampleBlock {...block('access-key')}>
				<KolInputNumber {...props} _label="With access key" _accessKey="c" />
			</SampleBlock>
			<SampleBlock {...block('short-key')}>
				<KolInputNumber {...props} _label="With short key" _shortKey="s" />
			</SampleBlock>
		</div>
	);
});
