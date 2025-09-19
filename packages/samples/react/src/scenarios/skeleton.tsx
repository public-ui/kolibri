import React, { useRef, useState } from 'react';
import type { FC } from 'react';

import { KolButton, KolSkeleton } from '@public-ui/react-v19';
import { SampleDescription } from '../components/SampleDescription';

export const Skeleton: FC = () => {
	const skeletonRef = useRef<HTMLKolSkeletonElement>(null);
	const initialCount = 3;
	const [count, setCount] = useState<number>(initialCount);
	const handleLoaded = (event: CustomEvent<number>) => {
		setCount(event.detail);
	};

	return (
		<>
			<SampleDescription>
				<p>
					KolSkeleton can be toggled to display loading placeholders. Clicking the internal ClickButton increments the counter and focusing moves the focus to
					that button.
				</p>
			</SampleDescription>

			<KolButton
				_label="Toggle"
				_on={{
					onClick: () => skeletonRef.current?.kolToggle(),
				}}
				_variant="primary"
			/>
			<KolButton
				_label="Focus Button"
				_on={{
					onClick: () => skeletonRef.current?.kolFocus(),
				}}
			/>
			<KolSkeleton _count={initialCount} _label="Click Button" _name="Example" onLoaded={handleLoaded} ref={skeletonRef} />
			<p aria-live="polite">Loaded value: {count}</p>
		</>
	);
};
