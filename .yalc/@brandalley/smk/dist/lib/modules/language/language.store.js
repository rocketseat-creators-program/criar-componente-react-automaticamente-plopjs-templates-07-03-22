"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageStore = void 0;
const tslib_1 = require("tslib");
const i18n_js_1 = (0, tslib_1.__importDefault)(require("i18n-js"));
const mobx_state_tree_1 = require("mobx-state-tree");
const language_model_1 = require("./language.model");
exports.LanguageStore = mobx_state_tree_1.types
    .model('LanguageStore', {
    languages: mobx_state_tree_1.types.frozen(),
    currentLanguage: mobx_state_tree_1.types.enumeration('Languages', Object.values(language_model_1.AvailableLanguages)),
    pizza: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.string),
})
    .actions((self) => ({
    setCurrentLanguage: (languageCode) => {
        i18n_js_1.default.locale = languageCode;
        self.currentLanguage = language_model_1.AvailableLanguages[languageCode];
    },
    setLanguages: (languesList) => (self.languages = (0, mobx_state_tree_1.cast)(languesList)),
    setPizza: (value) => (self.pizza = value),
}));
//# sourceMappingURL=language.store.js.map