import React from 'react';
import { KolForm, KolInputColor } from '@public-ui/react';

import { FC } from 'react';

import { ERROR_MSG } from '../../shares/constants';

export const InputColorBasic: FC = () => (
	<KolForm>
		<div className="grid gap-4">
			<KolInputColor
				_value="#f08080"
				_label="Farbe"
				_icon={{
					left: {
						icon: 'codicon codicon-arrow-left',
					},
					right: {
						icon: 'codicon codicon-arrow-right',
					},
				}}
			/>
			<KolInputColor _label="Farbe mit Fehler" _list="['#000000','#f08080', '#0000ff','#00ff00']" _error={ERROR_MSG} _touched />
			<KolInputColor _hint="Hilfetext" _value="#f08080" _label="Farbe mit Hilfstext" />
			<KolInputColor _disabled _value="#f08080" _label="Farbe Disabled" />
		</div>
	</KolForm>
);
