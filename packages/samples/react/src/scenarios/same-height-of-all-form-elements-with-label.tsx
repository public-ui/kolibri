import {
	KolCombobox,
	KolInputColor,
	KolInputDate,
	KolInputEmail,
	KolInputFile,
	KolInputNumber,
	KolInputPassword,
	KolInputRange,
	KolInputText,
	KolSelect,
	KolSingleSelect,
	KolTextarea,
} from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../components/SampleDescription';

export const SameHeightOfAllFormElements: FC = () => {
	return (
		<>
			<SampleDescription>
				<p>All form elements with labels, should have the same height and gaps to ensure a consistent and visually balanced user interface.</p>
			</SampleDescription>
			<div className="w-full flex flex-wrap gap-4">
				<KolCombobox _icons="kolicon-house" _label="Combobox" _suggestions={[]} />
				<KolInputColor
					_icons={{
						left: 'kolicon-house',
					}}
					_label="Input-Color"
				/>
				<KolInputFile _icons="kolicon-house" _label="Input-File" />
				<KolInputDate _icons="kolicon-house" _label="Input-Date" />
				<KolInputEmail _icons="kolicon-house" _label="Input-Email" />
				<KolInputNumber _icons="kolicon-house" _label="Input-Number" />
				<KolInputPassword _icons="kolicon-house" _label="Input-Password" />
				<KolInputRange _icons="kolicon-house" _label="Input-Range" />
				<KolInputText _icons="kolicon-house" _label="Input-Text" />
				<KolSelect _icons="kolicon-house" _label="Select" _options={[]} />
				<KolSingleSelect _icons="kolicon-house" _label="Single Select" _options={[]} />
				<KolTextarea _icons="kolicon-house" _label="Textarea" />
			</div>
		</>
	);
};
