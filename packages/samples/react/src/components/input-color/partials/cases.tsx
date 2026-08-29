import type { Components } from '@public-ui/components';
import { KolInputColor } from '@public-ui/react-v19';
import React, { forwardRef } from 'react';

import { ERROR_MSG } from '../../../shares/constants';
import { SampleBlock } from '../../SampleBlock';

type InputColorCasesProps = Components.KolInputColor & {
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

export const InputColorCases = forwardRef<HTMLKolInputColorElement, InputColorCasesProps>(function InputColorCases(
	{ blockIdPrefix, snapshotOnly, ...props },
	ref,
) {
	// Blocks outside `snapshotOnly` stay visible in the sample but are excluded from the snapshots.
	const block = (caseId: string) => ({ id: `${blockIdPrefix}-${caseId}`, skipSnapshot: snapshotOnly !== undefined && caseId !== snapshotOnly });
	return (
		<div className="grid gap-4">
			<SampleBlock {...block('black-bg')} className="black-background">
				<KolInputColor
					{...props}
					_msg={{ _type: 'error', _description: ERROR_MSG }}
					_icons={{
						left: 'kolicon-kolibri',
					}}
					_label="Color (Black background test)"
					_value="#f08080"
				/>
			</SampleBlock>
			<SampleBlock {...block('suggestions-error')}>
				<KolInputColor
					{...props}
					_msg={{ _type: 'error', _description: ERROR_MSG }}
					_label="Color with error"
					_suggestions="['#000000','#f08080', '#0000ff','#00ff00']"
					_touched
				/>
			</SampleBlock>
			<SampleBlock {...block('msg-info')}>
				<KolInputColor {...props} _msg={{ _type: 'info', _description: 'Just a hint message.' }} _label="Color" _touched />
			</SampleBlock>
			<SampleBlock {...block('msg-warning')}>
				<KolInputColor {...props} _msg={{ _type: 'warning', _description: 'Small warning' }} _label="Color" _touched />
			</SampleBlock>
			<SampleBlock {...block('msg-success')}>
				<KolInputColor {...props} _msg={{ _type: 'success', _description: 'Success message' }} _label="Color" _touched />
			</SampleBlock>
			<SampleBlock {...block('msg-default')}>
				<KolInputColor {...props} _msg={{ _type: 'default', _description: 'Default message' }} _label="Color" _touched />
			</SampleBlock>
			<SampleBlock {...block('hint')}>
				<KolInputColor {...props} ref={ref} _accessKey="C" _hint="Hint text" _label="Color with hint" _value="#f08080" />
			</SampleBlock>
			<SampleBlock {...block('disabled')}>
				<KolInputColor {...props} _disabled _label="Color (Disabled)" _value="#f08080" />
			</SampleBlock>
			<SampleBlock {...block('access-key')}>
				<KolInputColor {...props} _label="With access key" _accessKey="c"></KolInputColor>
			</SampleBlock>
			<SampleBlock {...block('short-key')}>
				<KolInputColor {...props} _label="With short key" _shortKey="s"></KolInputColor>
			</SampleBlock>
			<SampleBlock {...block('info-popover')}>
				<KolInputColor
					{...props}
					_label="With short popover"
					_infoPopover={{ _label: 'hint', _content: 'Ich bin ein Hinweis.', _icons: 'kolicon-alert-info' }}
				></KolInputColor>
			</SampleBlock>
		</div>
	);
});
