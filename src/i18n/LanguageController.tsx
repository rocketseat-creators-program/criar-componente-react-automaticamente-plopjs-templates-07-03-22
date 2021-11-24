import {ReactNode, useEffect} from 'react';
import {useTranslate} from 'i18n/translate.hook';

interface LanguagesControllerProps {
	children: ReactNode;
}

const LanguageController = ({children}: LanguagesControllerProps) => {
	const {setLanguage, currentLanguage} = useTranslate();

	useEffect(() => {
		setLanguage(currentLanguage);
	}, [currentLanguage, setLanguage]);

	return <>{children}</>;
};

export default LanguageController;
