import React from 'react';

import { KolSingleSelect } from '@public-ui/react-v19';

import { ERROR_MSG, HINT_MSG } from '../../../shares/constants';

import type { Components, Option, StencilUnknown } from '@public-ui/components';
import { COUNTRY_OPTIONS } from '../../../shares/country';
import { LONG_OPTIONS } from '../../../shares/longOptions';
import { SampleBlock } from '../../SampleBlock';

type SingleSelectCasesProps = Components.KolSingleSelect & {
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

export const SingleSelectCases = ({ blockIdPrefix, snapshotOnly, ...props }: SingleSelectCasesProps) => {
	// Blocks outside `snapshotOnly` stay visible in the sample but are excluded from the snapshots.
	const block = (caseId: string) => ({ id: `${blockIdPrefix}-${caseId}`, skipSnapshot: snapshotOnly !== undefined && caseId !== snapshotOnly });
	return (
		<div className="grid gap-4">
			<SampleBlock {...block('hint')}>
				<KolSingleSelect {...props} _hint={HINT_MSG} _label="Label" _options={COUNTRY_OPTIONS as Option<StencilUnknown>[]} _value={'de'} />
			</SampleBlock>
			<SampleBlock {...block('disabled')}>
				<KolSingleSelect {...props} _label="Disabled" _options={COUNTRY_OPTIONS as Option<StencilUnknown>[]} _value={'de'} _disabled />
			</SampleBlock>
			<SampleBlock {...block('error')}>
				<KolSingleSelect
					{...props}
					_options={COUNTRY_OPTIONS as Option<StencilUnknown>[]}
					_msg={{ _type: 'error', _description: ERROR_MSG }}
					_rows={3}
					_touched
					_label="Label"
					_placeholder="Placeholder"
					_required
					_infoPopover={{ _label: 'hint', _content: 'Ich bin ein Hinweis.', _icons: 'kolicon-alert-info' }}
				/>
			</SampleBlock>
			<SampleBlock {...block('access-key')}>
				<KolSingleSelect {...props} _label="With access key" _options={COUNTRY_OPTIONS as Option<StencilUnknown>[]} _value={'de'} _accessKey="c" />
			</SampleBlock>
			<SampleBlock {...block('short-key')}>
				<KolSingleSelect {...props} _label="With short key" _options={COUNTRY_OPTIONS as Option<StencilUnknown>[]} _value={'de'} _shortKey="s" />
			</SampleBlock>
			<SampleBlock {...block('long-labels')}>
				<KolSingleSelect {...props} _label="With long labels" _options={LONG_OPTIONS as Option<StencilUnknown>[]} _placeholder="Placeholder" />
			</SampleBlock>
			<SampleBlock {...block('no-clear-button')}>
				<KolSingleSelect
					{...props}
					_label="With hidden clear button"
					_options={COUNTRY_OPTIONS as Option<StencilUnknown>[]}
					_value={'de'}
					_hasClearButton={false}
				/>
			</SampleBlock>
			<SampleBlock {...block('boolean-values')}>
				<KolSingleSelect
					{...props}
					_label="Boolean option values (Issue #9122)"
					_options={
						[
							{ label: 'False', value: false },
							{ label: 'True', value: true },
						] as Option<StencilUnknown>[]
					}
					_value={false}
				/>
			</SampleBlock>
			<SampleBlock {...block('disabled-options')}>
				<KolSingleSelect
					{...props}
					_hint={HINT_MSG}
					_label="With disabled options"
					_options={
						[
							{
								value: 'bw',
								label: 'Baden-Württemberg',
							},
							{
								value: 'by',
								label: 'Bayern',
								disabled: true,
							},
							{
								value: 'be',
								label: 'Berlin',
							},
							{
								value: 'bb',
								label: 'Brandenburg',
							},
							{
								value: 'hb',
								label: 'Bremen',
							},
							{
								value: 'hh',
								label: 'Hamburg',
							},
							{
								value: 'he',
								label: 'Hessen',
							},
							{
								value: 'mv',
								label: 'Mecklenburg-Vorpommern',
								disabled: true,
							},
							{
								value: 'ni',
								label: 'Niedersachsen',
								disabled: true,
							},
							{
								value: 'nw',
								label: 'Nordrhein-Westfalen',
							},
							{
								value: 'rp',
								label: 'Rheinland-Pfalz',
								disabled: true,
							},
							{
								value: 'sl',
								label: 'Saarland',
							},
							{
								value: 'sn',
								label: 'Sachsen',
							},
							{
								value: 'st',
								label: 'Sachsen-Anhalt',
								disabled: true,
							},
							{
								value: 'sh',
								label: 'Schleswig-Holstein',
								disabled: true,
							},
							{
								value: 'th',
								label: 'Thüringen',
							},
						] as Option<StencilUnknown>[]
					}
					_value={'be'}
				/>
			</SampleBlock>
		</div>
	);
};
