import React, { forwardRef } from 'react';

import { KolSingleSelect } from '@public-ui/react-v19';

import { ERROR_MSG, HINT_MSG } from '../../../shares/constants';

import type { Components, Option, StencilUnknown } from '@public-ui/components';
import { COUNTRY_OPTIONS } from '../../../shares/country';

// Add onChange handler to log value changes
const ON = {
	onChange: console.info,
};

export const SingleSelectCases = forwardRef<HTMLKolSingleSelectElement, Components.KolSingleSelect>(function SingleSelectCases(props) {
	return (
		<div className="grid gap-4">
			<KolSingleSelect
				{...props}
				_hint={HINT_MSG}
				_label="Label"
				_options={COUNTRY_OPTIONS as Option<StencilUnknown>[]}
				_value={'de'}
				_on={{
					onBlur: console.log,
					onInput: console.log,
					onChange: console.log,
					onClick: console.log,
					onFocus: console.log,
				}}
			/>
			<KolSingleSelect {...props} _label="Disabled" _options={COUNTRY_OPTIONS as Option<StencilUnknown>[]} _value={'de'} _disabled />
			<KolSingleSelect
				{...props}
				_options={COUNTRY_OPTIONS as Option<StencilUnknown>[]}
				_msg={{ _type: 'error', _description: ERROR_MSG }}
				_rows={3}
				_touched
				_label="Label"
				_placeholder="Placeholder"
				_required
			/>
			<KolSingleSelect {...props} _label="With access key" _options={COUNTRY_OPTIONS as Option<StencilUnknown>[]} _value={'de'} _accessKey="c" />
			<KolSingleSelect {...props} _label="With short key" _options={COUNTRY_OPTIONS as Option<StencilUnknown>[]} _value={'de'} _shortKey="s" />
			<KolSingleSelect {...props} _label="With hidden clear button" _options={COUNTRY_OPTIONS as Option<StencilUnknown>[]} _value={'de'} _hideClearButton />
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
				_on={{
					onBlur: console.log,
					onInput: console.log,
					onChange: console.log,
					onClick: console.log,
					onFocus: console.log,
				}}
			/>
			<KolSingleSelect
				{...props}
				_label="Boolean, Object, Array values"
				_on={ON}
				_options={[
					{
						disabled: true,
						label: 'True (does not works)',
						value: true,
					},
					{
						label: 'False',
						value: false,
					},
					{
						label: '1',
						value: 1,
					},
					{
						label: '0',
						value: 0,
					},
					{
						label: 'Object',
						value: {
							key: 'true',
							text: 'This is true',
						},
					},
					{
						label: 'Array',
						value: ['0', '1'],
					},
				]}
				_value={false}
			/>
		</div>
	);
});
