import type { Components } from '@public-ui/components';
import { KolTextarea } from '@public-ui/react-v19';
import React, { forwardRef } from 'react';

import { ERROR_MSG, HINT_MSG } from '../../../shares/constants';
import { SampleBlock } from '../../SampleBlock';

type TextareaCasesProps = Components.KolTextarea & {
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

export const TextareaCases = forwardRef<HTMLKolTextareaElement, TextareaCasesProps>(function TextareaCases({ blockIdPrefix, snapshotOnly, ...props }, ref) {
	// Blocks outside `snapshotOnly` stay visible in the sample but are excluded from the snapshots.
	const block = (caseId: string) => ({ id: `${blockIdPrefix}-${caseId}`, skipSnapshot: snapshotOnly !== undefined && caseId !== snapshotOnly });
	return (
		<div className="grid gap-4">
			<SampleBlock {...block('black-bg')} className="black-background">
				<KolTextarea {...props} ref={ref} _placeholder="Placeholder" _label="Text" />
			</SampleBlock>
			<SampleBlock {...block('error')}>
				<KolTextarea
					{...props}
					_placeholder="Placeholder"
					_required
					_msg={{ _type: 'error', _description: ERROR_MSG }}
					_label="Text"
					_touched
					_hint={HINT_MSG}
					_infoPopover={{ _label: 'hint', _content: 'Ich bin ein Hinweis.', _icons: 'kolicon-alert-info' }}
				/>
			</SampleBlock>
			<SampleBlock {...block('msg-info')}>
				<KolTextarea {...props} _placeholder="Placeholder" _label="Text" _msg={{ _type: 'info', _description: 'Just a hint' }} _touched />
			</SampleBlock>
			<SampleBlock {...block('msg-warning')}>
				<KolTextarea {...props} _placeholder="Placeholder" _label="Text" _msg={{ _type: 'warning', _description: 'Small warning' }} _touched />
			</SampleBlock>
			<SampleBlock {...block('msg-success')}>
				<KolTextarea {...props} _placeholder="Placeholder" _label="Text" _msg={{ _type: 'success', _description: 'Success message' }} _touched />
			</SampleBlock>
			<SampleBlock {...block('msg-default')}>
				<KolTextarea {...props} _placeholder="Placeholder" _label="Text" _msg={{ _type: 'default', _description: 'Default message' }} _touched />
			</SampleBlock>
			<SampleBlock {...block('rows')}>
				<KolTextarea {...props} ref={ref} _accessKey="T" _label="Text (3 rows)" _rows={3} />
			</SampleBlock>
			<SampleBlock {...block('placeholder')}>
				<KolTextarea {...props} ref={ref} _label="Text (placeholder)" _rows={3} _placeholder="Placeholder" />
			</SampleBlock>
			<SampleBlock {...block('disabled-empty')}>
				<KolTextarea {...props} ref={ref} _label="Text (disabled & placeholder)" _rows={3} _placeholder="Placeholder" _disabled />
			</SampleBlock>
			<SampleBlock {...block('readonly')}>
				<KolTextarea {...props} ref={ref} _label="Text (readonly)" _rows={3} _placeholder="Placeholder" _readOnly />
			</SampleBlock>
			<SampleBlock {...block('disabled-value')}>
				<KolTextarea {...props} ref={ref} _label="Text (disabled & value)" _rows={3} _placeholder="Placeholder" _value="Lorem ipsum" _disabled />
			</SampleBlock>
			<SampleBlock {...block('access-key')}>
				<KolTextarea {...props} ref={ref} _label="With access key" _rows={3} _placeholder="Placeholder" _value="Lorem ipsum" _accessKey="c" />
			</SampleBlock>
			<SampleBlock {...block('short-key')}>
				<KolTextarea {...props} ref={ref} _label="With short key" _rows={3} _placeholder="Placeholder" _value="Lorem ipsum" _shortKey="s" />
			</SampleBlock>
		</div>
	);
});
