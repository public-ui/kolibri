import type { PropInline } from '../props';
import type { Members } from '../types/members';
import type { OptionalButtonProps, RequiredButtonProps } from './button';

type RequiredProps = RequiredButtonProps;
type OptionalProps = OptionalButtonProps & PropInline;

export type ButtonLinkProps = Members<RequiredProps, OptionalProps>;
