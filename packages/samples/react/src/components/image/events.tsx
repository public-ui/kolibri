import type { FC } from 'react';
import React, { useEffect, useRef, useState } from 'react';

import { KolImage } from '@public-ui/react-v19';
import { SampleDescription } from '../SampleDescription';

export const ImageEvents: FC = () => {
	const [onErrorLog, setOnErrorLog] = useState<string[]>([]);
	const [onLoadLog, setOnLoadLog] = useState<string[]>([]);
	const [nativeErrorLog, setNativeErrorLog] = useState<string[]>([]);
	const [nativeLoadLog, setNativeLoadLog] = useState<string[]>([]);
	const nativeRef = useRef<HTMLKolImageElement>(null);

	useEffect(() => {
		const el = nativeRef.current;
		if (!el) return;
		const onError = () => setNativeErrorLog((prev) => [...prev, new Date().toLocaleTimeString()]);
		const onLoad = () => setNativeLoadLog((prev) => [...prev, new Date().toLocaleTimeString()]);
		el.addEventListener('error', onError);
		el.addEventListener('load', onLoad);
		return () => {
			el.removeEventListener('error', onError);
			el.removeEventListener('load', onLoad);
		};
	}, []);

	return (
		<>
			<SampleDescription>
				<p>KolImage fires both _on.onError / _on.onLoad callbacks and native error / load DOM events on the host element.</p>
			</SampleDescription>

			<h3>Via _on prop</h3>
			<KolImage
				_alt="This image will fail to load"
				_src="/this-image-does-not-exist.png"
				_on={{
					onError: () => setOnErrorLog((prev) => [...prev, new Date().toLocaleTimeString()]),
					onLoad: () => setOnLoadLog((prev) => [...prev, new Date().toLocaleTimeString()]),
				}}
			/>
			<p>onError fired: {onErrorLog.length === 0 ? 'not yet' : onErrorLog.join(', ')}</p>
			<p>onLoad fired: {onLoadLog.length === 0 ? 'not yet' : onLoadLog.join(', ')}</p>

			<h3>Via native addEventListener</h3>
			<KolImage ref={nativeRef} _alt="KoliBri design system illustration" _src="sample-image.png" className="w-image" />
			<p>native error fired: {nativeErrorLog.length === 0 ? 'not yet' : nativeErrorLog.join(', ')}</p>
			<p>native load fired: {nativeLoadLog.length === 0 ? 'not yet' : nativeLoadLog.join(', ')}</p>
		</>
	);
};
