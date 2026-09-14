import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { KolButtonWcTag } from '../../../core/component-names';
import { getHeadlineTag } from '../../../functional-components/Heading/Heading';
import { bem } from '../../../schema/bem-registry';
import clsx from '../../../utils/clsx';
import { BemRootNodeFC } from '../bem-root-node/component';
import type { FunctionalComponentProps } from '../generic-types';
import type { DetailsApi } from './api';

const detailsBem = bem.forBlock('kol-details');

/**
 * Renders the details component as a single BEM root.
 *
 * The heading button is intentionally still rendered as the transitional `kol-button-wc` element:
 * dropping its host node would move the `kol-details__heading-button` class onto the same element
 * as `kol-button` and break theme selectors that target the host as an ancestor (e.g. ecl
 * `.kol-details__heading-button .kol-button`). See the companion plan for the full rationale.
 */
export const DetailsFC: FC<FunctionalComponentProps<DetailsApi>> = (
	{ controlId, disabled, handleToggle, headingId, label, level, open, refHeadingButton },
	children,
) => {
	const HeadlineTag = getHeadlineTag(level);

	return (
		<BemRootNodeFC
			block="kol-details"
			class={clsx('collapsible', {
				'collapsible--disabled': disabled === true,
				'collapsible--open': open === true,
			})}
		>
			<HeadlineTag class={clsx('kol-headline', `kol-headline--${HeadlineTag}`, 'collapsible__heading', detailsBem('heading'), 'kol-headline--single')}>
				<KolButtonWcTag
					class={clsx('collapsible__heading-button', detailsBem('heading-button'))}
					id={headingId}
					ref={refHeadingButton}
					slot="expert"
					_ariaControls={controlId}
					_ariaExpanded={open}
					_disabled={disabled}
					_icons="kolicon-chevron-right"
					_label={label}
					_on={{ onClick: handleToggle }}
				></KolButtonWcTag>
			</HeadlineTag>
			<div class={clsx('collapsible__wrapper', detailsBem('wrapper'))}>
				<div class={clsx('collapsible__wrapper-animation', detailsBem('wrapper-animation'))}>
					<div
						aria-hidden={open === false ? 'true' : undefined}
						aria-labelledby={headingId}
						class={clsx('collapsible__content', detailsBem('content'), 'indented-text')}
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
