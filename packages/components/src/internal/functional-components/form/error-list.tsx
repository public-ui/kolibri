import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { translate } from '../../../i18n';
import { bem } from '../../../schema/bem-registry';
import { AlertFC } from '../alert/component';
import { LinkFC } from '../link/component';
import type { FormErrorLinkItem } from './error-link-item';

const formBem = bem.forBlock('kol-form');
const BEM_CLASS_FORM__ALERT = formBem('alert');
const BEM_CLASS_FORM__LINK = formBem('link');

type FormErrorListFCProps = {
	/** DOM id of the alert heading, referenced by the alert content's aria-describedby. */
	alertHeadingId: string;
	/** DOM id the alert's closer would reference; the error list renders no closer. */
	closerAriaDescriptionId: string;
	/** Orchestrated entries, built by `createFormErrorLinkItem`. */
	errorLinkItems: FormErrorLinkItem[];
};

/**
 * Renders the form's error summary: one alert holding a navigation list of links, each focusing
 * the form control its message belongs to.
 *
 * `__link` stays a wrapper around the link rather than merging onto its BEM root: themes give it
 * `display: inline-block`, which on the root would replace the link block's own `inline-flex` and
 * change how the message wraps. The wrapper keeps that rule on the same box as before.
 */
export const FormErrorListFC: FC<FormErrorListFCProps> = ({ alertHeadingId, closerAriaDescriptionId, errorLinkItems }) => (
	<AlertFC
		alert={false}
		class={BEM_CLASS_FORM__ALERT}
		closerAriaDescriptionId={closerAriaDescriptionId}
		handleCloserClick={() => undefined}
		hasCloser={false}
		headingId={alertHeadingId}
		label={translate('kol-error-list-message')}
		level={0}
		refCloserButton={() => undefined}
		refCloserTooltip={() => undefined}
		type="error"
		variant="card"
	>
		<nav aria-label={translate('kol-error-list')}>
			<ul>
				{errorLinkItems.map((item, index) => (
					<li key={index}>
						<span class={BEM_CLASS_FORM__LINK}>
							<LinkFC {...item.fcProps} />
						</span>
					</li>
				))}
			</ul>
		</nav>
	</AlertFC>
);
