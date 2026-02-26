import { KolAvatar } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';

export const AvatarBasic: FC = () => (
	<>
		<SampleDescription>
			<p>
				KolAvatar shows a user&apos;s avatar with customizable colors. It can be used with or without an image. If no image is defined, the name&apos;s initials
				are shown instead with a configurable background color.
			</p>
		</SampleDescription>

		<div className="flex flex-wrap gap-4">
			<KolAvatar _src="https://www.w3schools.com/howto/img_avatar.png" _label="Elke Mustermann" />

			{/* intentional trailing space   👇 - it's supposed to be trimmed */}
			<KolAvatar _label="Elke Mustermann " />
			<KolAvatar _label="Marianne" />
			<KolAvatar _color="#0000FF" _label="Christian" />
		</div>
	</>
);
