import { KolHeading } from '@public-ui/react-v19';
import type { FC, HTMLAttributes, PropsWithChildren } from 'react';
import React from 'react';

type SampleGroupProps = PropsWithChildren<
	{
		/** Optional heading rendered above the group content. */
		heading?: string;
		level?: 1 | 2 | 3 | 4 | 5 | 6;
	} & HTMLAttributes<HTMLElement>
>;

/**
 * Groups several {@link SampleBlock}s under a common heading.
 *
 * Unlike `SampleBlock` it renders no `data-visual-block` container, so the nested blocks stay
 * individual element screenshots instead of being captured together as one. Use it wherever a
 * sample renders the same set of cases more than once (e.g. with and without `_hideLabel`) – the
 * group supplies the heading, the cases supply the blocks.
 */
export const SampleGroup: FC<SampleGroupProps> = ({ heading, level = 2, children, ...rest }) => (
	<section {...rest}>
		{/* The heading is sample chrome, not component content: it stays outside the captured blocks so heading changes never invalidate snapshots. */}
		{heading ? <KolHeading _level={level} _label={heading} /> : null}
		{children}
	</section>
);
