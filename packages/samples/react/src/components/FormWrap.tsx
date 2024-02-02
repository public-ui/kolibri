import React from 'react';

import { KolButton, KolForm } from '@public-ui/react';

import { FocusElement } from './FocusInput';

import type { FC } from 'react';
import type { RefFormComponent } from './types';

type FormWrapProps = {
	RefComponent: RefFormComponent;
} & Record<string, unknown>;

export const FormWrap: FC<FormWrapProps> = (props) => (
	<KolForm>
		<div className="grid gap-4">
			<FocusElement {...props} />
			<div className="flex gap-4">
				<KolButton _label="Submit" _icons="codicon codicon-arrow-right" _type="submit" _variant="primary" />
				<KolButton
					_label="Bunte Icons"
					_icons={{
						left: { icon: 'codicon codicon-heart-filled', style: { color: '#cc006e' } },
						right: { icon: 'codicon codicon-squirrel', style: { color: '#b41b1b' } },
					}}
					_type="submit"
					_variant="secondary"
				/>
				<KolButton _label="Reset" _type="reset" _variant="tertiary" />
				<KolButton _label="Help" _type="button" _variant="ghost" />
			</div>
		</div>
	</KolForm>
);
