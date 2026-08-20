import { KolHeading } from '@public-ui/react-v19';
import type { FC, HTMLAttributes, PropsWithChildren } from 'react';
import React, { useContext } from 'react';
import { HideMenusContext } from '../shares/HideMenusContext';

/**
 * Converts an arbitrary label into a kebab-case block id, e.g. `Text (hideLabel)` → `text-hide-label`.
 * Use this only for data-driven blocks; prefer hard-coded ids so label changes don't rename snapshots.
 */
export function toKebabCase(value: string): string {
	return value
		.replace(/([a-z0-9])([A-Z])/g, '$1-$2')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

type SampleBlockProps = PropsWithChildren<
	{
		/**
		 * Unique within the route, kebab-case, max. 30 characters.
		 * Becomes part of the visual snapshot file name — renaming it renames the snapshot.
		 */
		id: string;
		/** Optional heading rendered above the block content. Hidden in snapshot mode (`?hideMenus`). */
		heading?: string;
		level?: 1 | 2 | 3 | 4 | 5 | 6;
		/** Overrides the default `grid gap-4` container layout. */
		className?: string;
	} & Omit<HTMLAttributes<HTMLElement>, 'className' | 'id'>
>;

/**
 * Wraps a sample variant block in a container addressable by the visual tests.
 * Each `data-visual-block` container is captured as an individual element screenshot
 * instead of one full-page screenshot per route. This component is the only place
 * that sets `data-visual-block` — samples must not set the attribute directly.
 * See packages/tools/visual-tests/README.md.
 */
export const SampleBlock: FC<SampleBlockProps> = ({ id, heading, level = 2, className, children, ...rest }) => {
	const hideMenus = useContext(HideMenusContext);

	return (
		<section className={className ?? 'grid gap-4'} data-visual-block={id} {...rest}>
			{/* The heading is sample chrome, not component content: hide it in snapshot mode so heading changes never invalidate snapshots. */}
			{heading && !hideMenus ? <KolHeading _level={level} _label={heading} /> : null}
			{children}
		</section>
	);
};
