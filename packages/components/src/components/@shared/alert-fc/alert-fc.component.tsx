import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';
import type { AlertProps, AlertType } from '../../../schema';
import { Log } from '../../../schema';
import { translate } from '../../../i18n';

type KolAlertFcProps = AlertProps & {
	onCloserClick?: () => void;
	onVibrationTimeout?: () => void;
};

const Icon = (props: { ariaLabel: string; icon: string; label?: string }) => {
	return <kol-icon class="heading-icon" _label={props.label ? '' : props.ariaLabel} _icons={props.icon} />;
};

const AlertIcon = (props: { label?: string; type?: AlertType }) => {
	switch (props.type) {
		case 'error':
			return <Icon ariaLabel={translate('kol-error')} icon="codicon codicon-error" label={props.label} />;
		case 'info':
			return <Icon ariaLabel={translate('kol-info')} icon="codicon codicon-info" label={props.label} />;
		case 'warning':
			return <Icon ariaLabel={translate('kol-warning')} icon="codicon codicon-warning" label={props.label} />;
		case 'success':
			return <Icon ariaLabel={translate('kol-success')} icon="codicon codicon-pass" label={props.label} />;
		default:
			return <Icon ariaLabel={translate('kol-message')} icon="codicon codicon-comment" label={props.label} />;
	}
};

const Content: FC = (_, children) => {
	return <div class="content">{children}</div>;
};

const HeadingContent: FC<KolAlertFcProps> = ({ _label, _level = 1, _variant = 'msg' }, children) => {
	const content: unknown[] = [];

	if (_label) {
		content.push(<kol-heading-wc _label={_label} _level={_level} />);
	}

	if (_variant === 'msg') {
		content.push(<Content>{children}</Content>);
	}

	return <div class="heading-content">{content}</div>;
};

const CloserButton: FC<{ label?: string; onClick?: () => void }> = (props) => {
	return (
		<kol-button-wc
			class="close"
			_ariaDescription={props.label?.trim() || ''}
			_hideLabel
			_icons={{
				left: {
					icon: 'codicon codicon-close',
				},
			}}
			_label={translate('kol-close-alert')}
			_on={{ onClick: props.onClick }}
			_tooltipAlign="left"
		/>
	);
};

export const KolAlertFc: FC<KolAlertFcProps> = (props, children) => {
	const { _type = 'default', _variant = 'msg', _label, _hasCloser, _alert, onVibrationTimeout, onCloserClick } = props;

	if (_alert) {
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

	const rootClasses = {
		'kol-alert-wc': true,
		alert: true,
		[_type as string]: true,
		[_variant as string]: true,
		hasCloser: !!_hasCloser,
	};

	return (
		<div class={rootClasses} role={_alert ? 'alert' : undefined}>
			<div class="heading">
				<AlertIcon label={_label} type={_type} />
				<HeadingContent {...props}>{children}</HeadingContent>
				{_hasCloser && <CloserButton label={props._label} onClick={onCloserClick} />}
			</div>
			{_variant === 'card' && <Content>{children}</Content>}
		</div>
	);
};
