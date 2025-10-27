import type { FC } from 'react';
import React, { useEffect, useRef } from 'react';

import { KolSkipNav } from '@public-ui/react-v19';

import { SampleDescription } from '../SampleDescription';

export const SkipNavBasic: FC = () => {
	const skipNavRef = useRef<HTMLKolSkipNavElement>(null);

	useEffect(() => {
		skipNavRef.current?.kolFocus();
	}, []);

	return (
		<div className="grid gap-4">
			<SampleDescription>
				<p>KolSkipNav renders a list of navigation links that are visually hidden by default and only visible on focus.</p>
				<p>For testing purposes, click into the example and press the tab-key in order to focus the first link.</p>
			</SampleDescription>

			<KolSkipNav
				ref={skipNavRef}
				_label="Hidden navigation"
				_links={[
					{
						_label: 'To the top',
						_href: '#/back-page',
					},
					{
						_label: 'To the form',
						_href: '#/back-page',
					},
					{
						_label: 'To the end',
						_href: '#/back-page',
					},
				]}
			></KolSkipNav>
		</div>
	);
};
