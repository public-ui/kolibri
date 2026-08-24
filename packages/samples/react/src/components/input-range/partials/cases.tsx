import type { Components } from '@public-ui/components';
import { KolInputRange } from '@public-ui/react-v19';
import React, { forwardRef } from 'react';

import { ERROR_MSG, HINT_MSG } from '../../../shares/constants';
import { SampleBlock } from '../../SampleBlock';

type InputRangeCasesProps = Components.KolInputRange & {
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

export const InputRangeCases = forwardRef<HTMLKolInputRangeElement, InputRangeCasesProps>(function InputRangeCases(
	{ blockIdPrefix, snapshotOnly, ...props },
	ref,
) {
	// Blocks outside `snapshotOnly` stay visible in the sample but are excluded from the snapshots.
	const block = (caseId: string) => ({ id: `${blockIdPrefix}-${caseId}`, skipSnapshot: snapshotOnly !== undefined && caseId !== snapshotOnly });
	return (
		<div className="grid gap-4">
			<SampleBlock {...block('black-bg')} className="black-background">
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
			<SampleBlock {...block('error')}>
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
			<SampleBlock {...block('msg-info')}>
				<KolInputRange {...props} _msg={{ _type: 'info', _description: 'Just a hint' }} _label="Slider" _touched />
			</SampleBlock>
			<SampleBlock {...block('msg-warning')}>
				<KolInputRange {...props} _msg={{ _type: 'warning', _description: 'Small warning' }} _label="Slider" _touched />
			</SampleBlock>
			<SampleBlock {...block('msg-success')}>
				<KolInputRange {...props} _msg={{ _type: 'success', _description: 'Success message' }} _label="Slider" _touched />
			</SampleBlock>
			<SampleBlock {...block('msg-default')}>
				<KolInputRange {...props} _msg={{ _type: 'default', _description: 'Default message' }} _label="Slider" _touched />
			</SampleBlock>
			<SampleBlock {...block('disabled')}>
				<KolInputRange {...props} _disabled _min={0} _max={50} _label="Slider (disabled)" />
			</SampleBlock>
			<SampleBlock {...block('access-key')}>
				<KolInputRange {...props} _min={0} _max={50} _label="With access key" _accessKey="c" />
			</SampleBlock>
			<SampleBlock {...block('short-key')}>
				<KolInputRange {...props} _min={0} _max={50} _label="With short key" _shortKey="s" />
			</SampleBlock>
			<SampleBlock {...block('small-range')}>
				<KolInputRange {...props} _min={0} _max={5} _label="Small range (max=5): number input should not be narrower than 4 digits wide" />
			</SampleBlock>
		</div>
	);
});
