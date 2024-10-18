import { h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import clsx from 'clsx';

import { KolButtonWcTag, KolHeadingWcTag, KolIconTag } from '../../../core/component-names';
import type { AlertType, InternalAlertProps } from '../../../schema';
import { Log } from '../../../schema';
import { translate } from '../../../i18n';

const Icon: FC<{ ariaLabel: string; icon: string; label?: string }> = (props) => {
	return <KolIconTag class="heading-icon" _label={props.label ? '' : props.ariaLabel} _icons={props.icon} />;
};

const AlertIcon: FC<{ label?: string; type?: AlertType }> = ({ type, label }) => {
	switch (type) {
		case 'error':
			return <Icon ariaLabel={translate('kol-error')} icon="codicon codicon-error" label={label} />;
		case 'info':
			return <Icon ariaLabel={translate('kol-info')} icon="codicon codicon-info" label={label} />;
		case 'warning':
			return <Icon ariaLabel={translate('kol-warning')} icon="codicon codicon-warning" label={label} />;
		case 'success':
			return <Icon ariaLabel={translate('kol-success')} icon="codicon codicon-pass" label={label} />;
		default:
			return <Icon ariaLabel={translate('kol-message')} icon="codicon codicon-comment" label={label} />;
	}
};

export type KolAlertFcProps = JSXBase.HTMLAttributes<HTMLDivElement> &
	Partial<Omit<InternalAlertProps, 'on'>> & {
		onCloserClick?: () => void;
		onVibrationTimeout?: () => void;
	};

const KolAlertFc: FC<KolAlertFcProps> = (props, children) => {
	const { class: classNames = {}, type = 'default', variant = 'msg', label, hasCloser, alert, onVibrationTimeout, onCloserClick, level, ...other } = props;

	if (alert && navigator.vibrate) {
		/**
		 * - https://developer.mozilla.org/de/docs/Web/API/Navigator/vibrate
		 * - https://googlechrome.github.io/samples/vibration/
		 */
		try {
			Log.debug(['Navigator should vibrate ...', navigator.vibrate([100, 75, 100, 75, 100])]);
		} catch (e) {
			Log.debug('Navigator does not support vibration.');
		}

		setTimeout(() => {
			onVibrationTimeout?.();
		}, 10000);
	}

	const rootProps = {
		class: clsx('kol-alert-wc', 'alert', type, variant, { hasCloser: !!hasCloser }, classNames),
		role: alert ? 'alert' : undefined,
		...other,
	} as Partial<JSXBase.HTMLAttributes<HTMLDivElement>>;

	return (
		<div {...rootProps}>
			<div class="heading">
				<AlertIcon label={label} type={type} />
				<div class="heading-content">
					{label ? <KolHeadingWcTag _label={label} _level={level} /> : null}
					{variant === 'msg' && <div class="content">{children}</div>}
				</div>
				{hasCloser && (
					<KolButtonWcTag
						class="close"
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
			{variant === 'card' && <div class="content">{children}</div>}
		</div>
	);
};

export default KolAlertFc;
