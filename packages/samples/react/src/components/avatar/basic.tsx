import { KolAvatar } from '@public-ui/react';
import React from 'react';
import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const AvatarBasic: FC = () => (
	<>
		<SampleDescription>
			<p>Hier werden verschiedene Avatar-Typen angezeigt</p>
		</SampleDescription>
		<div className="flex flex-wrap gap-4">
			<KolAvatar _src="https://www.w3schools.com/howto/img_avatar.png" _label="Elke Mustermann" />

			{/* intentional trailing space    👇 - it's supposed to be trimmed */}
			<KolAvatar _label="Elke Mustermann " />
			<KolAvatar _label="Marianne" />
		</div>
	</>
);
