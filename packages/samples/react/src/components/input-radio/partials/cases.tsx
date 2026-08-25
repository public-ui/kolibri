import React, { forwardRef } from 'react';

import { KolInputRadio } from '@public-ui/react-v19';

import { ERROR_MSG, HINT_MSG } from '../../../shares/constants';

import type { Components } from '@public-ui/components';
import { SampleBlock } from '../../SampleBlock';

type InputRadioCasesProps = Components.KolInputRadio & {
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

export const InputRadioCases = forwardRef<HTMLKolInputRadioElement, InputRadioCasesProps>(function InputRadioCases(
	{ blockIdPrefix, snapshotOnly, ...props },
	ref,
) {
	// Blocks outside `snapshotOnly` stay visible in the sample but are excluded from the snapshots.
	const block = (caseId: string) => ({ id: `${blockIdPrefix}-${caseId}`, skipSnapshot: snapshotOnly !== undefined && caseId !== snapshotOnly });
	return (
		<div className="grid gap-4">
			<SampleBlock {...block('black-bg')} className="black-background">
				<KolInputRadio
					{...props}
					_options="[{'disabled':true,'label':'Mrs. (disabled)','value':'Mrs.'},{'label':'Mr.'},{'label':'Company','value':'Company'}]"
					_label="Salutation (Black background test)"
				/>
			</SampleBlock>
			<SampleBlock {...block('error')}>
				<KolInputRadio
					{...props}
					_required
					_msg={{ _type: 'error', _description: ERROR_MSG }}
					_touched
					_value="Company"
					_options="[{'label':'Mrs.','value':'Mrs.'},{'disabled':true,'label':'Mr. (disabled)','value':'Mr.'},{'label':'Company','value':'Company'}]"
					_label="Salutation (with error)"
				/>
			</SampleBlock>
			<SampleBlock {...block('horizontal')}>
				<KolInputRadio
					{...props}
					ref={ref}
					_orientation="horizontal"
					_required
					_value="Company"
					_options="[{'label':'Mrs.','value':'Mrs.'},{'disabled':true,'label':'Mr. (disabled)'},{'label':'Company','value':'Company'}]"
					_label="Salutation (horizontal)"
					_infoPopover={{ _label: 'hint', _content: 'Ich bin ein Hinweis.', _icons: 'kolicon-alert-info' }}
				/>
			</SampleBlock>
			<SampleBlock {...block('horizontal-disabled')}>
				<KolInputRadio
					{...props}
					_disabled
					_orientation="horizontal"
					_required
					_msg={{ _type: 'error', _description: ERROR_MSG }}
					_touched
					_value="Company"
					_options="[{'label':'Mrs.','value':'Mrs.'},{'disabled':true,'label':'Mr. (disabled)'},{'label':'Company','value':'Company'}]"
					_label="Salutation (horizontal with error)"
				/>
			</SampleBlock>
			<SampleBlock {...block('disabled')}>
				<KolInputRadio
					{...props}
					_disabled
					_value="Company"
					_options="[{'label':'Mrs.','value':'Mrs.'},{'disabled':true,'label':'Mr. (disabled)'},{'label':'Company','value':'Company'}]"
					_label="Salutation"
					_touched
				/>
			</SampleBlock>
			<SampleBlock {...block('horizontal-hints')}>
				<KolInputRadio
					{...props}
					_orientation="horizontal"
					_required
					_msg={{ _type: 'error', _description: ERROR_MSG }}
					_touched
					_value="Company"
					_options={[
						{ label: 'Mrs.', value: 'Mrs.', hint: 'Description for option "Mrs."' },
						{ label: 'Mr. (disabled)', value: 'Mr.', hint: 'Description for option "Mr."', disabled: true },
						{ label: 'Company', value: 'Company', hint: 'Description for option "Company"' },
					]}
					_label="Salutation (horizontal with error hint and description)"
					_hint={HINT_MSG}
				/>
			</SampleBlock>
		</div>
	);
});
