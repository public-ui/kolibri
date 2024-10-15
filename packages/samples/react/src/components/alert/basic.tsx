import React from 'react';
import { KolAlert } from '@public-ui/react';
import type { FC } from 'react';
import type { AlertType, AlertVariant, HeadingLevel } from '@public-ui/components';
import { SampleDescription } from '../SampleDescription';

type PropsByType = {
	level: HeadingLevel;
	type: AlertType;
	variant: AlertVariant;
};
type PropsBasic = {
	variant?: AlertVariant;
};

const AlertByType: FC<PropsByType> = ({ level, type, variant }) => (
	<>
		<KolAlert _label={`This is the headline level ${level} of the alert.`} _level={level} _type={type} _variant={variant}>
			This is the text of the alert.
		</KolAlert>
		<KolAlert _type={type} _variant={variant}>
			In this alert, only the text without the heading is used.
		</KolAlert>
		<KolAlert _label={`This is the headline level ${level} of the alert.`} _level={level} _type={type} _variant={variant} _hasCloser>
			This is the text of the alert. With close button.
		</KolAlert>
		<KolAlert _type={type} _variant={variant} _hasCloser>
			In this alert, only the text without the heading is used. With close button.
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

export const AlertBasic: FC<PropsBasic> = () => (
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
