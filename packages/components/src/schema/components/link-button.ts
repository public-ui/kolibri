import type { Generic } from 'adopted-style-sheets';

import type { PropAlternativeButtonLinkRole, PropCustomClass, PropInline, PropVariantClassName } from '../props';
import type { OptionalProps as LinkOptionalProps, RequiredProps as LinkRequiredProps } from './link';

type RequiredProps = LinkRequiredProps;
type OptionalProps = Omit<LinkOptionalProps, keyof PropAlternativeButtonLinkRole> & PropVariantClassName & PropCustomClass & PropInline; // _role is fixed to "button"

export type LinkButtonProps = Generic.Element.Members<RequiredProps, OptionalProps>;
