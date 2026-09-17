import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { KolButtonWcTag } from '../../../core/component-names';
import { getHeadlineTag } from '../../../functional-components/Heading/Heading';
import { bem } from '../../../schema/bem-registry';
import clsx from '../../../utils/clsx';
import type { HeadingLevel } from '../../props';
import { BemRootNodeFC } from '../bem-root-node/component';

/** The two collapsible-style BEM blocks; both register the same five collapsible elements. */
type CollapsibleBlock = 'kol-accordion' | 'kol-details';

type CollapsibleFCProps = {
	/** BEM block whose root and element classes are rendered. */
	block: CollapsibleBlock;
	/** DOM id of the collapsible content region, referenced by the toggle button's aria-controls. */
	controlId: string;
	/** Additional class on the content region (details indents its content via `indented-text`). */
	contentClass?: string;
	/** Click handler bound to the heading toggle button. */
	handleToggle: (event: MouseEvent) => void;
	/** DOM id of the heading toggle button, referenced by the content region's aria-labelledby. */
	headingId: string;
	/** Icon rendered in the heading button (accordion: open-dependent chevron, details: fixed). */
	icon: string;
	/** Ref for the heading toggle button host element. */
	refHeadingButton: (element?: HTMLKolButtonWcElement) => void;
	disabled?: boolean;
	label: string;
	level: HeadingLevel;
	open?: boolean;
};

/** Per-block BEM element-class generators; both blocks expose the same five elements. */
const collapsibleBem: Record<CollapsibleBlock, (element: 'content' | 'heading' | 'heading-button' | 'wrapper' | 'wrapper-animation') => string> = {
	'kol-accordion': bem.forBlock('kol-accordion'),
	'kol-details': bem.forBlock('kol-details'),
};

/**
 * Renders the shared collapsible shell (heading with toggle button plus wrapper/animation/content
 * scaffolding) as a single BEM root. Used by the details and accordion functional components,
 * which differ only in BEM block, icon and content class.
 *
 * The heading button is intentionally still rendered as the transitional `kol-button-wc` element:
 * dropping its host node would move the `<block>__heading-button` class onto the same element as
 * `kol-button` and break theme selectors that target the host as an ancestor (e.g. ecl
 * `.kol-details__heading-button .kol-button`, default `.kol-accordion__heading-button .kol-icon`).
 */
export const CollapsibleFC: FC<CollapsibleFCProps> = (
	{ block, controlId, contentClass, disabled, handleToggle, headingId, icon, label, level, open, refHeadingButton },
	children,
) => {
	const HeadlineTag = getHeadlineTag(level);
	const blockBem = collapsibleBem[block];

	return (
		<BemRootNodeFC
			block={block}
			class={clsx('collapsible', {
				'collapsible--disabled': disabled === true,
				'collapsible--open': open === true,
			})}
		>
			<HeadlineTag class={clsx('kol-headline', `kol-headline--${HeadlineTag}`, 'collapsible__heading', blockBem('heading'), 'kol-headline--single')}>
				<KolButtonWcTag
					class={clsx('collapsible__heading-button', blockBem('heading-button'))}
					id={headingId}
					ref={refHeadingButton}
					slot="expert"
					_ariaControls={controlId}
					_ariaExpanded={open}
					_disabled={disabled}
					_icons={icon}
					_label={label}
					_on={{ onClick: handleToggle }}
				></KolButtonWcTag>
			</HeadlineTag>
			<div class={clsx('collapsible__wrapper', blockBem('wrapper'))}>
				<div class={clsx('collapsible__wrapper-animation', blockBem('wrapper-animation'))}>
					<div
						aria-hidden={open === false ? 'true' : undefined}
						aria-labelledby={headingId}
						class={clsx('collapsible__content', blockBem('content'), contentClass)}
						id={controlId}
						role="region"
					>
						{children}
					</div>
				</div>
			</div>
		</BemRootNodeFC>
	);
};
