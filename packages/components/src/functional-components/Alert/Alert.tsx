import { type FunctionalComponent as FC, h } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import clsx from 'clsx';

import { type InternalAlertProps } from '../../schema';
import { translate } from '../../i18n';
import { KolButtonWcTag } from '../../core/component-names';

import AlertIcon from '../AlertIcon';
import KolHeadingFc from '../Heading';

export type KolAlertFcProps = JSXBase.HTMLAttributes<HTMLDivElement> &
	Partial<Omit<InternalAlertProps, 'on'>> & {
		onCloserClick?: () => void;
		onAlertTimeout?: () => void;
	};

const KolAlertFc: FC<KolAlertFcProps> = (props, children) => {
	const { class: classNames = {}, type = 'default', variant = 'msg', label, hasCloser, alert, onAlertTimeout, onCloserClick, level, ...other } = props;

	if (alert) {
		/**
		 * - https://developer.mozilla.org/de/docs/Web/API/Navigator/vibrate
		 * - https://googlechrome.github.io/samples/vibration/
		 * - Ongoing discussion: https://github.com/public-ui/kolibri/issues/7191
		 * @todo Move side-effect out of render-function to avoid multiple incarnations.
		 */
		if (navigator.userActivation?.hasBeenActive) {
			navigator?.vibrate?.([100, 75, 100, 75, 100]);
		}

		setTimeout(() => {
			onAlertTimeout?.();
		}, 10000);
	}

	const rootProps: Partial<JSXBase.HTMLAttributes<HTMLDivElement>> = {
		class: clsx('kol-alert', `kol-alert--${type}`, `kol-alert--${variant}`, { 'kol-alert--hasCloser': !!hasCloser }, classNames),
		role: alert ? 'alert' : undefined,
		...other,
	};

	return (
		<div {...rootProps}>
			<div class="kol-alert__container">
				<AlertIcon label={label} type={type} />
				<div class="kol-alert__container-content">
					{label ? (
						<KolHeadingFc class="kol-alert__heading" level={level}>
							{label}
						</KolHeadingFc>
					) : null}
					{variant === 'msg' && <div class="kol-alert__content">{children}</div>}
				</div>
				{hasCloser && (
					<KolButtonWcTag
						class="kol-alert__close-button close"
						data-testid="alert-close-button"
						_ariaDescription={label?.trim() || ''}
						_hideLabel
						_icons={{
							left: {
								icon: 'codicon codicon-close',
							},
						}}
						_label={translate('kol-close-alert')}
						_on={{ onClick: onCloserClick }}
						_tooltipAlign="left"
					></KolButtonWcTag>
				)}
			</div>
			{variant === 'card' && <div class="kol-alert__content">{children}</div>}
		</div>
	);
};

export default KolAlertFc;
