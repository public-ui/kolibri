import type { BreadcrumbLinkProps } from '../schema/index';
import { createLinksPropDefinition } from './helpers/links';

export const breadcrumbLinksProp = createLinksPropDefinition<BreadcrumbLinkProps>('KolBreadcrumb');
