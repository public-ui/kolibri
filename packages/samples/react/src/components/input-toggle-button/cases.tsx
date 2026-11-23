import React, { forwardRef } from 'react';

import { KolInputToggleButton } from '@public-ui/react-v19';

import { ERROR_MSG } from '../../shares/constants';

import type { Components } from '@public-ui/components';
import { SampleBlock } from '../SampleBlock';

type InputToggleButtonCasesProps = Partial<Components.KolInputToggleButton> & {
	/** Prefixes the visual block ids so the same cases can be rendered more than once per route. */
	blockIdPrefix: string;
};

export const InputToggleButtonCases = forwardRef<HTMLKolInputToggleButtonElement, InputToggleButtonCasesProps>(function InputToggleButtonCases(
	{ blockIdPrefix, ...props },
	ref,
) {
	return (
		<div className="grid gap-4">
			<SampleBlock id={`${blockIdPrefix}-unpressed`}>
				<KolInputToggleButton {...props} _label="Not pressed" _value={false} _required />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-pressed`}>
				<KolInputToggleButton {...props} ref={ref} _accessKey="A" _checked _label="Pressed" _tooltipAlign="right" _value={true} />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-long-label`}>
				<KolInputToggleButton {...props} _checked _label={'With a very long label and upheavals '.repeat(5)} _value={true} />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-disabled`}>
				<KolInputToggleButton {...props} _disabled _label="Disabled" _value={true} _hint="Hint text" />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-pressed-disabled`}>
				<KolInputToggleButton {...props} _checked _disabled _label="Pressed and disabled" />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-error`}>
				<KolInputToggleButton
					{...props}
					_msg={{ _type: 'error', _description: ERROR_MSG }}
					_label="With error"
					_touched
					_value={true}
					_hint="Hint text"
					_required
				/>
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-short-key`}>
				<KolInputToggleButton {...props} _label="With short key" _shortKey="s" _value={null}></KolInputToggleButton>
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-info-popover`}>
				<KolInputToggleButton
					{...props}
					_label="With popover"
					_value={false}
					_required
					_infoPopover={{ _label: 'hint', _content: 'Ich bin ein Hinweis.', _icons: 'kolicon-alert-info' }}
				>
					<span slot="expert">Expert Slot & required</span>
				</KolInputToggleButton>
			</SampleBlock>
		</div>
	);
});
