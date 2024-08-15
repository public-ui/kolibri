import type { ComponentKeys, ResourcePrefix } from './core/i18n';
import { getI18nInstance, initializeI18n } from './core/i18n';
import { processEnv } from './schema';

type Options = {
	count?: number;
	placeholders?: { [K: string]: string };
};

export type TranslationKey = `${Lowercase<ResourcePrefix>}-${Lowercase<ComponentKeys>}`;

export let translate = (key: TranslationKey, options?: Options): string => {
	const i18n = getI18nInstance() ?? initializeI18n('de');
	return i18n.translate(key, options) || '';
};

if (processEnv === 'test') {
	translate = (key): string => key;
}
