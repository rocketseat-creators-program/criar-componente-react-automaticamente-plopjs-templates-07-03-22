import I18n from 'i18n-js';

import { Languages } from '@brandalley/smk';

import { en } from 'i18n/locales/en';
import { fr } from 'i18n/locales/fr';

I18n.fallbacks = true;
I18n.translations = { en, fr };
export const availableLanguages: typeof Languages[] = [
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
