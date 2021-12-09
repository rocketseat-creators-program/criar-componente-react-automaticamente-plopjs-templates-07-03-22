import {createContext} from 'react';
import {RootStoreType} from 'stores/root.store';
import {render} from '@testing-library/react';
import {mockRootStore} from './root_store.mock';

export const MockStoreContext = createContext<RootStoreType | undefined>(undefined);

export const renderWithProvider = (children: JSX.Element) =>
	render(<MockStoreContext.Provider value={mockRootStore}>{children}</MockStoreContext.Provider>);
