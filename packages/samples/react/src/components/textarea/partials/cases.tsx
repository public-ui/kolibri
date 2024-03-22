import React, { forwardRef } from 'react';

import { KolTextarea } from '@public-ui/react';

import { ERROR_MSG } from '../../../shares/constants';

import type { Components } from '@public-ui/components';
export const TextareaCases = forwardRef<HTMLKolTextareaElement, Components.KolTextarea>(function TextareaCases(props, ref) {
	return (
		<div className="grid gap-4">
			<KolTextarea {...props} _msg={{ _type: 'error', _description: ERROR_MSG }} _label="Text" _touched />
			<KolTextarea {...props} ref={ref} _accessKey="T" _label="Text (3 rows)" _rows={3} />
		</div>
	);
});
