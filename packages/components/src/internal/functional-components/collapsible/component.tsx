import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import KolHeadingFc from '../../../functional-components/Heading/Heading';
import clsx from '../../../utils/clsx';
import { preventFocus } from '../../../utils/element-interaction';
import { getBlockBem } from '../bem-root-node/block-bem';
import type { FunctionalComponentProps } from '../generic-types';
import { SpanFC } from '../span/component';
import type { CollapsibleApi, CollapsibleVariant } from './api';

/**
 * Renders a collapsible — `kol-accordion` and `kol-details` — on the native `<details>`/`<summary>`
 * elements.
 *
 * `<summary>` is the disclosure control: one tab stop, keyboard handling and the expanded state
 * come from the user agent. It has to be the first child of `<details>`, so the heading sits inside
 * the control; label and icon render through `SpanFC`.
 *
 * `level` is forwarded as `level ?? 0` because `KolHeadingFc` falls back to level 1 on `undefined`,
 * while the collapsible's own `_level` default is 0 — the bold `<strong>` rendering.
 *
 * `open` on `<details>` and the `--open` modifier are driven separately: the attribute has to be set
 * before the modifier flips so the grid transition has a from-state, and it has to outlive the
 * modifier on close so the collapse is visible. The web component owns that sequencing; the FC only
 * renders what it is told.
 */
export const CollapsibleFC: FC<FunctionalComponentProps<CollapsibleApi> & CollapsibleVariant> = (
	{ block, contentClass, controlId, detailsOpen, disabled, expanded, handleToggle, headingId, icons, label, level, refHeadingButton, transitionMs },
	children,
) => {
	const blockBem = getBlockBem(block);

	return (
		<details
			class={blockBem({
				disabled: disabled === true,
				open: expanded === true,
			})}
			open={detailsOpen === true}
			style={{ '--collapsible-transition-duration': `${transitionMs}ms` }}
		>
			<summary
				aria-controls={controlId}
				aria-disabled={disabled === true ? 'true' : undefined}
				class={blockBem('heading')}
				id={headingId}
				onClick={handleToggle}
				onMouseDown={disabled === true ? preventFocus : undefined}
				ref={refHeadingButton}
				tabIndex={disabled === true ? -1 : undefined}
			>
				<KolHeadingFc level={level ?? 0}>
					<SpanFC icons={icons} label={label} />
				</KolHeadingFc>
			</summary>
			<div class={blockBem('wrapper')}>
				<div class={blockBem('wrapper-animation')}>
					<div
						aria-hidden={expanded === false ? 'true' : undefined}
						aria-labelledby={headingId}
						class={clsx(blockBem('content'), contentClass)}
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
