import { Theme } from '@a11y-ui/core';

enum TagEnum {
	'form-login',
}

enum KeyEnum {}

export const KoliBri = new Theme<'{{kebab name}}', keyof typeof KeyEnum, keyof typeof TagEnum>('{{kebab name}}', KeyEnum, TagEnum);
