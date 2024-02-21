/*!
 * KoliBri - The accessible HTML-Standard
 */
import { devHint } from "@public-ui/schema";
import { getI18nService } from "..";
import locale_de from "../locales/de";
import locale_en from "../locales/en";
const mapLocaleKeys = (locale) => Object.keys(locale).reduce((a, c) => ((a[`${'kol'}-${c}`] = locale[c]), a), {});
export const translations = new Set([
    (t) => t('en', mapLocaleKeys(locale_en)),
    (t) => t('de', mapLocaleKeys(locale_de)),
]);
export const translate = (key, options) => {
    const i18n = getI18nService();
    if (i18n === undefined) {
        devHint('[I18n] I18nService not available! Please call the global register function.');
        return key;
    }
    let text = i18n.translate(key, options);
    if (text === key) {
        devHint('[I18n] Locales not initialized! Initialize default locales automatically.');
        translations.forEach((t) => t((l, t) => {
            i18n.addResourceBundle(l, t);
            return l;
        }));
        text = i18n.translate(key, options);
    }
    return text;
};
//# sourceMappingURL=i18n.js.map
