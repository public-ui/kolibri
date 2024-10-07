import React, { forwardRef } from 'react';

import { KolInputRange } from '@public-ui/react';

import { ERROR_MSG } from '../../../shares/constants';

import type { Components } from '@public-ui/components';
export const InputRangeCases = forwardRef<HTMLKolInputRangeElement, Components.KolInputRange>(function InputRangeCases(props, ref) {
	return (
		<div className="grid gap-4">
			<div className="black-background">
				<KolInputRange
					{...props}
					_min={0}
					_max={50}
					_msg={{ _type: 'error', _description: ERROR_MSG }}
					_label="Slider (Black background test)"
					_icons={{
						left: {
							icon: 'codicon codicon-arrow-left',
						},
						right: {
							icon: 'codicon codicon-arrow-right',
						},
					}}
					_touched
				/>
			</div>
			<KolInputRange
				{...props}
				ref={ref}
				_accessKey="F"
				_min={0}
				_max={50}
				_step={10}
				_msg={{ _type: 'error', _description: ERROR_MSG }}
				_label="Slider with error"
				_touched
			/>
			<KolInputRange {...props} _disabled _min={0} _max={50} _label="Slider (disabled)" />
		</div>
	);
});
