// Global window members the runtime shares (copies of the components package's core/declare.d.ts
// and kolibri.d.ts; the fc type program follows the internals sources, which read these).
import type { Generic, ThemeDetails } from 'adopted-style-sheets';

declare global {
	interface Window {
		A11yUi: {
			Theme?: ThemeDetails;
			Themes?: Record<string, Generic.Theming.Map<string, string>>;
		} & Record<string, unknown>;
		KoliBri: Record<string, unknown>;
	}
}

export {};
