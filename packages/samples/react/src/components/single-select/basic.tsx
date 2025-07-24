import React from 'react';
import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';
import { KolSingleSelect } from '@public-ui/react';
import { ERROR_MSG, HINT_MSG } from '../../shares/constants';
import type { Option, StencilUnknown } from '@public-ui/components';
import { COUNTRY_OPTIONS } from '../../shares/country';
import { LONG_OPTIONS } from '../../shares/longOptions';

export const SingleSelectBasic: FC = () => {
	return (
		<>
			<SampleDescription>
				<p>SingleSelect provides a select field for a single value, supported by a search field.</p>
			</SampleDescription>

			<div className="grid gap-4">
				<KolSingleSelect
					_hint={HINT_MSG}
					_label="Label"
					_options={COUNTRY_OPTIONS as Option<StencilUnknown>[]}
					_value={'de'}
					_on={{ onBlur: console.log, onInput: console.log, onChange: console.log, onClick: console.log, onFocus: console.log }}
				/>
				<KolSingleSelect _label="Disabled" _options={COUNTRY_OPTIONS as Option<StencilUnknown>[]} _value={'de'} _disabled />
				<KolSingleSelect
					_options={COUNTRY_OPTIONS as Option<StencilUnknown>[]}
					_msg={{ _type: 'error', _description: ERROR_MSG }}
					_rows={3}
					_touched
					_label="Label"
					_placeholder="Placeholder"
					_required
				/>
				<KolSingleSelect _label="With access key" _options={COUNTRY_OPTIONS as Option<StencilUnknown>[]} _value={'de'} _accessKey="c" />
				<KolSingleSelect _label="With short key" _options={COUNTRY_OPTIONS as Option<StencilUnknown>[]} _value={'de'} _shortKey="s" />
				<KolSingleSelect _label="With long labels" _options={LONG_OPTIONS as Option<StencilUnknown>[]} _placeholder="Placeholder" />
				<KolSingleSelect _label="With hidden clear button" _options={COUNTRY_OPTIONS as Option<StencilUnknown>[]} _value={'de'} _hideClearButton />
			</div>
		</>
	);
};
