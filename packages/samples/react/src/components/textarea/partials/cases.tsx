import React, { forwardRef } from 'react';

import { Components } from '@public-ui/components';
import { KolTextarea } from '@public-ui/react';
import { ERROR_MSG } from '../../../shares/constants';

export const TextareaCases = forwardRef<HTMLKolTextareaElement, Components.KolTextarea>(function TextareaCases(props, ref) {
	return (
		<div className="grid gap-4">
			<KolTextarea {...props} ref={ref} _error={ERROR_MSG} _label="Text" _touched />
			<KolTextarea {...props} ref={ref} _label="Text (3 rows)" _rows={3} />
		</div>
	);
});
