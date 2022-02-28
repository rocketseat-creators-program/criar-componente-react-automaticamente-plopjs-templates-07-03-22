import I18n from 'i18n-js';

import { en } from 'i18n/locales/en';
import { fr } from 'i18n/locales/fr';

export interface Language {
	code: string;
	name: string;
}

export enum AvailableLanguages {
	en = 'en',
	fr = 'fr',
}

I18n.fallbacks = true;
I18n.translations = { en, fr };
export const availableLanguages: Language[] = [
	{
		code: 'en',
		name: 'English',
	},
	{
		code: 'fr',
		name: 'Français',
	},
];

export default I18n;
