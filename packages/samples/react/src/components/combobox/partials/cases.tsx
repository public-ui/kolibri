import React from 'react';

import { KolCombobox } from '@public-ui/react-v19';

import type { Components } from '@public-ui/components';
import { ERROR_MSG, HINT_MSG } from '../../../shares/constants';
import { COUNTRY_SUGGESTIONS } from '../../../shares/country';
import { SampleBlock } from '../../SampleBlock';

type ComboboxCasesProps = Partial<Components.KolCombobox> & {
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

export const ComboboxCases = ({ blockIdPrefix, snapshotOnly, ...props }: ComboboxCasesProps) => {
	// Blocks outside `snapshotOnly` stay visible in the sample but are excluded from the snapshots.
	const block = (caseId: string) => ({ id: `${blockIdPrefix}-${caseId}`, skipSnapshot: snapshotOnly !== undefined && caseId !== snapshotOnly });
	return (
		<div className="grid gap-4">
			<SampleBlock {...block('hint')}>
				<KolCombobox {...props} _hint={HINT_MSG} _label="Label" _suggestions={COUNTRY_SUGGESTIONS} _value={'Deutschland'} />
			</SampleBlock>
			<SampleBlock {...block('disabled')}>
				<KolCombobox {...props} _label="Disabled" _suggestions={COUNTRY_SUGGESTIONS} _value={'Deutschland'} _disabled />
			</SampleBlock>
			<SampleBlock {...block('error')}>
				<KolCombobox
					{...props}
					_suggestions={COUNTRY_SUGGESTIONS}
					_msg={{ _type: 'error', _description: ERROR_MSG }}
					_touched
					_label="Label"
					_placeholder="Placeholder"
					_required
					_infoPopover={{ _label: 'hint', _content: 'Ich bin ein Hinweis.', _icons: 'kolicon-alert-info' }}
				/>
			</SampleBlock>
			<SampleBlock {...block('access-key')}>
				<KolCombobox {...props} _label="With access key" _suggestions={COUNTRY_SUGGESTIONS} _value={'Deutschland'} _accessKey="c" />
			</SampleBlock>
			<SampleBlock {...block('short-key')} skipSnapshot={props._hideLabel}>
				<KolCombobox {...props} _label="With short key" _suggestions={COUNTRY_SUGGESTIONS} _value={'Deutschland'} _shortKey="s" />
			</SampleBlock>
		</div>
	);
};
