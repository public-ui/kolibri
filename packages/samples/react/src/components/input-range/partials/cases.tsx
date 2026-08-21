import type { Components } from '@public-ui/components';
import { KolInputRange } from '@public-ui/react-v19';
import React, { forwardRef } from 'react';

import { ERROR_MSG, HINT_MSG } from '../../../shares/constants';
import { SampleBlock } from '../../SampleBlock';

type InputRangeCasesProps = Components.KolInputRange & {
	/** Prefixes the visual block ids so the same cases can be rendered more than once per route. */
	blockIdPrefix: string;
};

export const InputRangeCases = forwardRef<HTMLKolInputRangeElement, InputRangeCasesProps>(function InputRangeCases({ blockIdPrefix, ...props }, ref) {
	return (
		<div className="grid gap-4">
			<SampleBlock id={`${blockIdPrefix}-black-bg`} className="black-background">
				<KolInputRange
					{...props}
					_min={0}
					_max={50}
					_msg={{ _type: 'error', _description: ERROR_MSG }}
					_label="Slider (Black background test)"
					_icons={{
						left: {
							icon: 'kolicon-chevron-left',
						},
						right: {
							icon: 'kolicon-chevron-right',
						},
					}}
					_touched
				/>
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-error`}>
				<KolInputRange
					{...props}
					ref={ref}
					_accessKey="F"
					_min={0}
					_max={50}
					_step={10}
					_hint={HINT_MSG}
					_msg={{ _type: 'error', _description: ERROR_MSG }}
					_label="Slider with error"
					_touched
					_infoPopover={{ _label: 'hint', _content: 'Ich bin ein Hinweis.', _icons: 'kolicon-alert-info' }}
				/>
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-msg-info`}>
				<KolInputRange {...props} _msg={{ _type: 'info', _description: 'Just a hint' }} _label="Slider" _touched />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-msg-warning`}>
				<KolInputRange {...props} _msg={{ _type: 'warning', _description: 'Small warning' }} _label="Slider" _touched />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-msg-success`}>
				<KolInputRange {...props} _msg={{ _type: 'success', _description: 'Success message' }} _label="Slider" _touched />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-msg-default`}>
				<KolInputRange {...props} _msg={{ _type: 'default', _description: 'Default message' }} _label="Slider" _touched />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-disabled`}>
				<KolInputRange {...props} _disabled _min={0} _max={50} _label="Slider (disabled)" />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-access-key`}>
				<KolInputRange {...props} _min={0} _max={50} _label="With access key" _accessKey="c" />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-short-key`}>
				<KolInputRange {...props} _min={0} _max={50} _label="With short key" _shortKey="s" />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-small-range`}>
				<KolInputRange {...props} _min={0} _max={5} _label="Small range (max=5): number input should not be narrower than 4 digits wide" />
			</SampleBlock>
		</div>
	);
});
