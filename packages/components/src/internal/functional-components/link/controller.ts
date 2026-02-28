import type {
	AccessKeyProp,
	AriaCurrentValueProp,
	CustomClassProp,
	DisabledProp,
	DownloadProp,
	HideLabelProp,
	HrefProp,
	InlineProp,
	LabelProp,
	LinkTargetProp,
	ShortKeyProp,
	TabIndexProp,
	VariantProp,
} from '../../props';
import {
	accessKeyProp,
	ariaCurrentValueProp,
	customClassProp,
	disabledProp,
	downloadProp,
	hideLabelProp,
	hrefProp,
	inlineProp,
	labelProp,
	linkTargetProp,
	shortKeyProp,
	tabIndexProp,
	variantProp,
	withValidPropValue,
} from '../../props';
import { BaseController } from '../base-controller';
import type { ControllerInterface, ResolvedInputProps } from '../generic-types';
import type { LinkApi } from './api';

export class LinkController extends BaseController<LinkApi> implements ControllerInterface<LinkApi> {
	private anchorRef?: HTMLAnchorElement;

	public constructor(states: LinkApi['States']) {
		super(states, {
			accessKey: '',
			ariaCurrentValue: 'page',
			customClass: '',
			disabled: false,
			download: '',
			hideLabel: false,
			href: '',
			inline: true,
			label: '',
			target: '',
			shortKey: '',
			tabIndex: 0,
			variant: '',
		});
	}

	public componentWillLoad(props: ResolvedInputProps<LinkApi>): void {
		const { accessKey, ariaCurrentValue, customClass, disabled, download, hideLabel, href, inline, label, target, shortKey, tabIndex, variant } = props;

		this.watchAccessKey(accessKey);
		this.watchAriaCurrentValue(ariaCurrentValue);
		this.watchCustomClass(customClass);
		this.watchDisabled(disabled);
		this.watchDownload(download);
		this.watchHideLabel(hideLabel);
		this.watchHref(href);
		this.watchInline(inline);
		this.watchLabel(label);
		this.watchTarget(target);
		this.watchShortKey(shortKey);
		this.watchTabIndex(tabIndex);
		this.watchVariant(variant);
	}

	public watchAccessKey(value?: unknown): void {
		withValidPropValue<AccessKeyProp>(accessKeyProp, value, (v) => {
			this.setProp('accessKey', v);
		});
	}

	public watchAriaCurrentValue(value?: unknown): void {
		withValidPropValue<AriaCurrentValueProp>(ariaCurrentValueProp, value, (v) => {
			this.setProp('ariaCurrentValue', v);
		});
	}

	public watchCustomClass(value?: unknown): void {
		withValidPropValue<CustomClassProp>(customClassProp, value, (v) => {
			this.setProp('customClass', v);
		});
	}

	public watchDisabled(value?: unknown): void {
		withValidPropValue<DisabledProp>(disabledProp, value, (v) => {
			this.setProp('disabled', v);
			this.setState('disabled', v);
		});
	}

	public watchDownload(value?: unknown): void {
		withValidPropValue<DownloadProp>(downloadProp, value, (v) => {
			this.setProp('download', v);
		});
	}

	public watchHideLabel(value?: unknown): void {
		withValidPropValue<HideLabelProp>(hideLabelProp, value, (v) => {
			this.setProp('hideLabel', v);
			this.setState('hideLabel', v);
		});
	}

	public watchHref(value?: unknown): void {
		withValidPropValue<HrefProp>(hrefProp, value, (v) => {
			this.setProp('href', v);
		});
	}

	public watchInline(value?: unknown): void {
		withValidPropValue<InlineProp>(inlineProp, value, (v) => {
			this.setProp('inline', v);
			this.setState('inline', v);
		});
	}

	public watchLabel(value?: unknown): void {
		withValidPropValue<LabelProp>(labelProp, value, (v) => {
			this.setProp('label', v);
		});
	}

	public watchTarget(value?: unknown): void {
		withValidPropValue<LinkTargetProp>(linkTargetProp, value, (v) => {
			this.setProp('target', v);
		});
	}

	public watchShortKey(value?: unknown): void {
		withValidPropValue<ShortKeyProp>(shortKeyProp, value, (v) => {
			this.setProp('shortKey', v);
		});
	}

	public watchTabIndex(value?: unknown): void {
		withValidPropValue<TabIndexProp>(tabIndexProp, value, (v) => {
			this.setProp('tabIndex', v);
		});
	}

	public watchVariant(value?: unknown): void {
		withValidPropValue<VariantProp>(variantProp, value, (v) => {
			this.setProp('variant', v);
		});
	}

	public focus(): void {
		this.anchorRef?.focus();
	}

	public setAnchorRef = (element?: HTMLAnchorElement): void => {
		this.anchorRef = element;
	};

	public handleClick = (): void => {
		const { disabled } = this.getProps();
		if (!disabled) {
			// Callback will be triggered via the web component
		}
	};
}
