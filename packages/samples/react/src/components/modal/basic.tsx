import type { FC } from 'react';
import React from 'react';

import { KolAlert, KolLink } from '@public-ui/react-v19';

import { DialogBasic } from '../dialog/basic';

/**
 * @deprecated Use `DialogBasic` from '../dialog/basic' instead.
 */
export const ModalBasic: FC = () => (
	<>
		<KolAlert _label="Component is DEPRECATED" _type="error" _variant="card" className="header-alert">
			The Modal component was renamed to Dialog. Please use the Dialog sample instead.&nbsp;
			<KolLink _href="/#/dialog" _target="_blank" _label="Open Dialog samples" />
		</KolAlert>

		<DialogBasic />
	</>
);
