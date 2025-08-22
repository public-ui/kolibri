import type { Generic } from 'adopted-style-sheets';

import type { PropButtonVariant, PropCustomClass, PropLinkVariant } from '../props';
import type { OptionalProps as LinkOptionalProps, RequiredProps as LinkRequiredProps } from './link';

type RequiredProps = LinkRequiredProps;
type OptionalProps = Omit<LinkOptionalProps, 'role' | keyof PropLinkVariant> & PropButtonVariant & PropCustomClass;

export type LinkButtonProps = Generic.Element.Members<RequiredProps, OptionalProps>;
