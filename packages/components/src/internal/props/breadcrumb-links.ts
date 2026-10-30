import type { BreadcrumbLinkProps } from '../../schema';
import { createLinksPropDefinition } from './helpers/links';

export const breadcrumbLinksProp = createLinksPropDefinition<BreadcrumbLinkProps>('KolBreadcrumb');
