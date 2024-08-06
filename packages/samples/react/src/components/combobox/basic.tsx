import type { FC } from 'react';
import { useContext } from 'react';
import React from 'react';
import { FormWrap } from '../FormWrap';
import { ComboboxVariants } from './partials/variants';
import { SampleDescription } from '../SampleDescription';
import { KolBadge } from '@public-ui/react';
import { HideMenusContext } from '../../shares/HideMenusContext';
export const ComboboxBasic: FC = () => {
	const hideMenus = useContext(HideMenusContext);
	return (
		<>
			<SampleDescription>
				<p>KolCombobox combines a text input with a suggestion list, enabling users to either type in a value or to select on of the suggestions.</p>
			</SampleDescription>
			{!hideMenus && <KolBadge className="block mb-3" _label="Component is a DRAFT - Don't use in production yet." _color="#db5461" />}

			<FormWrap RefComponent={ComboboxVariants} />
		</>
	);
};
