/*!
 * KoliBri - The accessible HTML-Standard
 */
import { register as coreRegister } from "adopted-style-sheets";
import { getKoliBri } from "../../components/src/utils/dev.utils";
import { I18nextService } from "./i18n";
export const register = async (themes, loaders, options) => {
    var _a, _b;
    if (getKoliBri().I18n === undefined) {
        Object.defineProperty(getKoliBri(), 'I18n', {
            value: await I18nextService.createInstance((_b = (_a = options === null || options === void 0 ? void 0 : options.translation) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : 'de', options === null || options === void 0 ? void 0 : options.translations),
            writable: false,
        });
    }
    return await coreRegister(themes, loaders, options);
};
export const getI18nService = () => getKoliBri().I18n;
export { translate, translations } from './lib/i18n';
//# sourceMappingURL=index.js.map
