import Link from 'next/link';
import React, {ReactNode} from 'react';
import {StoreProvider} from 'src/contexts/store.context';
import LanguageController from 'i18n/LanguageController';

interface AppLayoutProps {
	children: ReactNode;
}

export const AppLayout = ({children}: AppLayoutProps) => {
	return (
		<StoreProvider>
			<LanguageController>
				<div className="theme-container">
					<header className="txt-center txt-xxl txt-bold txt-uppercase">Static Header</header>
					<main>{children}</main>
					<footer>
						<Link href="/">{'<< Back Home <<'}</Link>
					</footer>
				</div>
			</LanguageController>
		</StoreProvider>
	);
};
