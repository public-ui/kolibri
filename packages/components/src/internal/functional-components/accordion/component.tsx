import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { KolButtonWcTag } from '../../../core/component-names';
import { getHeadlineTag } from '../../../functional-components/Heading/Heading';
import { bem } from '../../../schema/bem-registry';
import clsx from '../../../utils/clsx';
import { BemRootNodeFC } from '../bem-root-node/component';
import type { FunctionalComponentProps } from '../generic-types';
import type { AccordionApi } from './api';

const accordionBem = bem.forBlock('kol-accordion');

/**
 * Renders the accordion component as a single BEM root.
 *
 * The heading button is intentionally still rendered as the transitional `kol-button-wc` element:
 * dropping its host node would move the `kol-accordion__heading-button` class onto the same element
 * as `kol-button` and break theme selectors that target the host as an ancestor (e.g. default
 * `.kol-accordion__heading-button .kol-button`). See the companion plan for the full rationale.
 */
export const AccordionFC: FC<FunctionalComponentProps<AccordionApi>> = (
	{ controlId, disabled, handleToggle, headingId, label, level, open, refHeadingButton },
	children,
) => {
	const HeadlineTag = getHeadlineTag(level);

	return (
		<BemRootNodeFC
			block="kol-accordion"
			class={clsx('collapsible', {
				'collapsible--disabled': disabled === true,
				'collapsible--open': open === true,
			})}
		>
			<HeadlineTag class={clsx('kol-headline', `kol-headline--${HeadlineTag}`, 'collapsible__heading', accordionBem('heading'), 'kol-headline--single')}>
				<KolButtonWcTag
					class={clsx('collapsible__heading-button', accordionBem('heading-button'))}
					id={headingId}
					ref={refHeadingButton}
					slot="expert"
					_ariaControls={controlId}
					_ariaExpanded={open}
					_disabled={disabled}
					_icons={open ? 'kolicon-chevron-down' : 'kolicon-chevron-right'}
					_label={label}
					_on={{ onClick: handleToggle }}
				></KolButtonWcTag>
			</HeadlineTag>
			<div class={clsx('collapsible__wrapper', accordionBem('wrapper'))}>
				<div class={clsx('collapsible__wrapper-animation', accordionBem('wrapper-animation'))}>
					<div
						aria-hidden={open === false ? 'true' : undefined}
						aria-labelledby={headingId}
						class={clsx('collapsible__content', accordionBem('content'))}
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
