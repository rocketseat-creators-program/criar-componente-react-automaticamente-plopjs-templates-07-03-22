/**
 * @jest-environment jsdom
 */

import {fireEvent, getByText, screen} from '@testing-library/react';
import * as storeHook from '../../contexts/store.context';
import {LanguageSelector} from './LanguageSelector';
import {mockRootStore} from '../../__mocks__/root_store.mock';
import {renderWithProvider} from '../../__mocks__/provider.mock';

// Mock the useStore (custom hook)
jest.mock('../../contexts/store.context', () => ({
	useStore: () => mockRootStore,
}));

describe('Language Selector', () => {
	it('Current language should be English', async () => {
		jest.spyOn(storeHook, 'useStore').mockImplementation(jest.fn());

		renderWithProvider(<LanguageSelector />);

		const enCurrentLanguageText = screen.getByText('current language: en');
		expect(enCurrentLanguageText).toBeInTheDocument();
	});

	it('Should have a select (notn null) in the document', async () => {
		jest.spyOn(storeHook, 'useStore').mockImplementation(jest.fn());

		renderWithProvider(<LanguageSelector />);

		const selectElement = screen.getByTestId('select-language');
		expect(selectElement).toBeDefined();
		expect(selectElement).not.toBeNull();
	});

	it('Should change the current language', async () => {
		jest.spyOn(storeHook, 'useStore').mockImplementation(jest.fn());

		const {container} = renderWithProvider(<LanguageSelector />);

		const selectElement = screen.getByTestId('select-language');
		const selectorInputEl = container.querySelector('input');
		fireEvent.focus(selectorInputEl);
		fireEvent.keyDown(selectorInputEl, {key: 'ArrowDown', code: 40});
		fireEvent.click(getByText(selectElement, 'Francais'));

		// after changing the language
		const frCurrentLanguageText = await screen.findByText('current language: fr');
		expect(frCurrentLanguageText).toBeInTheDocument();
	});
});
