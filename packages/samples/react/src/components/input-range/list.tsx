import type { FC } from 'react';
import React from 'react';

import { KolInputRange } from '@public-ui/react-v19';

export const InputRangeList: FC = () => (
	<div className="grid gap-4">
		<KolInputRange
			_label="Slider with labeled tick marks"
			_min={0}
			_max={100}
			_step={25}
			_value={50}
			_list={[
				{ value: 0, label: '0%' },
				{ value: 25, label: '25%' },
				{ value: 50, label: '50%' },
				{ value: 75, label: '75%' },
				{ value: 100, label: '100%' },
			]}
		/>
		<KolInputRange
			_label="Slider with unlabeled tick marks"
			_min={0}
			_max={100}
			_step={10}
			_value={0}
			_list={[
				{ value: 0 },
				{ value: 10 },
				{ value: 20 },
				{ value: 30 },
				{ value: 40 },
				{ value: 50 },
				{ value: 60 },
				{ value: 70 },
				{ value: 80 },
				{ value: 90 },
				{ value: 100 },
			]}
		/>
	</div>
);
