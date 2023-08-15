import { ToasterService as ToasterServiceInternal } from './components/toast/toaster';

export { register } from './core';
export * from './components.d';
export * from './enums/bund';
export * from './kolibri';
export { configKoliBri } from './utils/dev.utils';
export { Optgroup, Option, SelectOption } from './types/input/types';
export { KoliBriDevHelper } from './utils/prop.validators';
export { Toaster } from './components/toast/toaster';
export { translations } from './i18n';

/**
 * @deprecated Use Toaster instead
 */
export const ToasterService = ToasterServiceInternal;
