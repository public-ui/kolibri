import { FC } from 'react';
import { KolImage } from '@public-ui/react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';

export const ImageBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolImage renders an image. The sample shows an image with alternative text.</p>
		</SampleDescription>
		<KolImage className="w-80%" _src="abgrenzung.jpg" _alt="Darstellung des KoliBri-Theming" />
	</>
);
