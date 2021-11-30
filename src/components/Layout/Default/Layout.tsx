import Link from 'next/link';
import React, {ReactNode} from 'react';
import {StoreProvider} from 'src/contexts/store.context';
import LanguageController from 'i18n/LanguageController';
import {observer} from 'mobx-react-lite';
import {DefaultHeader} from 'components/Layout/Default/Header';

interface AppLayoutProps {
	children: ReactNode;
}

export const DefaultLayout = observer(({children}: AppLayoutProps) => {
	return (
		<StoreProvider>
			<LanguageController>
				<div className="theme-container">
					<DefaultHeader />
					<main>{children}</main>
					<footer>
						<Link href="/">{'<< Back Home <<'}</Link>
					</footer>
				</div>
			</LanguageController>
		</StoreProvider>
	);
});
