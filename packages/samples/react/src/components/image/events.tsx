import { KolImage } from '@public-ui/react-v19';
import type { FC } from 'react';
import React, { useState } from 'react';
import { SampleDescription } from '../SampleDescription';

export const ImageEvents: FC = () => {
	const [errorLog, setErrorLog] = useState<string[]>([]);
	const [loadLog, setLoadLog] = useState<string[]>([]);

	const handleError = () => {
		setErrorLog((prev) => [...prev, `Error at ${new Date().toLocaleTimeString()}`]);
	};

	const handleLoad = () => {
		setLoadLog((prev) => [...prev, `Loaded at ${new Date().toLocaleTimeString()}`]);
	};

	return (
		<>
			<SampleDescription>
				<p>
					KolImage supports <code>_on.onError</code> and <code>_on.onLoad</code> callbacks. The first image uses a broken URL to trigger{' '}
					<code>onError</code>; the second uses a valid URL to trigger <code>onLoad</code>.
				</p>
			</SampleDescription>

			<h3>Broken image (triggers onError)</h3>
			<KolImage _alt="This image will fail to load" _src="/this-image-does-not-exist.png" _on={{ onError: handleError }} />
			<p>Error events: {errorLog.length === 0 ? 'none yet' : errorLog.join(', ')}</p>

			<h3>Valid image (triggers onLoad)</h3>
			<KolImage
				_alt="KoliBri design system illustration"
				_src="sample-image.png"
				_on={{ onLoad: handleLoad }}
				className="w-image"
			/>
			<p>Load events: {loadLog.length === 0 ? 'none yet' : loadLog.join(', ')}</p>
		</>
	);
};
