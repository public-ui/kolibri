import React, { forwardRef } from 'react';

import { KolInputNumber } from '@public-ui/react-v19';

import { ERROR_MSG } from '../../../shares/constants';

import type { Components } from '@public-ui/components';
import { SampleBlock } from '../../SampleBlock';

type InputNumberCasesProps = Components.KolInputNumber & {
	/** Prefixes the visual block ids so the same cases can be rendered more than once per route. */
	blockIdPrefix: string;
};

export const InputNumberCases = forwardRef<HTMLKolInputNumberElement, InputNumberCasesProps>(function InputNumberCases({ blockIdPrefix, ...props }, ref) {
	return (
		<div className="grid gap-4">
			<SampleBlock id={`${blockIdPrefix}-black-bg`} className="black-background">
				<KolInputNumber {...props} _required _touched _value={123} _label="Number input (Black background test)" />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-icons-error`}>
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
			<SampleBlock id={`${blockIdPrefix}-msg-error`}>
				<KolInputNumber {...props} _required _msg={{ _type: 'error', _description: ERROR_MSG }} _touched _value={123} _label="Number input" />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-msg-warning`}>
				<KolInputNumber {...props} _required _msg={{ _type: 'warning', _description: ERROR_MSG }} _touched _value={123} _label="Number input" />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-msg-info`}>
				<KolInputNumber {...props} _required _msg={{ _type: 'info', _description: ERROR_MSG }} _touched _value={123} _label="Number input" />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-msg-success`}>
				<KolInputNumber {...props} _required _msg={{ _type: 'success', _description: ERROR_MSG }} _touched _value={123} _label="Number input" />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-min-max-step`}>
				<KolInputNumber {...props} ref={ref} _accessKey="Z" _max={10} _min={-10} _step={2} _label="Number input (-10 to 10 in steps of 2)" />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-readonly`}>
				<KolInputNumber {...props} _readOnly _value={123} _label="Number input (Readonly)" />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-disabled`}>
				<KolInputNumber {...props} _disabled _value={123} _label="Number input (Disabled)" />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-access-key`}>
				<KolInputNumber {...props} _label="With access key" _accessKey="c" />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-short-key`}>
				<KolInputNumber {...props} _label="With short key" _shortKey="s" />
			</SampleBlock>
		</div>
	);
});
