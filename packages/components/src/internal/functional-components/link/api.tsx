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
import type { ComponentApi, InternalOf } from '../generic-types';

export interface LinkApi extends ComponentApi {
	Props: {
		Optional: AccessKeyProp &
			AriaCurrentValueProp &
			CustomClassProp &
			DisabledProp &
			DownloadProp &
			HideLabelProp &
			InlineProp &
			LabelProp &
			LinkTargetProp &
			ShortKeyProp &
			TabIndexProp &
			VariantProp;
		Required: HrefProp;
	};
	States: InternalOf<DisabledProp> & InternalOf<HideLabelProp> & InternalOf<InlineProp> & { ariaCurrent?: string };
	Methods: {
		focus: () => void;
	};
	Callbacks: {
		click: (href: string) => void;
	};
	Refs: {
		anchor: HTMLAnchorElement;
	};
}
