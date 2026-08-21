import type { Components } from '@public-ui/components';
import { KolInputColor } from '@public-ui/react-v19';
import React, { forwardRef } from 'react';

import { ERROR_MSG } from '../../../shares/constants';
import { SampleBlock } from '../../SampleBlock';

type InputColorCasesProps = Components.KolInputColor & {
	/** Prefixes the visual block ids so the same cases can be rendered more than once per route. */
	blockIdPrefix: string;
};

export const InputColorCases = forwardRef<HTMLKolInputColorElement, InputColorCasesProps>(function InputColorCases({ blockIdPrefix, ...props }, ref) {
	return (
		<div className="grid gap-4">
			<SampleBlock id={`${blockIdPrefix}-black-bg`} className="black-background">
				<KolInputColor
					{...props}
					_msg={{ _type: 'error', _description: ERROR_MSG }}
					_icons={{
						left: 'kolicon-kolibri',
					}}
					_label="Color (Black background test)"
					_value="#f08080"
				/>
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-suggestions-error`}>
				<KolInputColor
					{...props}
					_msg={{ _type: 'error', _description: ERROR_MSG }}
					_label="Color with error"
					_suggestions="['#000000','#f08080', '#0000ff','#00ff00']"
					_touched
				/>
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-msg-info`}>
				<KolInputColor {...props} _msg={{ _type: 'info', _description: 'Just a hint message.' }} _label="Color" _touched />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-msg-warning`}>
				<KolInputColor {...props} _msg={{ _type: 'warning', _description: 'Small warning' }} _label="Color" _touched />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-msg-success`}>
				<KolInputColor {...props} _msg={{ _type: 'success', _description: 'Success message' }} _label="Color" _touched />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-msg-default`}>
				<KolInputColor {...props} _msg={{ _type: 'default', _description: 'Default message' }} _label="Color" _touched />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-hint`}>
				<KolInputColor {...props} ref={ref} _accessKey="C" _hint="Hint text" _label="Color with hint" _value="#f08080" />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-disabled`}>
				<KolInputColor {...props} _disabled _label="Color (Disabled)" _value="#f08080" />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-access-key`}>
				<KolInputColor {...props} _label="With access key" _accessKey="c"></KolInputColor>
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-short-key`}>
				<KolInputColor {...props} _label="With short key" _shortKey="s"></KolInputColor>
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-info-popover`}>
				<KolInputColor
					{...props}
					_label="With short popover"
					_infoPopover={{ _label: 'hint', _content: 'Ich bin ein Hinweis.', _icons: 'kolicon-alert-info' }}
				></KolInputColor>
			</SampleBlock>
		</div>
	);
});
