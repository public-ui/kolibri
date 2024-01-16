import type { Generic, ThemeDetails } from 'adopted-style-sheets';

declare global {
	interface Window {
		A11yUi: {
			Theme?: ThemeDetails;
			Themes?: Record<string, Generic.Theming.Map<string, string>>;
		} & Record<string, unknown>;
	}
}
