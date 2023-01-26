import type { Generic, ThemeDetails } from '@a11y-ui/core';
import { II18nService } from './i18n';

declare global {
	interface Window {
		A11yUi: {
			Theme?: ThemeDetails;
			Themes?: Record<string, Generic.Theming.Map<string, string>>;
			I18n: II18nService;
		} & Record<string, unknown>;
	}
}
