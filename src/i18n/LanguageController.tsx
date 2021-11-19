import {ReactNode, useEffect} from 'react';
import {useTranslate} from 'i18n/translate.hook';

interface LanguagesControllerProps {
	children: ReactNode;
}

const LanguageController = (props: LanguagesControllerProps) => {
	const {setLanguage, currentLanguage} = useTranslate();
	const {children} = props;

	useEffect(() => {
		setLanguage(currentLanguage);
	}, [currentLanguage, setLanguage]);

	return <>{children}</>;
};

export default LanguageController;
