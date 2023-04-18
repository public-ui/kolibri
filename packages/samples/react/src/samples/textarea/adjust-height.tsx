import React from 'react';
import { KolTextarea } from '@public-ui/react';

import { FC } from 'react';

const VALUE = `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos
et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
sit amet.`;

export const TextareaAdjustHeight: FC = () => (
	<div className="row">
		<div className="col-sm-6">
			<KolTextarea _adjustHeight={true} _id="text-vertical" _resize="vertical" _value={VALUE}>
				Texteingabe (horizontal)
			</KolTextarea>
		</div>
		<div className="col-sm-6">
			<KolTextarea _adjustHeight={true} _id="text-none" _resize="none" _value={VALUE}>
				Texteingabe (none)
			</KolTextarea>
		</div>
	</div>
);
