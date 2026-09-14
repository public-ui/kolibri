import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { KolButtonWcTag } from '../../../core/component-names';
import { getHeadlineTag } from '../../../functional-components/Heading/Heading';
import { translate } from '../../../i18n';
import { bem } from '../../../schema/bem-registry';
import clsx from '../../../utils/clsx';
import { BemRootNodeFC } from '../bem-root-node/component';
import type { FunctionalComponentProps } from '../generic-types';
import type { AlertApi } from './api';
import { AlertIconFC } from './icon';

const alertBem = bem.forBlock('kol-alert');
const BEM_CLASS_ALERT__CLOSER = alertBem('closer');
const BEM_CLASS_ALERT__CONTENT = alertBem('content');

/**
 * Renders the alert as a single BEM root: icon, optional heading, optional closer button and the
 * content region.
 *
 * The closer button is intentionally still rendered as the transitional `kol-button-wc` element:
 * theme selectors target `.kol-alert__closer .kol-button` (e.g. default, bwst) — rendering
 * `ButtonFC` directly would move the `kol-button` class onto the `kol-alert__closer` element and
 * break those selectors. Migrating that consumer is tracked separately.
 *
 * All remaining HTML attributes (`id`, `role`, `aria-*`, `ref`, …) are forwarded onto the root
 * node — internal consumers (form, form-field-msg, toast-item) rely on that passthrough.
 */
export const AlertFC: FC<FunctionalComponentProps<AlertApi>> = (props, children) => {
	const { alert, class: classNames, handleCloserClick, hasCloser, headingId, label, level, type, variant, ...other } = props;

	const translateCloseAlert = translate('kol-close-alert');
	const HeadlineTag = getHeadlineTag(level);

	return (
		<BemRootNodeFC
			block="kol-alert"
			class={classNames}
			modifiers={{
				hasCloser: hasCloser === true,
				[`type-${type}`]: true,
				[`variant-${variant}`]: true,
			}}
			role={alert ? 'alert' : undefined}
			{...other}
		>
			<AlertIconFC type={type} />

			{label.length > 0 && (
				<HeadlineTag
					class={clsx('kol-headline', `kol-headline--${HeadlineTag}`, alertBem('heading', { [`h${level}`]: true }), 'kol-headline--single')}
					id={headingId}
				>
					{label}
				</HeadlineTag>
			)}

			{hasCloser && (
				<KolButtonWcTag
					class={clsx(BEM_CLASS_ALERT__CLOSER, 'kol-close-button')}
					_ariaDescription={label.trim() || ''}
					_hideLabel
					_icons={{
						left: {
							icon: 'kolicon-cross',
						},
					}}
					_label={translateCloseAlert}
					_on={{ onClick: handleCloserClick }}
					_tooltipAlign="left"
				/>
			)}

			<div aria-describedby={label.length > 0 ? headingId : undefined} class={BEM_CLASS_ALERT__CONTENT}>
				{children}
			</div>
		</BemRootNodeFC>
	);
};
