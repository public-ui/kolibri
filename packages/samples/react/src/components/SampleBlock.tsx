import { KolHeading } from '@public-ui/react-v19';
import type { FC, PropsWithChildren } from 'react';
import React from 'react';

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

type SampleBlockProps = PropsWithChildren<{
	/**
	 * Unique within the route, kebab-case, max. 30 characters.
	 * Becomes part of the visual snapshot file name — renaming it renames the snapshot.
	 */
	id: string;
	/** Optional heading rendered above the block content. */
	heading?: string;
	level?: 1 | 2 | 3 | 4 | 5 | 6;
}>;

/**
 * Wraps a sample variant block in a container addressable by the visual tests.
 * Each `data-visual-block` container is captured as an individual element screenshot
 * instead of one full-page screenshot per route. See packages/tools/visual-tests/README.md.
 */
export const SampleBlock: FC<SampleBlockProps> = ({ id, heading, level = 2, children }) => {
	return (
		<section className="grid gap-4" data-visual-block={id}>
			{heading ? <KolHeading _level={level} _label={heading} /> : null}
			{children}
		</section>
	);
};
