import type { Components } from '@public-ui/components';
import { KolInputEmail } from '@public-ui/react-v19';
import React, { forwardRef } from 'react';

import { ERROR_MSG, HINT_MSG } from '../../../shares/constants';
import { SampleBlock } from '../../SampleBlock';

type InputEmailCasesProps = Components.KolInputEmail & {
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

export const InputEmailCases = forwardRef<HTMLKolInputEmailElement, InputEmailCasesProps>(function InputEmailCases(
	{ blockIdPrefix, snapshotOnly, ...props },
	ref,
) {
	// Blocks outside `snapshotOnly` stay visible in the sample but are excluded from the snapshots.
	const block = (caseId: string) => ({ id: `${blockIdPrefix}-${caseId}`, skipSnapshot: snapshotOnly !== undefined && caseId !== snapshotOnly });
	return (
		<div className="grid gap-4">
			<SampleBlock {...block('black-bg')} className="black-background">
				<KolInputEmail {...props} _required _value="test@mail.de" _msg={{ _type: 'error', _description: ERROR_MSG }} _label="E-Mail (Black background test)" />
			</SampleBlock>
			<SampleBlock {...block('suggestions')}>
				<KolInputEmail
					{...props}
					ref={ref}
					_accessKey="M"
					_placeholder="elke@mustermann.de"
					_suggestions="['test1@mail.de', 'test2@mail.de', 'test3@mail.de']"
					_label="E-Mail (list)"
					_hint={HINT_MSG}
					_msg={{ _type: 'error', _description: ERROR_MSG }}
					_touched
					_icons={{
						left: {
							icon: 'kolicon-chevron-left',
						},
						right: {
							icon: 'kolicon-chevron-right',
						},
					}}
				/>
			</SampleBlock>
			<SampleBlock {...block('info-popover')}>
				<KolInputEmail {...props} _required _label="E-Mail" _infoPopover={{ _label: 'hint', _content: 'Ich bin ein Hinweis.', _icons: 'kolicon-alert-info' }} />
			</SampleBlock>
			<SampleBlock {...block('msg-info')}>
				<KolInputEmail {...props} _msg={{ _type: 'info', _description: 'Just a hint' }} _label="E-Mail" _touched />
			</SampleBlock>
			<SampleBlock {...block('msg-warning')}>
				<KolInputEmail {...props} _msg={{ _type: 'warning', _description: 'Small warning' }} _label="E-Mail" _touched />
			</SampleBlock>
			<SampleBlock {...block('msg-success')}>
				<KolInputEmail {...props} _msg={{ _type: 'success', _description: 'Success message' }} _label="E-Mail" _touched />
			</SampleBlock>
			<SampleBlock {...block('msg-default')}>
				<KolInputEmail {...props} _msg={{ _type: 'default', _description: 'Default message' }} _label="E-Mail" _touched />
			</SampleBlock>
			<SampleBlock {...block('disabled')}>
				<KolInputEmail {...props} _disabled _value="test@mail.de" _label="E-Mail (Disabled)" />
			</SampleBlock>
			<SampleBlock {...block('readonly')}>
				<KolInputEmail {...props} _readOnly _value="test@mail.de" _label="E-Mail (Readonly)" />
			</SampleBlock>
			<SampleBlock {...block('access-key')}>
				<KolInputEmail {...props} _value="test@mail.de" _label="With access key" _accessKey="c" />
			</SampleBlock>
			<SampleBlock {...block('short-key')}>
				<KolInputEmail {...props} _value="test@mail.de" _label="With short key" _shortKey="s" />
			</SampleBlock>
		</div>
	);
});
