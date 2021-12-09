import {LanguageStore} from '../../__mocks__/language_store.mock';
import {AvailableLanguages} from '../../stores/language.store';

const defaultLanguages = [
	{
		code: 'en',
		name: 'English',
	},
	{
		code: 'fr',
		name: 'Francais',
	},
];

const ptLanguageObj = {
	code: 'pt',
	name: 'Portugues',
};

const languageStore = LanguageStore.create({
	languages: defaultLanguages,
	currentLanguage: AvailableLanguages.en,
});

describe('Languages Store', () => {
	it('The default language should be EN', () => {
		expect(languageStore.currentLanguage).toBe('en');
	});

	it('Should change the current language, EN to FR', () => {
		languageStore.setCurrentLanguage(AvailableLanguages.fr);
		expect(languageStore.currentLanguage).toBe('fr');
	});

	it('The default languages arrays should contain only EN and FR', () => {
		expect(languageStore.languages).toBe(defaultLanguages);
	});

	it('Should add the PT (Portuguese) language to the languages', () => {
		languageStore.addLanguage(ptLanguageObj);
		expect(languageStore.languages).toEqual([...defaultLanguages, ptLanguageObj]);
	});

	it('Should reset the languages', () => {
		languageStore.setLanguages([...defaultLanguages, ptLanguageObj]);
		expect(languageStore.languages).toEqual([...defaultLanguages, ptLanguageObj]);
	});
});
