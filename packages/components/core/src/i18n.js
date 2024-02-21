/*!
 * KoliBri - The accessible HTML-Standard
 */
import i18next from "i18next";
export class I18nextService {
    constructor() { }
    static async createInstance(lng, translations) {
        if (Array.isArray(translations)) {
            translations = new Set(translations);
        }
        else if (typeof translations === 'function') {
            translations = new Set([translations]);
        }
        I18nextService.instance = new I18nextService();
        if (!i18next.isInitialized) {
            await i18next.init({
                ns: [I18nextService.namespace],
                lng,
            });
        }
        else {
            await i18next.loadNamespaces(I18nextService.namespace);
        }
        if (translations !== undefined) {
            translations.forEach((t) => t((l, t) => {
                I18nextService.instance.addResourceBundle(l, t);
                return l;
            }));
        }
        return this.instance;
    }
    static addResourceBundle(lng, translationMap) {
        i18next.addResourceBundle(lng, I18nextService.namespace, translationMap, true);
    }
    addResourceBundle(lng, translationMap) {
        I18nextService.addResourceBundle(lng, translationMap);
    }
    translate(key, options) {
        return i18next.t(key, Object.assign({ ns: I18nextService.namespace, count: options === null || options === void 0 ? void 0 : options.count }, options === null || options === void 0 ? void 0 : options.placeholders));
    }
}
I18nextService.namespace = 'KoliBri';
//# sourceMappingURL=i18n.js.map
