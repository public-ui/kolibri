import React from 'react';
import { KolAlert } from '@public-ui/react';

import { HeadingLevel } from '@public-ui/components/dist/types/types/heading-level';

import { AlertType, AlertVariant } from '@public-ui/components/dist/types/types/alert';

import { FC } from 'react';

type PropsByType = {
	level: HeadingLevel;
	type: AlertType;
	variant: AlertVariant;
};
type PropsBasic = {
	variant: AlertVariant;
};

const AlertByType: FC<PropsByType> = ({ level, type, variant }) => (
	<>
		<KolAlert _heading="Das ist die Überschrift des Alert." _level={level} _type={type} _variant={variant}>
			Das ist der Text des Alert.
		</KolAlert>
		<KolAlert _type={type} _variant={variant}>
			In diesem Alert wird nur der Text ohne Überschrift verwendet.
		</KolAlert>
	</>
);

export const AlertBasic: FC<PropsBasic> = ({ variant }) => (
	<div className="grid gap-4">
		<AlertByType level={1} type="default" variant={variant} />
		<AlertByType level={2} type="error" variant={variant} />
		<AlertByType level={3} type="info" variant={variant} />
		<AlertByType level={4} type="success" variant={variant} />
		<AlertByType level={5} type="warning" variant={variant} />
	</div>
);
