import { getThemeVariantDataKey, sampleAppDataService } from './sampleAppDataService';

export function fetchVariantData(theme: string, variant: string): string[] {
	const json = sampleAppDataService.getValue<Record<string, unknown>>(getThemeVariantDataKey(theme));
	const data = json?.[variant];
	if (Array.isArray(data)) {
		return data.filter((item): item is string => typeof item === 'string');
	}
	return [];
}
