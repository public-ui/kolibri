import type { RegisterOptions } from 'adopted-style-sheets';
import { configI18n } from './i18n';

type KoliBriConfigOptions = Omit<RegisterOptions, 'theme'> & {
	// transformTagName?: (tagName: string) => string;
};

export const configKoliBri = async (options: KoliBriConfigOptions) => {
	await configI18n(options.translation?.name ?? 'de', options?.translations);
	// configTransformTagName(options.transformTagName);
};
