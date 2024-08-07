import { KolLink } from '@public-ui/react';
import React from 'react';
import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const LinkAriaDescription: FC = () => (
	<>
		<SampleDescription>
			<p>
				This sample shows KolLink with aria-description
			</p>
		</SampleDescription>

		<div className="flex flex-wrap gap-4">
			<KolLink _href="#/back-page" _label="Link Text without aria description" ></KolLink>			
			<KolLink _href="#/back-page" _label="Link Text" _ariaDescription="Link Area Description"></KolLink>			
		</div>
	</>
);
