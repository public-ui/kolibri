import type { RegisterOptions } from 'adopted-style-sheets';
import { configI18n } from './i18n';

type KoliBriConfigOptions = Omit<RegisterOptions, 'theme'>;

export const configKoliBri = async (options: KoliBriConfigOptions): Promise<void> => {
	await configI18n(options?.translation?.name ?? 'de', options?.translations);
};
