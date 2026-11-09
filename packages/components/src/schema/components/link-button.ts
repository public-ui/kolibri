import type { PropAlternativeButtonLinkRole, PropCustomClass, PropInline, PropVariantClassName } from '../props';
import type { Members } from '../types/members';
import type { OptionalProps as LinkOptionalProps, RequiredProps as LinkRequiredProps } from './link';

type RequiredProps = LinkRequiredProps;
type OptionalProps = Omit<LinkOptionalProps, keyof PropAlternativeButtonLinkRole> & PropVariantClassName & PropCustomClass & PropInline; // _role is fixed to "button"

export type LinkButtonProps = Members<RequiredProps, OptionalProps>;
