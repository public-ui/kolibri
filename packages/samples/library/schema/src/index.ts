import { Theme } from 'adopted-style-sheets';

import { KeyEnum } from './i18n-keys';
import { TagEnum } from './tag-names';

export const Demo = new Theme<'demo', keyof typeof KeyEnum, keyof typeof TagEnum>('demo', KeyEnum, TagEnum);

export * from './components';
// export * from './props';
// export * from './types';
// export * from './validators';
