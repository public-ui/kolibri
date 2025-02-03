/* eslint-disable jsx-a11y/tabindex-no-positive */

import { SampleDescription } from '../components/SampleDescription';
import {
	KolButton,
	KolButtonLink,
	KolCard,
	KolCombobox,
	KolInputCheckbox,
	KolInputDate,
	KolInputEmail,
	KolInputFile,
	KolInputColor,
	KolInputNumber,
	KolInputPassword,
	KolInputRadio,
	KolInputRange,
	KolInputText,
	KolLinkButton,
	KolLink,
	KolSingleSelect,
	KolSplitButton,
	KolTextarea,
} from '@public-ui/react';
import React from 'react';
import type { FC } from 'react';
import { ERROR_MSG, HINT_MSG } from '../shares/constants';
import { COUNTRY_OPTIONS, COUNTRY_SUGGESTIONS } from '../shares/country';
import type { Option, StencilUnknown } from '@public-ui/components';

export const ChangeTabindex: FC = () => {
	return (
		<>
			<SampleDescription>
				<p>This example show how different components works with tabIndex.</p>
			</SampleDescription>

			<div className="w-full grid gap-4">
				<KolCard _label="Button" _level={0}>
					<div className="flex flex-wrap gap-4">
						<KolButton _label="Button 1, Tabindex 4" _variant="primary" tabIndex={4} />
						<KolButton _disabled _label="Button 2, Tabindex 3" _variant="primary" tabIndex={3} />
						<KolButton _label="Button 3, Tabindex 2" _variant="primary" tabIndex={2} />
						<KolButton _label="Button 4, Tabindex 1" _variant="primary" tabIndex={1} />
					</div>
				</KolCard>

				<KolCard _label="ButtonLink" _level={0}>
					<div className="flex flex-wrap gap-4">
						<KolButtonLink _label="ButtonLink 1, Tabindex 4" tabIndex={4} />
						<KolButtonLink _disabled _label="ButtonLink 2, Tabindex 3" tabIndex={3} />
						<KolButtonLink _label="ButtonLink 3, Tabindex 2" tabIndex={2} />
						<KolButtonLink _label="ButtonLink 4, Tabindex 1" tabIndex={1} />
					</div>
				</KolCard>

				<KolCard _label="Combobox" _level={0}>
					<div className="flex flex-wrap gap-4">
						<KolCombobox _hint={HINT_MSG} _label="Combobox 1, Tabindex 4" _suggestions={COUNTRY_SUGGESTIONS} _value={'Deutschland'} tabIndex={4} />
						<KolCombobox _disabled _hint={HINT_MSG} _label="Combobox 2, Tabindex 3" _suggestions={COUNTRY_SUGGESTIONS} _value={'Deutschland'} tabIndex={3} />
						<KolCombobox
							_touched
							_hint={HINT_MSG}
							_msg={{ _type: 'error', _description: ERROR_MSG }}
							_label="Combobox 3, Tabindex 2"
							_suggestions={COUNTRY_SUGGESTIONS}
							_value={'Deutschland'}
							tabIndex={2}
						/>
						<KolCombobox _hint={HINT_MSG} _label="Combobox 4, Tabindex 1" _suggestions={COUNTRY_SUGGESTIONS} _value={'Deutschland'} tabIndex={1} />
					</div>
				</KolCard>

				<KolCard _label="InputCheckbox" _level={0}>
					<div className="flex flex-wrap gap-4">
						<KolInputCheckbox _label="InputCheckbox 4, Tabindex 1" _value={false} tabIndex={4} />
						<KolInputCheckbox _disabled _label="InputCheckbox 3, Tabindex 2" _value={false} tabIndex={3} />
						<KolInputCheckbox _touched _label="InputCheckbox 2, Tabindex 3" _msg={{ _type: 'error', _description: ERROR_MSG }} _value={false} tabIndex={2} />
						<KolInputCheckbox _label="InputCheckbox 1, Tabindex 4" _value={false} tabIndex={1} />
					</div>
				</KolCard>

				<KolCard _label="InputColor" _level={0}>
					<div className="flex flex-wrap gap-4">
						<KolInputColor _value="#f08080" _label="InputCheckbox 1, Tabindex 4" tabIndex={4} />
						<KolInputColor _disabled _value="#f08080" _label="InputCheckbox 2, Tabindex 3" tabIndex={3} />
						<KolInputColor _touched _value="#f08080" _label="InputCheckbox 3, Tabindex 2" _msg={{ _type: 'error', _description: ERROR_MSG }} tabIndex={2} />
						<KolInputColor _value="#f08080" _label="InputCheckbox 4, Tabindex 1" tabIndex={1} />
					</div>
				</KolCard>

				<KolCard _label="InputDate" _level={0}>
					<div className="flex flex-wrap gap-4">
						<KolInputDate _type="datetime-local" _label="InputCheckbox 1, Tabindex 4" tabIndex={4} />
						<KolInputDate _disabled _type="datetime-local" _label="InputCheckbox 2, Tabindex 3" tabIndex={3} />
						<KolInputDate
							_touched
							_type="datetime-local"
							_label="InputCheckbox 3, Tabindex 2"
							_msg={{ _type: 'error', _description: ERROR_MSG }}
							tabIndex={2}
						/>
						<KolInputDate _type="datetime-local" _label="InputCheckbox 4, Tabindex 1" tabIndex={1} />
					</div>
				</KolCard>

				<KolCard _label="InputEmail" _level={0}>
					<div className="flex flex-wrap gap-4">
						<KolInputEmail _label="InputEmail 1, Tabindex 4" tabIndex={4} />
						<KolInputEmail _disabled _label="InputEmail 2, Tabindex 3" tabIndex={3} />
						<KolInputEmail _touched _label="InputEmail 3, Tabindex 2" _msg={{ _type: 'error', _description: ERROR_MSG }} tabIndex={2} />
						<KolInputEmail _label="InputEmail 4, Tabindex 1" tabIndex={1} />
					</div>
				</KolCard>

				<KolCard _label="InputFile" _level={0}>
					<div className="flex flex-wrap gap-4">
						<KolInputFile _label="InputFile 1, Tabindex 4" tabIndex={4} />
						<KolInputFile _disabled _label="InputFile 2, Tabindex 3" tabIndex={3} />
						<KolInputFile _touched _label="InputFile 3, Tabindex 2" _msg={{ _type: 'error', _description: ERROR_MSG }} tabIndex={2} />
						<KolInputFile _label="InputFile 4, Tabindex 1" tabIndex={1} />
					</div>
				</KolCard>

				<KolCard _label="InputNumber" _level={0}>
					<div className="flex flex-wrap gap-4">
						<KolInputNumber _label="InputNumber 1, Tabindex 4" tabIndex={4} />
						<KolInputNumber _disabled _label="InputNumber 2, Tabindex 3" tabIndex={3} />
						<KolInputNumber _touched _label="InputNumber 3, Tabindex 2" _msg={{ _type: 'error', _description: ERROR_MSG }} tabIndex={2} />
						<KolInputNumber _label="InputNumber 4, Tabindex 1" tabIndex={1} />
					</div>
				</KolCard>

				<KolCard _label="InputPassword" _level={0}>
					<div className="flex flex-wrap gap-4">
						<KolInputPassword _label="InputPassword 1, Tabindex 4" tabIndex={4} />
						<KolInputPassword _disabled _label="InputPassword 2, Tabindex 3" tabIndex={3} />
						<KolInputPassword _touched _label="InputPassword 3, Tabindex 2" _msg={{ _type: 'error', _description: ERROR_MSG }} tabIndex={2} />
						<KolInputPassword _label="InputPassword 4, Tabindex 1" tabIndex={1} />
					</div>
				</KolCard>

				<KolCard _label="InputRadio" _level={0}>
					<div className="flex flex-wrap gap-4">
						<KolInputRadio
							_options="[{'label':'Mrs.','value':'Mrs.'},{'disabled':true,'label':'Mr. (disabled)','value':'Mr.'},{'label':'Company','value':'Company'}]"
							_label="InputRadio 1, Tabindex 4"
							tabIndex={4}
						/>
						<KolInputRadio
							_options="[{'label':'Mrs.','value':'Mrs.'},{'disabled':true,'label':'Mr. (disabled)','value':'Mr.'},{'label':'Company','value':'Company'}]"
							_label="InputRadio 2, Tabindex 3"
							_disabled
							tabIndex={3}
						/>
						<KolInputRadio
							_touched
							_options="[{'label':'Mrs.','value':'Mrs.'},{'disabled':true,'label':'Mr. (disabled)','value':'Mr.'},{'label':'Company','value':'Company'}]"
							_label="InputRadio 3, Tabindex 2"
							_msg={{ _type: 'error', _description: ERROR_MSG }}
							tabIndex={2}
						/>{' '}
						<KolInputRadio
							_options="[{'label':'Mrs.','value':'Mrs.'},{'disabled':true,'label':'Mr. (disabled)','value':'Mr.'},{'label':'Company','value':'Company'}]"
							_label="InputRadio 4, Tabindex 1"
							tabIndex={1}
						/>
					</div>
				</KolCard>

				<KolCard _label="InputRange" _level={0}>
					<div className="flex flex-wrap gap-4">
						<KolInputRange _label="InputRange 1, Tabindex 4" _min={0} _max={50} tabIndex={4} />
						<KolInputRange _disabled _label="InputRange 2, Tabindex 3" _min={0} _max={50} tabIndex={3} />
						<KolInputRange _touched _label="InputRange 3, Tabindex 2" _min={0} _max={50} _msg={{ _type: 'error', _description: ERROR_MSG }} tabIndex={2} />
						<KolInputRange _label="InputRange 4, Tabindex 1" _min={0} _max={50} tabIndex={1} />
					</div>
				</KolCard>

				<KolCard _label="InputText" _level={0}>
					<div className="flex flex-wrap gap-4">
						<KolInputText _label="InputText 1, Tabindex 4" tabIndex={4} />
						<KolInputText _disabled _label="InputText 2, Tabindex 3" tabIndex={3} />
						<KolInputText _touched _label="InputText 3, Tabindex 2" _msg={{ _type: 'error', _description: ERROR_MSG }} tabIndex={2} />
						<KolInputText _label="InputText 4, Tabindex 1" tabIndex={1} />
					</div>
				</KolCard>

				<KolCard _label="LinkButton" _level={0}>
					<div className="flex flex-wrap gap-4">
						<KolLinkButton _href={'#/back-page'} _label="InputText 1, Tabindex 4" _variant="primary" tabIndex={4}></KolLinkButton>
						<KolLinkButton _disabled _href={'#/back-page'} _label="InputText 2, Tabindex 3" _variant="primary" tabIndex={3}></KolLinkButton>
						<KolLinkButton _href={'#/back-page'} _label="InputText 3, Tabindex 2" _variant="primary" tabIndex={2}></KolLinkButton>
						<KolLinkButton _href={'#/back-page'} _label="InputText 4, Tabindex 1" _variant="primary" tabIndex={1}></KolLinkButton>
					</div>
				</KolCard>

				<KolCard _label="Link" _level={0}>
					<KolLink _href="#/back-page" _label="InputText 1, Tabindex 4" tabIndex={4} />
					<KolLink _disabled _href="#/back-page" _label="InputText 2, Tabindex 3" tabIndex={3} />
					<KolLink _href="#/back-page" _label="InputText 3, Tabindex 2" tabIndex={2} />
					<KolLink _href="#/back-page" _label="InputText 4, Tabindex 1" tabIndex={1} />
				</KolCard>

				<KolCard _label="SingleSelect" _level={0}>
					<div className="flex flex-wrap gap-4">
						<KolSingleSelect _label="InputText 1, Tabindex 4" _options={COUNTRY_OPTIONS as Option<StencilUnknown>[]} _value={'de'} tabIndex={4} />
						<KolSingleSelect _disabled _label="InputText 2, Tabindex 3" _options={COUNTRY_OPTIONS as Option<StencilUnknown>[]} _value={'de'} tabIndex={3} />
						<KolSingleSelect
							_touched
							_label="InputText 3, Tabindex 2"
							_options={COUNTRY_OPTIONS as Option<StencilUnknown>[]}
							_msg={{ _type: 'error', _description: ERROR_MSG }}
							_value={'de'}
							tabIndex={2}
						/>
						<KolSingleSelect _label="InputText 4, Tabindex 1" _options={COUNTRY_OPTIONS as Option<StencilUnknown>[]} _value={'de'} tabIndex={1} />
					</div>
				</KolCard>

				<KolCard _label="SplitButton" _level={0}>
					<div className="flex flex-wrap gap-4">
						<KolSplitButton _label="InputText 1, Tabindex 4" tabIndex={4}>
							Dropdown-Inhalt
						</KolSplitButton>
						<KolSplitButton _label="InputText 2, Tabindex 3" tabIndex={3} _disabled>
							Dropdown-Inhalt
						</KolSplitButton>
						<KolSplitButton _label="InputText 3, Tabindex 2" tabIndex={2}>
							Dropdown-Inhalt
						</KolSplitButton>{' '}
						<KolSplitButton _label="InputText 4, Tabindex 1" tabIndex={1}>
							Dropdown-Inhalt
						</KolSplitButton>
					</div>
				</KolCard>

				<KolCard _label="Textarea" _level={0}>
					<div className="flex flex-wrap gap-4">
						<KolTextarea _label="Textarea 1, Tabindex 4" _rows={3} _placeholder="Placeholder" tabIndex={4} />
						<KolTextarea _disabled _label="Textarea 2, Tabindex 3" _rows={3} _placeholder="Placeholder" tabIndex={3} />
						<KolTextarea
							_touched
							_label="Textarea 3, Tabindex 2"
							_rows={3}
							_placeholder="Placeholder"
							_msg={{ _type: 'error', _description: ERROR_MSG }}
							tabIndex={2}
						/>
						<KolTextarea _label="Textarea 4, Tabindex 1" _rows={3} _placeholder="Placeholder" tabIndex={1} />
					</div>
				</KolCard>
			</div>
		</>
	);
};
