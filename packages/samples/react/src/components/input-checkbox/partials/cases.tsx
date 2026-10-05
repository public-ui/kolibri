import React, { forwardRef } from 'react';

import { KolInputCheckbox } from '@public-ui/react-v19';

import { ERROR_MSG } from '../../../shares/constants';

import type { Components } from '@public-ui/components';
import { SampleBlock } from '../../SampleBlock';

type InputCheckboxCasesProps = Components.KolInputCheckbox & {
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

export const InputCheckboxCases = forwardRef<HTMLKolInputCheckboxElement, InputCheckboxCasesProps>(function InputCheckboxCases(
	{ blockIdPrefix, snapshotOnly, ...props },
	ref,
) {
	// Blocks outside `snapshotOnly` stay visible in the sample but are excluded from the snapshots.
	const block = (caseId: string) => ({ id: `${blockIdPrefix}-${caseId}`, skipSnapshot: snapshotOnly !== undefined && caseId !== snapshotOnly });
	return (
		<div className="grid gap-4">
			<SampleBlock {...block('unchecked')}>
				<KolInputCheckbox {...props} _label="Not selected" _value={false} _required />
			</SampleBlock>
			<SampleBlock {...block('indeterminate')}>
				<KolInputCheckbox {...props} _label="Indeterminate" _value={null} _indeterminate />
			</SampleBlock>
			<SampleBlock {...block('checked')}>
				<KolInputCheckbox {...props} ref={ref} _accessKey="A" _checked _label="Selected" _tooltipAlign="right" _value={true} />
			</SampleBlock>
			<SampleBlock {...block('long-label')}>
				<KolInputCheckbox
					{...props}
					_checked
					_icons={{ unchecked: 'ckolicon-cross' }}
					_label={'With a very long label and upheavals '.repeat(5)}
					_value={true}
				/>
			</SampleBlock>
			<SampleBlock {...block('disabled')}>
				<KolInputCheckbox {...props} _disabled _label="Disabled" _value={true} _hint="Hint text" />
			</SampleBlock>
			<SampleBlock {...block('checked-disabled')}>
				<KolInputCheckbox {...props} _checked _disabled _label="Checked and disabled" />
			</SampleBlock>
			<SampleBlock {...block('indet-disabled')}>
				<KolInputCheckbox {...props} _indeterminate _disabled _label="Indeterminate and disabled" />
			</SampleBlock>
			<SampleBlock {...block('error')}>
				<KolInputCheckbox
					{...props}
					_msg={{ _type: 'error', _description: ERROR_MSG }}
					_label="With error"
					_touched
					_value={true}
					_hint="Hint text"
					_required
				/>
			</SampleBlock>
			<SampleBlock {...block('access-key')}>
				<KolInputCheckbox {...props} _label="With access key" _accessKey="c" _value={null}></KolInputCheckbox>
			</SampleBlock>
			<SampleBlock {...block('short-key')}>
				<KolInputCheckbox {...props} _label="With short key" _shortKey="s" _value={null}></KolInputCheckbox>
			</SampleBlock>
			<SampleBlock {...block('info-popover')}>
				<KolInputCheckbox
					{...props}
					_label="With popover"
					_value={false}
					_required
					_infoPopover={{ _label: 'hint', _content: 'Ich bin ein Hinweis.', _icons: 'kolicon-alert-info' }}
				>
					<span slot="expert">Expert Slot & required</span>
				</KolInputCheckbox>
			</SampleBlock>
		</div>
	);
});
