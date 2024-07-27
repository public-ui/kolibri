import React, { FC } from 'react';
import { KolSkipNav } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

export const SkipNavBasic: FC = () => (
	<div className="grid gap-4">
		<SampleDescription>
			<p>KolSkipNav renders a list of navigation links that are visually hidden by default and only visible on focus.</p>
			<p>For testing purposes, click into the example and press the tab-key in order to focus the first link.</p>
		</SampleDescription>
		<KolSkipNav
			_ariaLabel="Versteckte Navigation"
			_links={[
				{
					_label: 'Zum Anfang',
					_selector: 'header',
				},
				{
					_label: 'Zum Formular',
					_selector: '#form',
				},
				{
					_label: 'Zum Ende',
					_selector: 'footer',
				},
			]}
		></KolSkipNav>
	</div>
);
