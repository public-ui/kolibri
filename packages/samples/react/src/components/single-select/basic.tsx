import type { FC } from 'react';
import React from 'react';
import { FormWrap } from '../FormWrap';
import { SingleSelectVariants } from './partials/variants';
import { SampleDescription } from '../SampleDescription';
export const SingleSelectBasic: FC = () => (
	<>
		<SampleDescription>
			<p>
				Die SingleSelect-Komponente erlaubt Benutzern, eine einzelne Option aus einer Dropdown-Liste auszuwählen und unterstützt eine Suchfunktion für eine
				einfache Navigation.
			</p>
		</SampleDescription>
		<>
			<FormWrap RefComponent={SingleSelectVariants} />
		</>
	</>
);
