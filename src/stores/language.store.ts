import I18n from 'i18n-js';
import { availableLanguages } from 'i18n/index';
import { cast, types } from 'mobx-state-tree';

export interface Language {
	code: string;
	name: string;
}

export enum AvailableLanguages {
	en = 'en',
	fr = 'fr',
}

export const LanguageStore = types
	.model('LanguageStore', {
		languages: types.frozen<Language[]>(),
		currentLanguage: types.enumeration(
			'Languages',
			Object.values(AvailableLanguages)
		),
	})
	.actions((self) => ({
		setCurrentLanguage: (languageCode: AvailableLanguages) => {
			I18n.locale = languageCode;
			self.currentLanguage = AvailableLanguages[languageCode];
		},
		setLanguages: (languesList: Language[]) =>
			(self.languages = cast(languesList)),
		addLanguage: (newLanguage: Language) =>
			(self.languages = cast([...self.languages, newLanguage])),
	}));

export const laguageInitialState = {
	languages: availableLanguages,
	currentLanguage: process.env
		.NEXT_PUBLIC_DEFAULT_LANGUAGE as AvailableLanguages,
};
