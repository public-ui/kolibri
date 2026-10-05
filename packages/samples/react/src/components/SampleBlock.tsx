import { KolHeading } from '@public-ui/react-v19';
import type { CSSProperties, FC, HTMLAttributes, PropsWithChildren } from 'react';
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

type SampleBlockProps = PropsWithChildren<
	{
		/**
		 * Unique within the route, kebab-case, max. 30 characters.
		 * Becomes part of the visual snapshot file name — renaming it renames the snapshot.
		 */
		id: string;
		/** Optional heading rendered above the block content. */
		heading?: string;
		level?: 1 | 2 | 3 | 4 | 5 | 6;
		/** Overrides the default `grid gap-4` container layout. */
		className?: string;
		/**
		 * Shrinks the snapshot container to the width its content actually needs (`width: fit-content`)
		 * instead of stretching it across the full sample width. Use it for narrow, inline-ish samples
		 * (abbr, badge, link, …) so the snapshot doesn't consist mostly of empty space.
		 * Don't use it for components that rely on the available width (tables, form fields, cards).
		 */
		fitContent?: boolean;
		/**
		 * Captures a second element screenshot of this block at 320 px viewport width
		 * (`<route-slug>--<block-id>-320.png`) to guard the reflow behaviour required by
		 * WCAG 1.4.10. Opt in only where narrow width actually changes the layout —
		 * every flagged block doubles its snapshot count.
		 */
		narrow?: boolean;
		/**
		 * Excludes this block from the visual tests without turning it back into a plain `div`:
		 * heading, layout and the debug outline stay, only `data-visual-block` is dropped so no
		 * screenshot is taken. Use it for samples that can't be captured deterministically
		 * (animations, timestamps, random data) or that are only there to be looked at.
		 * The outline marks such blocks **red** instead of blue, and `narrow` has no effect on them.
		 */
		skipSnapshot?: boolean;
	} & Omit<HTMLAttributes<HTMLElement>, 'className' | 'id'>
>;

const FIT_CONTENT_STYLE: CSSProperties = { width: 'fit-content' };

/**
 * Wraps a sample variant block in a container addressable by the visual tests.
 * Each `data-visual-block` container is captured as an individual element screenshot
 * instead of one full-page screenshot per route. This component is the only place
 * that sets `data-visual-block` — samples must not set the attribute directly.
 * The blocks can be made visible while developing (`?visualBlocks` or `Ctrl+Alt+B`),
 * see `shares/visualBlockOutline`.
 * See packages/tools/visual-tests/README.md.
 */
export const SampleBlock: FC<SampleBlockProps> = ({ id, heading, level = 2, className, fitContent, narrow, skipSnapshot, children, ...rest }) => (
	<section {...rest}>
		{/* The heading is sample chrome, not component content: it stays outside the captured block so heading changes never invalidate snapshots. */}
		{heading ? <KolHeading _level={level} _label={heading} /> : null}
		<div
			/* Excluded blocks keep their id under a different attribute: the tests only look for
			   `data-visual-block`, while the debug outline can still find and mark them. */
			data-visual-block={skipSnapshot ? undefined : id}
			data-visual-block-skipped={skipSnapshot ? id : undefined}
			data-visual-narrow={narrow && !skipSnapshot ? '' : undefined}
			className={className ?? 'grid gap-4'}
			style={fitContent ? FIT_CONTENT_STYLE : undefined}
		>
			{children}
		</div>
	</section>
);
