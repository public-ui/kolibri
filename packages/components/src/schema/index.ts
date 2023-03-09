import { Theme } from '@a11y-ui/core';
import { KeyEnum } from './i18n-keys';
import { TagEnum } from './tag-names';

export const KoliBri = new Theme<'kol', keyof typeof KeyEnum, keyof typeof TagEnum>('kol', KeyEnum, TagEnum);
