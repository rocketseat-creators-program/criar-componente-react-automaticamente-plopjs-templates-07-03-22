/**
 * @jest-environment jsdom
 */

import React, {createContext} from 'react';
import {fireEvent, getByText, render, screen} from '@testing-library/react';
import * as storeHook from '../contexts/store.context';
import {RootStoreType} from '../stores/root.store';
import {LanguageSelector} from '../i18n/LanguageSelector.component';
import {mockRootStore} from '../__mocks__/root_store.mock';

// Mock the useStore (custom hook)
jest.mock('../contexts/store.context', () => ({
	useStore: () => mockRootStore,
}));

const MockStoreContext = createContext<RootStoreType | undefined>(undefined);

const renderComponent = () =>
	render(
		<MockStoreContext.Provider value={mockRootStore}>
			<LanguageSelector />,
		</MockStoreContext.Provider>,
	);

describe('Language Selector', () => {
	it('Current language should be English', async () => {
		jest.spyOn(storeHook, 'useStore').mockImplementation(jest.fn());

		renderComponent();

		const enCurrentLanguageText = screen.getByText('current language: en');
		expect(enCurrentLanguageText).toBeInTheDocument();

		const selectElement = screen.getByTestId('select-language');
		expect(selectElement).toBeDefined();
		expect(selectElement).not.toBeNull();
	});

	it('Should have a select (notn null) in the document', async () => {
		jest.spyOn(storeHook, 'useStore').mockImplementation(jest.fn());

		renderComponent();

		const selectElement = screen.getByTestId('select-language');
		expect(selectElement).toBeDefined();
		expect(selectElement).not.toBeNull();
	});

	it('Should change the current language', async () => {
		jest.spyOn(storeHook, 'useStore').mockImplementation(jest.fn());

		const {container} = renderComponent();

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
