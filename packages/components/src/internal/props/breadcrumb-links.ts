import type { BreadcrumbLinkProps, Stringified } from '../../schema';
import type { Prop } from './helpers/factory';
import { createLinksPropDefinition } from './helpers/links';

export type BreadcrumbLinksProp = Prop<'links', Stringified<BreadcrumbLinkProps[]>, BreadcrumbLinkProps[]>;

export const breadcrumbLinksProp = createLinksPropDefinition<BreadcrumbLinkProps>('KolBreadcrumb');
