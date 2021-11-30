/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import {LanguageSelector} from '../i18n/LanguageSelector.component';

describe('Language Selector', () => {
	it('Should change the current language', async () => {
		render(<LanguageSelector />);

		const enCurrentLanguageText = screen.getByText('current language: en');
		// const frCurrentLanguageText = screen.getByText('current language: fr');
		const selectElement = screen.getByRole('select');

		// 1. initial value language
		expect(enCurrentLanguageText).toBeInTheDocument();
		// 2. on select new language
		fireEvent.change(selectElement, {target: {value: 'fr'}});
		// 3. after changing the language
		await screen.findByText('current language: fr');
	});
});
