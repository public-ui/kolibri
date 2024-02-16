import { Theme } from 'adopted-style-sheets';

import { KeyEnum } from './i18n-keys';
import { TagEnum } from './tag-names';

export const KoliBri = new Theme<'kol', keyof typeof KeyEnum, keyof typeof TagEnum>('kol', KeyEnum, TagEnum);

export * from './components';
// export * from './enums'; only for internal use
export * from './props';
export * from './types';
export * from './utils';
export * from './validators';
