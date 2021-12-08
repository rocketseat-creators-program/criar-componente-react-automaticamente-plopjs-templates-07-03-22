import { AvailableLanguages, Language } from '@brandalley/smk';
import I18n from 'i18n-js';
import { cast, types } from 'mobx-state-tree';

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

export const mockLanguageStoreInitialState = {
	languages: [
		{
			code: 'en',
			name: 'English',
		},
		{
			code: 'fr',
			name: 'Francais',
		},
	],
	currentLanguage: 'en' as AvailableLanguages,
};

export const mockLanguageStore = LanguageStore.create(
	mockLanguageStoreInitialState
);
