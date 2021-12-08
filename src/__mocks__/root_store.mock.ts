import { getSnapshot, applySnapshot, types } from 'mobx-state-tree';
import { LanguageStore, mockLanguageStore } from './language_store.mock';

export const RootStore = types
	.model('RootStore', {
		language: LanguageStore,
	})
	.actions((self) => {
		let initialState = {};
		return {
			afterCreate: () => {
				initialState = getSnapshot(self);
			},
			reset: () => {
				applySnapshot(self, initialState);
			},
		};
	});

export const mockRootStore = RootStore.create({
	language: mockLanguageStore,
});
