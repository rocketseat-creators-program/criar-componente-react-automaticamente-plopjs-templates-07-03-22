import {AvailableLanguages, Language} from '@brandalley/smk';
// import {availableLanguages} from 'i18n/index';
import {useStore} from 'contexts/store.context';
import {observer} from 'mobx-react-lite';
import React, {useMemo} from 'react';
import Select from 'react-select';

// const languages: Language[] = [...availableLanguages];

interface LanguageOptions {
	value: string;
	label: string;
}

export const LanguageSelector = observer(() => {
	// const [currentLanguage, setCurrentLanguage] = useState<string>('en');
	const {
		language: {currentLanguage, languages, setCurrentLanguage},
	} = useStore();

	const languageOptions: LanguageOptions[] = useMemo(
		() =>
			languages.map(({code, name}: Language) => ({
				value: code,
				label: name,
			})),
		[languages],
	);

	return (
		<>
			<p className="language-selector__current">current language: {currentLanguage}</p>
			<Select
				name="languageSelector"
				className="language-selector__select"
				options={languageOptions}
				defaultValue={languageOptions.find(({value}) => value === currentLanguage)}
				onChange={(newValue) =>
					setCurrentLanguage(AvailableLanguages[newValue?.value as keyof typeof AvailableLanguages])
				}
				isDisabled={false}
				isLoading={false}
				isClearable={false}
				isRtl={false}
				isSearchable={false}
			/>
		</>
	);
});
