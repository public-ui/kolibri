import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { getHeadlineTag } from '../../../functional-components/Heading/Heading';
import clsx from '../../../utils/clsx';
import { getBlockBem } from '../bem-root-node/block-bem';
import type { FunctionalComponentProps } from '../generic-types';
import { SpanFC } from '../span/component';
import type { CollapsibleApi, CollapsibleVariant } from './api';

/**
 * Renders a collapsible — `kol-accordion` and `kol-details` — on the native `<details>`/`<summary>`
 * elements.
 *
 * `<summary>` is the disclosure control itself, which is what the native elements are for: one tab
 * stop, keyboard handling and the expanded state come from the user agent instead of from ARIA we
 * maintain by hand. The predecessor nested a `kol-button-wc` inside a heading and reimplemented all
 * of that.
 *
 * The BEM roles map 1:1 onto the predecessor even though the nesting inverted: `<summary>` takes
 * over from the `kol-button-wc` and carries `__heading-button`, while the heading it now contains
 * keeps `__heading`. The inversion is forced — `<summary>` has to be the first child of `<details>`
 * — but it means theme rules keep matching the element they were written for.
 *
 * The label and icon still render through `SpanFC`, so the `kol-span__container` / `kol-span__label`
 * / `kol-icon` subtree the themes style is unchanged as well.
 *
 * `open` on `<details>` and the `collapsible--open` class are driven separately: the attribute has
 * to be set before the class flips so the grid transition has a from-state, and it has to outlive
 * the class on close so the collapse is visible. The web component owns that sequencing; the FC
 * only renders what it is told.
 */
export const CollapsibleFC: FC<FunctionalComponentProps<CollapsibleApi> & CollapsibleVariant> = (
	{ block, contentClass, controlId, detailsOpen, disabled, expanded, handleToggle, headingId, icons, label, level, refHeadingButton },
	children,
) => {
	const HeadlineTag = getHeadlineTag(level);
	const blockBem = getBlockBem(block);

	return (
		<details
			class={clsx(blockBem(), 'collapsible', {
				'collapsible--disabled': disabled === true,
				'collapsible--open': expanded === true,
			})}
			open={detailsOpen === true}
		>
			<summary
				aria-controls={controlId}
				aria-disabled={disabled === true ? 'true' : undefined}
				class={clsx('collapsible__heading-button', blockBem('heading-button'))}
				id={headingId}
				onClick={handleToggle}
				ref={refHeadingButton}
				tabIndex={disabled === true ? -1 : undefined}
			>
				<HeadlineTag class={clsx('kol-headline', `kol-headline--${HeadlineTag}`, 'collapsible__heading', blockBem('heading'), 'kol-headline--single')}>
					<SpanFC icons={icons} label={label} />
				</HeadlineTag>
			</summary>
			<div class={clsx('collapsible__wrapper', blockBem('wrapper'))}>
				<div class={clsx('collapsible__wrapper-animation', blockBem('wrapper-animation'))}>
					<div
						aria-hidden={expanded === false ? 'true' : undefined}
						aria-labelledby={headingId}
						class={clsx('collapsible__content', blockBem('content'), contentClass)}
						id={controlId}
						role="region"
					>
						{children}
					</div>
				</div>
			</div>
		</details>
	);
};
