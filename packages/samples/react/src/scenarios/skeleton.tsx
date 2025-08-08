import React, { useRef, useState } from 'react';
import type { FC } from 'react';

import { KolButton, KolSkeleton } from '@public-ui/react';
import { SampleDescription } from '../components/SampleDescription';

export const Skeleton: FC = () => {
	const skeletonRef = useRef<HTMLKolSkeletonElement>(null);
	const [loadedValue, setLoadedValue] = useState<number>();

	return (
		<>
			<SampleDescription>
				<p>KolSkeleton can be toggled to display loading placeholders.</p>
				<p>
					Press the <kbd>e</kbd> key to increase the counter shown on both buttons.
				</p>
			</SampleDescription>

			<KolButton _label="Toggle" onClick={() => skeletonRef.current?.toggle()} />
			<KolButton _label="Focus Button" onClick={() => skeletonRef.current?.focusButton()} />
			<KolSkeleton _count={3} _name="Example" onLoaded={(e) => setLoadedValue(e.detail)} ref={skeletonRef} />
			{loadedValue !== undefined && <p>Loaded event: {loadedValue}</p>}
		</>
	);
};
