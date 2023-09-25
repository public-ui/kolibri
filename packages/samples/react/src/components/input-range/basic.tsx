import React from 'react';
import { KolForm, KolInputRange } from '@public-ui/react';

import { FC } from 'react';

import { ERROR_MSG } from '../../shares/constants';

export const InputRangeBasic: FC = () => (
	<KolForm>
		<div className="grid gap-4">
			<KolInputRange
				_min={0}
				_max={50}
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
			<KolInputRange _id="range" _min={0} _max={50} _step={10} _error={ERROR_MSG} _label="Schieberegler mit Fehler" _touched />
			<KolInputRange _disabled _id="range" _min={0} _max={50} _label="Schieberegler disabled" />
		</div>
	</KolForm>
);
