import { KolButton, KolForm } from '@public-ui/react';
import React, { FC } from 'react';
import { FocusElement } from './FocusInput';
import { RefFormComponent } from './types';

type FormWrapProps = {
	RefComponent: RefFormComponent;
} & Record<string, unknown>;

export const FormWrap: FC<FormWrapProps> = (props) => (
	<KolForm>
		<div className="grid gap-4">
			<FocusElement {...props} />
			<div className="flex gap-4">
				<KolButton _label="Submit" _icons="codicon codicon-arrow-right" _type="submit" _variant="primary" />
				<KolButton _label="Reset" _type="reset" _variant="tertiary" />
				<KolButton _label="Help" _type="button" _variant="ghost" />
			</div>
		</div>
	</KolForm>
);
