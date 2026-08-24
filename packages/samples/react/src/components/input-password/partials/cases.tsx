import type { Components } from '@public-ui/components';
import { KolInputPassword } from '@public-ui/react-v19';
import React, { forwardRef } from 'react';

import { ERROR_MSG, HINT_MSG } from '../../../shares/constants';
import { SampleBlock } from '../../SampleBlock';

type InputPasswordCasesProps = Components.KolInputPassword & {
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

export const InputPasswordCases = forwardRef<HTMLKolInputPasswordElement, InputPasswordCasesProps>(function InputPasswordCases(
	{ blockIdPrefix, snapshotOnly, ...props },
	ref,
) {
	// Blocks outside `snapshotOnly` stay visible in the sample but are excluded from the snapshots.
	const block = (caseId: string) => ({ id: `${blockIdPrefix}-${caseId}`, skipSnapshot: snapshotOnly !== undefined && caseId !== snapshotOnly });
	return (
		<div className="grid gap-4">
			<SampleBlock {...block('black-bg')} className="black-background">
				<KolInputPassword {...props} _label="Passwort (Black background test)" />
			</SampleBlock>
			<SampleBlock {...block('icons-error')}>
				<KolInputPassword
					{...props}
					ref={ref}
					_accessKey="P"
					_required
					_hint={HINT_MSG}
					_msg={{ _type: 'error', _description: ERROR_MSG }}
					_placeholder="Mit Icons"
					_label="Passwort"
					_icons={{
						left: {
							icon: 'kolicon-chevron-left',
						},
						right: {
							icon: 'kolicon-chevron-right',
						},
					}}
					_touched
					_infoPopover={{ _label: 'hint', _content: 'Ich bin ein Hinweis.', _icons: 'kolicon-alert-info' }}
				/>
			</SampleBlock>
			<SampleBlock {...block('msg-info')}>
				<KolInputPassword {...props} _msg={{ _type: 'info', _description: 'Just a hint' }} _label="Passwort" _touched />
			</SampleBlock>
			<SampleBlock {...block('msg-warning')}>
				<KolInputPassword {...props} _msg={{ _type: 'warning', _description: 'Small warning' }} _label="Passwort" _touched />
			</SampleBlock>
			<SampleBlock {...block('msg-success')}>
				<KolInputPassword {...props} _msg={{ _type: 'success', _description: 'Success message' }} _label="Passwort" _touched />
			</SampleBlock>
			<SampleBlock {...block('msg-default')}>
				<KolInputPassword {...props} _msg={{ _type: 'default', _description: 'Default message' }} _label="Passwort" _touched />
			</SampleBlock>
			<SampleBlock {...block('disabled')}>
				<KolInputPassword {...props} _disabled _msg={{ _type: 'error', _description: ERROR_MSG }} _label="Passwort (Disabled)" _touched />
			</SampleBlock>
			<SampleBlock {...block('readonly')}>
				<KolInputPassword {...props} _readOnly _label="Passwort (Readonly)" />
			</SampleBlock>
			<SampleBlock {...block('access-key')}>
				<KolInputPassword {...props} ref={ref} _shortKey="c" _label="With access key" />
			</SampleBlock>
			<SampleBlock {...block('short-key')}>
				<KolInputPassword {...props} ref={ref} _shortKey="s" _label="With short key" />
			</SampleBlock>
		</div>
	);
});
