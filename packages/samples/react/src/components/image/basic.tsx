import { KolImage } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';

export const ImageBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolImage renders an image. The sample shows an image with alternative text.</p>
		</SampleDescription>

		<KolImage className="w-image" _src="sample-image.png" _alt="Darstellung des KoliBri-Theming" />
	</>
);
