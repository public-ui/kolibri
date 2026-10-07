import type { BreadcrumbLinkProps } from '../../schema';
import type { LinksProp } from './helpers/links';
import { createLinksPropDefinition } from './helpers/links';

export type BreadcrumbLinksProp = LinksProp<BreadcrumbLinkProps>;

export const breadcrumbLinksProp = createLinksPropDefinition<BreadcrumbLinkProps>('KolBreadcrumb');
