import clsx from 'clsx';
import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';
import type { AlertProps, AlertType } from '../../../schema';
import { Log } from '../../../schema';
import { translate } from '../../../i18n';
import type { JSXBase } from '@stencil/core/internal';
import { KolButtonWcTag, KolIconTag } from '../../../core/component-names';
import { KolHeadingWc } from '../../heading/component';

type KolAlertFcProps = JSXBase.HTMLAttributes<HTMLDivElement> &
	AlertProps & {
		onCloserClick?: () => void;
		onVibrationTimeout?: () => void;
	};

const DEFAULT_PROPS: Partial<AlertProps> = {
	_level: 1,
	_variant: 'msg',
	_type: 'default',
};

const Icon = (props: { ariaLabel: string; icon: string; label?: string }) => {
	return <KolIconTag class="heading-icon" _label={props.label ? '' : props.ariaLabel} _icons={props.icon} />;
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

const HeadingContent: FC<KolAlertFcProps> = ({ _label, _level = DEFAULT_PROPS._level, _variant = DEFAULT_PROPS._variant }, children) => {
	const content: unknown[] = [];

	if (_label) {
		content.push(<KolHeadingWc _label={_label} _level={_level} />);
	}

	if (_variant === 'msg') {
		content.push(<Content>{children}</Content>);
	}

	return <div class="heading-content">{content}</div>;
};

const CloserButton: FC<{ label?: string; onClick?: () => void }> = (props) => {
	return (
		<KolButtonWcTag
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
	const {
		class: classNames = {},
		_type = DEFAULT_PROPS._type,
		_variant = DEFAULT_PROPS._variant,
		_label,
		_hasCloser,
		_alert,
		onVibrationTimeout,
		onCloserClick,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		_on,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		_level,
		...other
	} = props;

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

	const rootProps = {
		class: clsx(rootClasses, classNames),
		role: _alert ? 'alert' : undefined,
		...other,
	} as Partial<JSXBase.HTMLAttributes<HTMLDivElement>>;

	return (
		<div {...rootProps}>
			<div class="heading">
				<AlertIcon label={_label} type={_type} />
				<HeadingContent {...props}>{children}</HeadingContent>
				{_hasCloser && <CloserButton label={props._label} onClick={onCloserClick} />}
			</div>
			{_variant === 'card' && <Content>{children}</Content>}
		</div>
	);
};
