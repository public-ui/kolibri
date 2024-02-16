import type { FC } from 'react';
import React, { useRef } from 'react';

import type { RefComponent } from './types';

type FokusElementProps = {
	RefComponent: RefComponent;
} & Record<string, unknown>;

export const FocusElement: FC<FokusElementProps> = (props) => {
	const ref = useRef(null);

	/* Focus effect for the moment to ensure test stability */
	// useLayoutEffect(() => {
	// 	setTimeout(() => {
	// 		if (ref.current && window.self === window.top) {
	// 			(ref.current as unknown as HTMLElement).focus();
	// 		}
	// 	}, 500);
	// }, [ref]);

	return <props.RefComponent ref={ref} {...props} />;
};
