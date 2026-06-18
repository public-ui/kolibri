import type { FC } from 'react';
import React from 'react';
import { FormWrap } from '../FormWrap';
import { SampleDescription } from '../SampleDescription';
import { ComboboxVariants } from './partials/variants';
export const ComboboxBasic: FC = () => {
	return (
		<>
			<SampleDescription>
				<p>KolCombobox combines a text input with a suggestion list, enabling users to either type in a value or to select on of the suggestions.</p>
				<p>
					The <code>_accessKey</code> property maps to the native HTML <code>accessKey</code> attribute, so the announced shortcut (e.g. Alt+C) focuses the
					field directly in the browser. Access keys must be unique per page – this example therefore uses a different access key for each rendered field. The{' '}
					<code>_shortKey</code> property only renders a visual hint and sets <code>aria-keyshortcuts</code>; it is not bound to the native browser shortcut and
					must be wired up by the host application.
				</p>
			</SampleDescription>

			<FormWrap RefComponent={ComboboxVariants} showButtons={false} />
		</>
	);
};
