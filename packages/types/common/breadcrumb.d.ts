export enum SAOBreadcrumbSeparators {
  Arrow = 'arrow',
  Slash = 'slash',
}

export type SAOBreadcrumbSeparatorType =
  | SAOBreadcrumbSeparators
  | `${SAOBreadcrumbSeparators}`
  | 'arrow'
  | 'slash';
