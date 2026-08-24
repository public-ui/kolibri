import React from 'react';

import { KolCombobox } from '@public-ui/react-v19';

import type { Components } from '@public-ui/components';
import { ERROR_MSG, HINT_MSG } from '../../../shares/constants';
import { COUNTRY_SUGGESTIONS } from '../../../shares/country';
import { SampleBlock } from '../../SampleBlock';

type ComboboxCasesProps = Partial<Components.KolCombobox> & {
	/** Prefixes the visual block ids so the same cases can be rendered more than once per route. */
	blockIdPrefix: string;
};

export const ComboboxCases = ({ blockIdPrefix, ...props }: ComboboxCasesProps) => {
	return (
		<div className="grid gap-4">
			<SampleBlock id={`${blockIdPrefix}-hint`}>
				<KolCombobox {...props} _hint={HINT_MSG} _label="Label" _suggestions={COUNTRY_SUGGESTIONS} _value={'Deutschland'} />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-disabled`}>
				<KolCombobox {...props} _label="Disabled" _suggestions={COUNTRY_SUGGESTIONS} _value={'Deutschland'} _disabled />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-error`}>
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
			<SampleBlock id={`${blockIdPrefix}-access-key`}>
				<KolCombobox {...props} _label="With access key" _suggestions={COUNTRY_SUGGESTIONS} _value={'Deutschland'} _accessKey="c" />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-short-key`} skipSnapshot={props._hideLabel}>
				<KolCombobox {...props} _label="With short key" _suggestions={COUNTRY_SUGGESTIONS} _value={'Deutschland'} _shortKey="s" />
			</SampleBlock>
		</div>
	);
};
