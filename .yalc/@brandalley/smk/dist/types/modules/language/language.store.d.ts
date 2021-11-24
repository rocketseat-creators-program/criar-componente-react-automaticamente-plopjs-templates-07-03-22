import { AvailableLanguages, Language } from './language.model';
export declare const LanguageStore: import("mobx-state-tree").IModelType<{
    languages: import("mobx-state-tree").IType<Language[], Language[], Language[]>;
    currentLanguage: import("mobx-state-tree").ISimpleType<AvailableLanguages>;
    pizza: import("mobx-state-tree").IMaybe<import("mobx-state-tree").ISimpleType<string>>;
}, {
    setCurrentLanguage: (languageCode: AvailableLanguages) => void;
    setLanguages: (languesList: Language[]) => Language[] & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IType<Language[], Language[], Language[]>>;
    setPizza: (value: string) => string;
}, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>;
