import React from 'react';
import { KolAlert } from '@public-ui/react';

import { HeadingLevel } from '@public-ui/components/dist/types/types/heading-level';

import { FC } from 'react';
import { AlertType, AlertVariant } from '@public-ui/components';
import { SampleDescription } from '../SampleDescription';

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
		<KolAlert _heading="Das ist die Überschrift des Alert." _level={level} _type={type} _variant={variant} _hasCloser>
			Das ist der Text des Alert. Mit Schließen-Button.
		</KolAlert>
		<KolAlert _type={type} _variant={variant} _hasCloser>
			In diesem Alert wird nur der Text ohne Überschrift verwendet. Mit Schließen-Button.
		</KolAlert>
	</>
);

export const AlertVariants: FC<PropsBasic> = ({ variant = 'msg' }) => (
	<div className="grid gap-4">
		<AlertByType level={1} type="default" variant={variant} />
		<AlertByType level={2} type="error" variant={variant} />
		<AlertByType level={3} type="info" variant={variant} />
		<AlertByType level={4} type="success" variant={variant} />
		<AlertByType level={5} type="warning" variant={variant} />
	</div>
);

export const AlertBasic = () => (
	<>
		<SampleDescription>
			<p>
				KolAlert shows messages of different types. This sample illustrates the variant <code>msg</code>, showing all possible types with and without headlines
				and close buttons.
			</p>
		</SampleDescription>

		<AlertVariants variant="msg" />
	</>
);
