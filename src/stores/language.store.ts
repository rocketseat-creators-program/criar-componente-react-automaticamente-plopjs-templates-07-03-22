import { AvailableLanguages } from '@brandalley/smk';
import { availableLanguages } from 'i18n/index';

export const laguageInitialState = {
	languages: availableLanguages,
	currentLanguage: process.env
		.NEXT_PUBLIC_DEFAULT_LANGUAGE as typeof AvailableLanguages,
};
