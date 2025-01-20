import { SAOBreadcrumbSeparators } from './breadcrumb.enum';

export type SAOBreadcrumbSeparatorType =
  | SAOBreadcrumbSeparators
  | `${SAOBreadcrumbSeparators}`
  | 'arrow'
  | 'slash';
