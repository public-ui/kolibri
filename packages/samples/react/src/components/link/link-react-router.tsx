import type { FC } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { KolLink, KolHeading } from '@public-ui/react-v19';
import { SampleDescription } from '../SampleDescription';

const ROUTE = '/back-page';

export const LinkReactRouter: FC = () => {
	const navigate = useNavigate();

	const handleClick = (event: Event) => {
		event.preventDefault();
		navigate(ROUTE);
	};

	return (
		<>
			<SampleDescription>
				<p>
					This sample shows how <code>KolLink</code> works with <code>react-router</code>. Primary click uses <code>preventDefault()</code> and{' '}
					<code>navigate(...)</code>, while right click / &#34;open in new tab&#34; still follows <code>_href</code>. Make sure <code>_href</code> and{' '}
					<code>navigate(...)</code> point to the same path.
				</p>
			</SampleDescription>

			<div className="grid gap-4">
				<KolHeading _level={2} _label="React Router Navigation" />
				<KolLink _href={ROUTE} _label="Go to overview" _variant="standalone" _on={{ onClick: handleClick }} />

				<KolLink _hideLabel _icons="codicon codicon-home" _href={ROUTE} _label="Go to overview (icon)" _on={{ onClick: handleClick }} />
			</div>
		</>
	);
};
