import {useTranslate} from 'i18n/translate.hook';
import {observer} from 'mobx-react-lite';
import React from 'react';

export const DefaultHeader = observer(() => {
	const {translate} = useTranslate();

	return (
		<header className="txt-center txt-xxl txt-bold txt-uppercase">
			{translate('header.title')}
		</header>
	);
});
