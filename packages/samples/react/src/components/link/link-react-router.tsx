import { KolLink } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SampleDescription } from '../SampleDescription';

export const LinkReactRouter: FC = () => {
	const navigate = useNavigate();

	const on = {
		onClick: (event: Event) => {
			event.preventDefault();
			navigate('/back-page');
		},
	};

	return (
		<>
			<SampleDescription>
				<p>
					This sample shows how KolLink works with react-router. Primary click uses preventDefault() and navigate(...), while right click open in new tab still
					follows _href. Make sure _href and navigate(...) point to the same path.
				</p>
			</SampleDescription>

			<div className="grid gap-4">
				<KolLink _href="/back-page" _inline={false} _label="Go to overview" _on={on} />
			</div>
		</>
	);
};
