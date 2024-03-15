import React, { forwardRef } from 'react';

import { KolInputColor } from '@public-ui/react';

import { ERROR_MSG } from '../../../shares/constants';

import type { Components } from '@public-ui/components';
export const InputColorCases = forwardRef<HTMLKolInputColorElement, Components.KolInputColor>(function InputColorCases(props, ref) {
	return (
		<div className="grid gap-4">
			<KolInputColor
				{...props}
				_msg={{ _type: 'error', _label: ERROR_MSG }}
				_icons={{
					left: 'codicon codicon-symbol-color',
				}}
				_label="Color"
				_value="#f08080"
			/>
			<KolInputColor
				{...props}
				_msg={{ _type: 'error', _label: ERROR_MSG }}
				_label="Color with error"
				_suggestions="['#000000','#f08080', '#0000ff','#00ff00']"
				_touched
			/>
			<KolInputColor {...props} ref={ref} _accessKey="C" _hint="Hint text" _label="Color with hint" _value="#f08080" />
			<KolInputColor {...props} _disabled _label="Color (Disabled)" _value="#f08080" />
		</div>
	);
});
