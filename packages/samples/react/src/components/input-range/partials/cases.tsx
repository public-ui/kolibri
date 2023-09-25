import React, { forwardRef } from 'react';

import { KolInputRange } from '@public-ui/react';

import { Components } from '@public-ui/components';
import { ERROR_MSG } from '../../../shares/constants';

export const InputRangeCases = forwardRef<HTMLKolInputRangeElement, Components.KolInputRange>(function InputRangeCases(props, ref) {
	return (
		<div className="grid gap-4">
			<KolInputRange
				{...props}
				_min={0}
				_max={50}
				_error={ERROR_MSG}
				_label="Schieberegler"
				_icon={{
					left: {
						icon: 'codicon codicon-arrow-left',
					},
					right: {
						icon: 'codicon codicon-arrow-right',
					},
				}}
			/>
			<KolInputRange {...props} ref={ref} _min={0} _max={50} _step={10} _error={ERROR_MSG} _label="Schieberegler" />
			<KolInputRange {...props} _disabled _min={0} _max={50} _label="Schieberegler" />
		</div>
	);
});
