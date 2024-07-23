import React from 'react';
import type { FC } from 'react';
import { FormWrap } from '../FormWrap';
import { HideMenusContext } from '../../shares/HideMenusContext';
import { SampleDescription } from '../SampleDescription';
import { SingleSelectVariants } from './partials/variants';
import { useContext } from 'react';
import { KolBadge } from '@public-ui/react';

export const SingleSelectBasic: FC = () => {
	const hideMenus = useContext(HideMenusContext);

	return (
		<>
			<SampleDescription>
				<p>SingleSelect-Komponente provides a select field for a single value, supported by a search field.</p>
			</SampleDescription>
			{!hideMenus && <KolBadge className="block mb-3" _label="Component is a DRAFT - Don't use in production yet." _color="#db5461" />}
			<FormWrap RefComponent={SingleSelectVariants} />
		</>
	);
};
