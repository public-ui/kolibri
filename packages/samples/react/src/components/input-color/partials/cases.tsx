import React, { forwardRef } from 'react';

import { KolInputColor } from '@public-ui/react';

import { Components } from '@public-ui/components';
import { ERROR_MSG } from '../../../shares/constants';

export const InputColorCases = forwardRef<HTMLKolInputColorElement, Components.KolInputColor>(function InputColorCases(props, ref) {
	return (
		<div className="grid gap-4">
			<KolInputColor
				{...props}
				_error={ERROR_MSG}
				_icon={{
					left: 'codicon codicon-symbol-color',
				}}
				_label="Color"
				_value="#ff0000"
			/>
			<KolInputColor {...props} _error={ERROR_MSG} _label="Color with error" _list="['#000000','#ff0000', '#0000ff','#00ff00']" _touched />
			<KolInputColor {...props} ref={ref} _hint="Hint text" _label="Color with hint" _value="#ff0000" />
			<KolInputColor {...props} _disabled _label="Color (Disabled)" _value="#ff0000" />
		</div>
	);
});
