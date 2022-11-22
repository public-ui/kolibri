import { Generic } from '@a11y-ui/core';
import { BehaviorSubject } from 'rxjs';

export class TranslationService<Prefix extends string, Key extends string> {
	private subject: BehaviorSubject<Record<string, string | undefined>> = new BehaviorSubject({});

	private currentLocale!: Generic.I18n.Locale.ISO_639_1;
	private language: Map<Generic.I18n.Locale.ISO_639_1, Record<string, string | undefined>> = new Map();

	constructor(
		maps:
			| Generic.I18n.RegisterPatch<Generic.I18n.Locale.ISO_639_1, Prefix, Key>
			| Generic.I18n.RegisterPatch<Generic.I18n.Locale.ISO_639_1, Prefix, Key>[]
			| Set<Generic.I18n.RegisterPatch<Generic.I18n.Locale.ISO_639_1, Prefix, Key>>,
		locale?: Generic.I18n.Locale.ISO_639_1
	) {
		const registeredLocales = this.registerTranslation(maps);
		this.setLocale(locale || registeredLocales[0] || 'de');
	}

	private patchTranslation = <Locale extends Generic.I18n.Locale.ISO_639_1>(language: Locale, translationMap: Generic.I18n.Map<Prefix, Key>): Locale => {
		let currentMap = this.language.get(language);
		if (currentMap === null) {
			currentMap = { ...translationMap };
		} else {
			currentMap = { ...currentMap, ...translationMap };
		}
		return language;
	};

	public readonly observe = this.subject.asObservable();

	public addTranslation(
		maps:
			| Generic.I18n.RegisterPatch<Generic.I18n.Locale.ISO_639_1, Prefix, Key>
			| Generic.I18n.RegisterPatch<Generic.I18n.Locale.ISO_639_1, Prefix, Key>[]
			| Set<Generic.I18n.RegisterPatch<Generic.I18n.Locale.ISO_639_1, Prefix, Key>>
	) {
		this.registerTranslation(maps);
		this.setLocale(this.currentLocale);
	}

	public setLocale(locale: Generic.I18n.Locale.ISO_639_1) {
		this.currentLocale = locale;
		if (this.language.has(locale)) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			this.subject.next({ ...this.language.get(locale)! });
		} else {
			throw new Error('');
		}
	}

	private registerTranslation(
		maps:
			| Generic.I18n.RegisterPatch<Generic.I18n.Locale.ISO_639_1, Prefix, Key>
			| Generic.I18n.RegisterPatch<Generic.I18n.Locale.ISO_639_1, Prefix, Key>[]
			| Set<Generic.I18n.RegisterPatch<Generic.I18n.Locale.ISO_639_1, Prefix, Key>>
	): Generic.I18n.Locale.ISO_639_1[] {
		if (Array.isArray(maps)) {
			maps = new Set(maps);
		} else if (typeof maps === 'function') {
			maps = new Set([maps]);
		}

		const locales: Generic.I18n.Locale.ISO_639_1[] = [];
		maps.forEach((map) => {
			locales.push(map(this.patchTranslation));
		});
		return locales;
	}
}
