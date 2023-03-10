import { Theme } from '@a11y-ui/core';
import { KeyEnum } from './i18n-keys';
import { TagEnum } from './tag-names';

export type KoliBriPrefix = "kol";

export const KoliBri = new Theme<KoliBriPrefix, keyof typeof KeyEnum, keyof typeof TagEnum>("kol", KeyEnum, TagEnum);
