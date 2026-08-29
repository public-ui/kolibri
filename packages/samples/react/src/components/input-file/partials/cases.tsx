import type { Components } from '@public-ui/components';
import { KolInputFile } from '@public-ui/react-v19';
import React, { forwardRef } from 'react';

import { ERROR_MSG, HINT_MSG } from '../../../shares/constants';
import { SampleBlock } from '../../SampleBlock';

const handleOn = {
	onClick: () => console.log('click'),
	onChange: (event: Event, files: unknown) => console.log('onChange ', event, files),
	onInput: (event: Event, files: unknown) => console.log('onInput', event, files),
};

type InputFileCasesProps = Components.KolInputFile & {
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

export const InputFileCases = forwardRef<HTMLKolInputFileElement, InputFileCasesProps>(function InputFileCases({ blockIdPrefix, snapshotOnly, ...props }, ref) {
	// Blocks outside `snapshotOnly` stay visible in the sample but are excluded from the snapshots.
	const block = (caseId: string) => ({ id: `${blockIdPrefix}-${caseId}`, skipSnapshot: snapshotOnly !== undefined && caseId !== snapshotOnly });
	return (
		<div className="grid gap-4">
			<SampleBlock {...block('black-bg')} className="black-background">
				<KolInputFile
					{...props}
					_label="Upload file (Black background test)"
					_icons={{
						left: {
							icon: 'kolicon-up',
						},
					}}
					_touched
					_on={handleOn}
				/>
			</SampleBlock>
			<SampleBlock {...block('error')}>
				<KolInputFile
					{...props}
					_required
					_hint={HINT_MSG}
					_msg={{ _type: 'error', _description: ERROR_MSG }}
					_label="Upload file (Error State)"
					_icons={{
						left: {
							icon: 'kolicon-up',
						},
					}}
					_touched
					_infoPopover={{ _label: 'hint', _content: 'Ich bin ein Hinweis.', _icons: 'kolicon-alert-info' }}
				/>
			</SampleBlock>
			<SampleBlock {...block('msg-info')}>
				<KolInputFile {...props} _msg={{ _type: 'info', _description: 'Just a hint' }} _label="Upload file" _touched />
			</SampleBlock>
			<SampleBlock {...block('msg-warning')}>
				<KolInputFile {...props} _msg={{ _type: 'warning', _description: 'Small warning' }} _label="Upload file" _touched />
			</SampleBlock>
			<SampleBlock {...block('msg-success')}>
				<KolInputFile {...props} _msg={{ _type: 'success', _description: 'Success message' }} _label="Upload file" _touched />
			</SampleBlock>
			<SampleBlock {...block('msg-default')}>
				<KolInputFile {...props} _msg={{ _type: 'default', _description: 'Default message' }} _label="Upload file" _touched />
			</SampleBlock>
			<SampleBlock {...block('multiple')}>
				<KolInputFile {...props} ref={ref} _accessKey="h" _multiple _msg={{ _type: 'error', _description: ERROR_MSG }} _label="Upload file (Multiple)" />
			</SampleBlock>
			<SampleBlock {...block('disabled')}>
				<KolInputFile {...props} _disabled _label="Upload file (Disabled)" />
			</SampleBlock>
			<SampleBlock {...block('access-key')}>
				<KolInputFile {...props} _label="With access key" _accessKey="c" />
			</SampleBlock>
			<SampleBlock {...block('short-key')}>
				<KolInputFile {...props} _label="With short key" _shortKey="s" />
			</SampleBlock>
		</div>
	);
});
